// src/app/api/admin/subcategories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Subcategory from '@/models/Subcategory';
import { verifyAdminAuth } from '@/lib/apiAuth';
import { uploadImage } from '@/lib/cloudinary';

// GET: Public - Fetch all subcategories (optionally filtered by category)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    const filter: any = {};
    if (categoryId) {
      filter.categoryId = categoryId;
    }
    
    const subcategories = await Subcategory.find(filter)
      .populate('categoryId', 'name slug')
      .sort({ name: 1 });
    
    return NextResponse.json({
      success: true,
      subcategories,
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}

// POST: Admin - Create new subcategory
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await verifyAdminAuth(request);
    if (!auth.isValid) {
      return auth.response;
    }

    await connectDB();

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('categoryId') as string;
    const imageFile = formData.get('image') as File;
    
    // Use the provided slug instead of auto-generating
    const finalSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    if (!name || !finalSlug || !categoryId) {
      return NextResponse.json(
        { success: false, error: 'Name, slug, and category are required' },
        { status: 400 }
      );
    }

    const existingSubcategory = await Subcategory.findOne({ slug: finalSlug });
    if (existingSubcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory with this slug already exists' },
        { status: 400 }
      );
    }

    let imageUrl = '';
    let imagePublicId = '';
    
    if (imageFile && imageFile.size > 0) {
      try {
        const uploadResult = await uploadImage(imageFile, 'subcategories');
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.publicId;
      } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    const subcategory = new Subcategory({
      name: name.trim(),
      slug: finalSlug,
      description: description || '',
      image: imageUrl,
      imagePublicId,
      categoryId
    });

    await subcategory.save();
    await subcategory.populate('categoryId', 'name _id');

    return NextResponse.json(
      { 
        success: true,
        message: 'Subcategory created successfully',
        subcategory 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create subcategory error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}