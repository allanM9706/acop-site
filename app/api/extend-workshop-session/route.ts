import { NextRequest, NextResponse } from 'next/server';

// Reuse the same sessions map from verify-workshop-password
// In production, use a shared Redis store
import { sessions } from '../verify-workshop-password/route';

// Track extension counts per session
const extensionCounts = new Map<string, number>();
const MAX_EXTENSIONS = 3;

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('workshop_session')?.value;

    if (!sessionId || !sessions.has(sessionId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid session' },
        { status: 401 }
      );
    }

    const session = sessions.get(sessionId);
    
    // Check if session exists and is valid
    if (Date.now() > session.expiresAt) {
      sessions.delete(sessionId);
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

    // Extend session by 60 seconds
    const newExpiry = Date.now() + 60 * 1000;
    session.expiresAt = newExpiry;
    sessions.set(sessionId, session);

    // Update extension count
    extensionCounts.set(sessionId, currentExtends + 1);

    // Update cookie
    const response = NextResponse.json({
      success: true,
      message: 'Session extended',
      extensionsRemaining: MAX_EXTENSIONS - (currentExtends + 1),
    });

    response.cookies.set('workshop_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60, // 1 minute
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}