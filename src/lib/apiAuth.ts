import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenCookie } from './auth';

/**
 * Verifies admin authentication for API routes
 * Returns { isValid, decoded, response }
 * If isValid is false, response should be returned directly
 */
export async function verifyAdminAuth(request: NextRequest) {
  try {
    const token = getTokenCookie(request);
    
    if (!token) {
      return {
        isValid: false,
        decoded: null,
        response: NextResponse.json(
          { 
            success: false, 
            error: 'Unauthorized - No token provided',
            code: 'NO_TOKEN'
          },
          { status: 401 }
        )
      };
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return {
        isValid: false,
        decoded: null,
        response: NextResponse.json(
          { 
            success: false, 
            error: 'Unauthorized - Invalid or expired token',
            code: 'INVALID_TOKEN'
          },
          { status: 401 }
        )
      };
    }

    // Optional: Check if token has admin role
    if (!decoded.role || (decoded.role !== 'admin' && decoded.role !== 'superadmin')) {
      return {
        isValid: false,
        decoded: null,
        response: NextResponse.json(
          { 
            success: false, 
            error: 'Forbidden - Admin access required',
            code: 'INSUFFICIENT_PERMISSIONS'
          },
          { status: 403 }
        )
      };
    }

    return {
      isValid: true,
      decoded,
      response: null
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return {
      isValid: false,
      decoded: null,
      response: NextResponse.json(
        { 
          success: false, 
          error: 'Authentication verification failed',
          code: 'AUTH_ERROR'
        },
        { status: 500 }
      )
    };
  }
}

/**
 * Higher-order function to wrap API handlers with authentication
 * Usage: export const POST = withAdminAuth(async (request, decoded) => { ... })
 */
export function withAdminAuth(handler: (request: NextRequest, decoded: any) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const auth = await verifyAdminAuth(request);
    
    if (!auth.isValid) {
      return auth.response;
    }

    try {
      return await handler(request, auth.decoded);
    } catch (error) {
      console.error('Handler error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Internal server error'
        },
        { status: 500 }
      );
    }
  };
}
