import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import { verifyToken, getTokenCookie } from '@/lib/auth';

// GET: Admin - Fetch single contact submission
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Verify authentication
    const token = getTokenCookie(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    await connectDB();

    const contact = await Contact.findOne({ slug });

    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact submission' },
      { status: 500 }
    );
  }
}

// PUT: Admin - Update contact submission status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Verify authentication
    const token = getTokenCookie(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    await connectDB();

    const contact = await Contact.findOne({ slug });
    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (status && ['new', 'read', 'replied'].includes(status)) {
      contact.status = status;
      await contact.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submission updated successfully',
      contact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact submission' },
      { status: 500 }
    );
  }
}

// DELETE: Admin - Delete contact submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Verify authentication
    const token = getTokenCookie(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    await connectDB();

    const contact = await Contact.findOne({ slug });
    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    await Contact.findOneAndDelete({ slug });

    return NextResponse.json({
      success: true,
      message: 'Contact submission deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact submission' },
      { status: 500 }
    );
  }
}