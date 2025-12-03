import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { hashPassword, generateToken, setTokenCookie } from '@/lib/auth';
import { registerSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Registration attempt for:', body.email);
    
    // Validate input
    const validatedData = registerSchema.safeParse(body);
    
    if (!validatedData.success) {
      console.log('Registration validation failed:', validatedData.error.issues);
      return NextResponse.json(
        { error: 'Invalid input', details: validatedData.error.issues },
        { status: 400 }
      );
    }
    
    const { name, email, password, role } = validatedData.data;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      console.log('Admin already exists with email:', email);
      return NextResponse.json(
        { error: 'Admin with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create admin
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role
    });
    
    await admin.save();
    
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
        message: 'Registration successful',
        admin: {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: admin.role,
          createdAt: admin.createdAt,
          updatedAt: admin.updatedAt
        }
      },
      { status: 201 }
    );
    
    // Set token in cookie
    setTokenCookie(response, token);
    
    console.log('Registration successful for admin:', admin.email);
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}