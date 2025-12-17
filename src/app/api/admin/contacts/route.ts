import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import { verifyAdminAuth } from '@/lib/apiAuth';

// POST: Public - Create new contact submission
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
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

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,20}$/
    const cleanPhone = phone.replace(/[^0-9]/g, '')
    if (!phoneRegex.test(phone) || cleanPhone.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid phone number' },
        { status: 400 }
      );
    }

    // Generate slug manually
    const timestamp = Date.now().toString(36);
    const nameSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const slug = `${nameSlug}-${timestamp}`;

    // Create contact submission
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      slug: slug,
    });

    await contact.save();

    return NextResponse.json(
      { 
        success: true,
        message: 'Contact form submitted successfully',
        contact 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating contact submission:', error);
    
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
        { success: false, error: 'Duplicate entry found' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

// GET: Admin - Fetch all contact submissions
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
    const sort = searchParams.get('sort') || '-createdAt';

    const filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}