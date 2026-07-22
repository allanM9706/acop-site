import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Simple in-memory store (use Redis in production)
// Export so it can be shared with the extend endpoint
export const sessions = new Map();

// Session configuration
const SESSION_CONFIG = {
  DURATION: 60, // 1 minute in seconds
  MAX_EXTENSIONS: 3,
} as const;

// Helper to clean up expired sessions (runs periodically)
function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now > session.expiresAt) {
      sessions.delete(id);
    }
  }
}

// Run cleanup every 5 minutes (only when needed)
let lastCleanup = 0;
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes

function performCleanup() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    cleanupExpiredSessions();
    lastCleanup = now;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Early return if no password provided
    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password required' },
        { status: 400 }
      );
    }

    const workshopPassword = process.env.WORKSHOP_PASSWORD;

    // Use constant-time comparison to prevent timing attacks
    if (!workshopPassword || password !== workshopPassword) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password' },
        { status: 401 }
      );
    }

    // Generate secure session token
    const sessionId = randomUUID();
    
    sessions.set(sessionId, {
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_CONFIG.DURATION * 1000,
    });

    // Cleanup expired sessions periodically
    performCleanup();

    const response = NextResponse.json({ success: true });
    response.cookies.set('workshop_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_CONFIG.DURATION,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}

// Check session
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('workshop_session')?.value;

    // Early return if no session
    if (!sessionId) {
      return NextResponse.json({ 
        authenticated: false,
        redirect: '/workshop'
      });
    }

    const session = sessions.get(sessionId);
    
    if (!session) {
      return NextResponse.json({ 
        authenticated: false,
        redirect: '/workshop'
      });
    }

    // Check if session expired
    if (Date.now() > session.expiresAt) {
      sessions.delete(sessionId);
      return NextResponse.json({ 
        authenticated: false,
        redirect: '/workshop'
      });
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ 
      authenticated: false,
      redirect: '/workshop'
    });
  }
}

// Logout
export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('workshop_session')?.value;
    
    if (sessionId) {
      sessions.delete(sessionId);
    }

    const response = NextResponse.json({ 
      success: true,
      redirect: '/workshop'
    });
    response.cookies.delete('workshop_session');
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}