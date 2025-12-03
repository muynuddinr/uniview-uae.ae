import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value;
    
    console.log('verify-token called, token present:', !!token);
    
    if (!token) {
      console.log('verify-token: token not found in cookies');
      return NextResponse.json(
        { error: 'Authentication token not found' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      console.log('verify-token: token verification failed');
      // 🔥 Clear invalid cookie automatically
      const response = NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
      response.cookies.delete('auth-token');
      return response;
    }
    
    console.log('verify-token: token verified successfully for admin:', decoded.email);
    
    return NextResponse.json(
      { 
        admin: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
          createdAt: decoded.createdAt,
          updatedAt: decoded.updatedAt
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    // 🔥 Clear cookie on any error
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    response.cookies.delete('auth-token');
    return response;
  }
}