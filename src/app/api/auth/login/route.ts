import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { comparePassword, generateToken, setTokenCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Login attempt for:', body.email);
    
    // Validate input
    const validatedData = loginSchema.safeParse(body);
    
    if (!validatedData.success) {
      console.log('Login validation failed:', validatedData.error.issues);
      return NextResponse.json(
        { error: 'Invalid input', details: validatedData.error.issues },
        { status: 400 }
      );
    }
    
    const { email, password } = validatedData.data;
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      console.log('Admin not found for email:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check password
    const isPasswordValid = await comparePassword(password, admin.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for admin:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Generate token
    const token = generateToken({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt
    });
    
    // Create response
    const response = NextResponse.json(
      {
        message: 'Login successful',
        admin: {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: admin.role,
          createdAt: admin.createdAt,
          updatedAt: admin.updatedAt
        }
      },
      { status: 200 }
    );
    
    // Set token in cookie
    setTokenCookie(response, token);
    
    console.log('Login successful for admin:', admin.email);
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}