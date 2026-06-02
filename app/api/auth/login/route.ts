import { NextRequest, NextResponse } from 'next/server';
import { generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simple hardcoded credentials - in production, use a database
    if (email === 'admin@example.com' && password === 'admin123') {
      const token = generateToken({
        userId: '1',
        email: email,
      });

      await setAuthCookie(token);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
