import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Simple mock login for now - redirect back to home
  const response = NextResponse.redirect(new URL('/', request.url));
  
  // Set a simple session cookie
  response.cookies.set('session', 'mock-user-session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  });
  
  return response;
}