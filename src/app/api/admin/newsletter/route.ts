import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Newsletter from '@/models/Newsletter';
import { verifyAdminAuth } from '@/lib/apiAuth';

// POST: Public - Create new newsletter subscription
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email: cleanEmail });
    
    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        return NextResponse.json(
          { success: false, error: 'This email is already subscribed to our newsletter' },
          { status: 400 }
        );
      } else {
        // Reactivate inactive subscription
        existingSubscription.status = 'active';
        existingSubscription.unsubscribedAt = undefined;
        await existingSubscription.save();
        
        return NextResponse.json(
          { 
            success: true,
            message: 'Successfully resubscribed to our newsletter!',
            subscription: existingSubscription 
          },
          { status: 200 }
        );
      }
    }

    // Generate slug manually
    const timestamp = Date.now().toString(36);
    const emailSlug = cleanEmail
      .split('@')[0]
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const slug = `${emailSlug}-${timestamp}`;

    // Create new subscription
    const subscription = new Newsletter({
      email: cleanEmail,
      slug: slug,
    });

    await subscription.save();

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully subscribed to our newsletter!',
        subscription 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating newsletter subscription:', error);
    
    // More specific error handling
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: `Validation failed: ${errors.join(', ')}` },
        { status: 400 }
      );
    }
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter. Please try again.' },
      { status: 500 }
    );
  }
}

// GET: Admin - Fetch all newsletter subscriptions
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.isValid) {
      return auth.response;
    }
    
    await connectDB();
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || '-subscribedAt';

    const filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const subscriptions = await Newsletter.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Newsletter.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      subscriptions,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch newsletter subscriptions' },
      { status: 500 }
    );
  }
}