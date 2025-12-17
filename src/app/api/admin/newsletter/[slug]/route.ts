import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Newsletter from '@/models/Newsletter';
import { verifyAdminAuth } from '@/lib/apiAuth';

// GET: Admin - Fetch single newsletter subscription
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Verify authentication
    const auth = await verifyAdminAuth(request);
    if (!auth.isValid) {
      return auth.response;
    }

    const { slug } = await params;
    await connectDB();

    const subscription = await Newsletter.findOne({ slug });

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: 'Newsletter subscription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error('Error fetching newsletter subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch newsletter subscription' },
      { status: 500 }
    );
  }
}

// PUT: Admin - Update newsletter subscription status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Verify authentication
    const auth = await verifyAdminAuth(request);
    if (!auth.isValid) {
      return auth.response;
    }

    const { slug } = await params;
    await connectDB();

    const subscription = await Newsletter.findOne({ slug });
    if (!subscription) {
      return NextResponse.json(
        { success: false, error: 'Newsletter subscription not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (status && ['active', 'inactive'].includes(status)) {
      subscription.status = status;
      if (status === 'inactive') {
        subscription.unsubscribedAt = new Date();
      } else {
        subscription.unsubscribedAt = undefined;
      }
      await subscription.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Newsletter subscription updated successfully',
      subscription,
    });
  } catch (error) {
    console.error('Error updating newsletter subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update newsletter subscription' },
      { status: 500 }
    );
  }
}

// DELETE: Admin - Delete newsletter subscription
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Verify authentication
    const auth = await verifyAdminAuth(request);
    if (!auth.isValid) {
      return auth.response;
    }

    const { slug } = await params;
    await connectDB();

    const subscription = await Newsletter.findOne({ slug });
    if (!subscription) {
      return NextResponse.json(
        { success: false, error: 'Newsletter subscription not found' },
        { status: 404 }
      );
    }

    await Newsletter.findOneAndDelete({ slug });

    return NextResponse.json({
      success: true,
      message: 'Newsletter subscription deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting newsletter subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete newsletter subscription' },
      { status: 500 }
    );
  }
}