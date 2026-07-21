import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store (use Redis in production)
// Export so it can be shared with the extend endpoint
export const sessions = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const workshopPassword = process.env.WORKSHOP_PASSWORD;

    if (password === workshopPassword) {
      // Generate secure session token
      const sessionId = crypto.randomUUID();
      
      sessions.set(sessionId, {
        createdAt: Date.now(),
        expiresAt: Date.now() + 1 * 60 * 1000, // 1 MINUTE
      });

      const response = NextResponse.json({ success: true });
      response.cookies.set('workshop_session', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60, // 1 MINUTE
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Incorrect password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Check session
export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('workshop_session')?.value;

  if (!sessionId || !sessions.has(sessionId)) {
    return NextResponse.json({ 
      authenticated: false,
      redirect: '/workshop'
    });
  }

  const session = sessions.get(sessionId);
  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId);
    return NextResponse.json({ 
      authenticated: false,
      redirect: '/workshop'
    });
  }

  return NextResponse.json({ authenticated: true });
}

// Logout
export async function DELETE(request: NextRequest) {
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
}