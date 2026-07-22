import { NextRequest, NextResponse } from 'next/server';
import { sessions } from '../verify-workshop-password/route';

// Track extension counts per session
const extensionCounts = new Map<string, number>();
const MAX_EXTENSIONS = 3;
const EXTEND_DURATION = 60; // 1 minute in seconds

// Clean up extension counts periodically
function cleanupExtensionCounts() {
  const now = Date.now();
  // Only keep extension counts for active sessions
  for (const [id] of extensionCounts) {
    if (!sessions.has(id)) {
      extensionCounts.delete(id);
    }
  }
}

let lastExtensionCleanup = 0;
const EXTENSION_CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('workshop_session')?.value;

    // Early return if no session
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'No session found' },
        { status: 401 }
      );
    }

    const session = sessions.get(sessionId);
    
    // Check if session exists
    if (!session) {
      extensionCounts.delete(sessionId);
      return NextResponse.json(
        { success: false, message: 'Invalid session' },
        { status: 401 }
      );
    }

    // Check if session expired
    const now = Date.now();
    if (now > session.expiresAt) {
      sessions.delete(sessionId);
      extensionCounts.delete(sessionId);
      return NextResponse.json(
        { success: false, message: 'Session expired' },
        { status: 401 }
      );
    }

    // Check extension limits
    const currentExtends = extensionCounts.get(sessionId) || 0;
    if (currentExtends >= MAX_EXTENSIONS) {
      return NextResponse.json(
        { success: false, message: 'Maximum extensions reached' },
        { status: 403 }
      );
    }

    // Extend session
    session.expiresAt = now + EXTEND_DURATION * 1000;
    sessions.set(sessionId, session);

    // Update extension count
    const newCount = currentExtends + 1;
    extensionCounts.set(sessionId, newCount);

    // Clean up extension counts periodically
    if (now - lastExtensionCleanup > EXTENSION_CLEANUP_INTERVAL) {
      cleanupExtensionCounts();
      lastExtensionCleanup = now;
    }

    // Update cookie
    const response = NextResponse.json({
      success: true,
      message: 'Session extended',
      extensionsRemaining: MAX_EXTENSIONS - newCount,
    });

    response.cookies.set('workshop_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: EXTEND_DURATION,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Extension error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}