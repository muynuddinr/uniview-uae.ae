import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;
  
  console.log('Middleware checking:', pathname, 'Token present:', !!token);
  
  // If accessing admin dashboard without token, redirect to login
  if (pathname.startsWith('/admin/dashboard') && !token) {
    console.log('Redirecting to login from dashboard - no token');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // If accessing login/register with valid token, redirect to dashboard
  if ((pathname === '/admin/login' || pathname === '/admin/register') && token) {
    console.log('Redirecting to dashboard from auth pages - token present');
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/login',
    '/admin/register',
  ],
};