import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Redirect to login page - this is a placeholder until proper auth is set up
  const loginUrl = new URL('/api/auth/signin', request.url);
  return NextResponse.redirect(loginUrl);
}