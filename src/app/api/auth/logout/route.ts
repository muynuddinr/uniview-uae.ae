import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('Logout endpoint called');
    
    // Create response first
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );
    
    // Clear the auth token cookie PROPERLY
    response.cookies.delete('auth-token');
    
    // Alternative method - set expired cookie
    response.cookies.set({
      name: 'auth-token',
      value: '',
      expires: new Date(0), // Expire immediately
      path: '/',
    });
    
    console.log('Logout successful, cookie cleared');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}