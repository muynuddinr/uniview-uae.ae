import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { verifyAdminAuth } from '@/lib/apiAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isValid) {
      return auth.response;
    }
    
    await connectDB();
    
    const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 });
    
    return NextResponse.json({ admins }, { status: 200 });
  } catch (error) {
    console.error('Get admins error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}