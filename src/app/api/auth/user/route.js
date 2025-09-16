import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    try {
      const sessionData = JSON.parse(sessionCookie.value);
      
      // Check if session is still valid (24 hours)
      const loginTime = new Date(sessionData.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        return NextResponse.json(
          { error: 'Session expired' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { 
          user: sessionData.user,
          sessionId: sessionData.sessionId
        },
        { status: 200 }
      );

    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('User profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}