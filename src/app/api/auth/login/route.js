import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { emailOrUsername, password } = await request.json();

    // Validate input
    if (!emailOrUsername || !password) {
      return NextResponse.json(
        { error: 'Email/Username and password are required' },
        { status: 400 }
      );
    }

    // Read users data
    const usersFilePath = path.join(process.cwd(), 'public', 'data', 'users.json');
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    
    // Find user by email or username
    const user = usersData.users.find(u => {
      const emailMatch = u.email.toLowerCase() === emailOrUsername.toLowerCase();
      const usernameMatch = u.username && u.username.toLowerCase() === emailOrUsername.toLowerCase();
      return emailMatch || usernameMatch;
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email/username or password' },
        { status: 401 }
      );
    }

    // Check password (in production, use proper password hashing)
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email/username or password' },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Create session data (in production, use JWT or proper session management)
    const sessionData = {
      user: userWithoutPassword,
      loginTime: new Date().toISOString(),
      sessionId: Math.random().toString(36).substring(2, 15)
    };

    // Set session cookie (simplified for demo)
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: userWithoutPassword,
        sessionId: sessionData.sessionId
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for session
    response.cookies.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}