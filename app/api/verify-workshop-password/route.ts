import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const workshopPassword = process.env.WORKSHOP_PASSWORD;

    if (!workshopPassword) {
      return NextResponse.json(
        { success: false, message: 'Workshop password not configured' },
        { status: 500 }
      );
    }

    if (password === workshopPassword) {
      return NextResponse.json({ success: true });
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