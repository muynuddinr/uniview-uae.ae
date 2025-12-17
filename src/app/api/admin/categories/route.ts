// src/app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import { verifyAdminAuth } from '@/lib/apiAuth';
import { uploadImage } from '@/lib/cloudinary';

// GET: Public - Fetch all categories with subcategories
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const categories = await Category.find({}).sort({ name: 1 });
    
    // Fetch subcategories for each category
    const categoriesWithSubcategories = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await Subcategory.find({ categoryId: category._id })
          .select('name slug')
          .sort({ name: 1 });
        
        return {
          ...category.toJSON(),
          subcategories
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      categories: categoriesWithSubcategories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST: Admin - Create new category
export async function POST(request: NextRequest) {
  try {
    // Verify authentication for admin operations
    const auth = await verifyAdminAuth(request);
    if (!auth.isValid) {
      return auth.response;
    }
    
    await connectDB();
    
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;
    
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Category name and slug are required' },
        { status: 400 }
      );
    }
    
    // Use the provided slug instead of auto-generating
    const finalSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug: finalSlug }]
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }
    
    let imageUrl = '';
    let imagePublicId = '';
    
    if (imageFile && imageFile.size > 0) {
      try {
        const uploadResult = await uploadImage(imageFile, 'categories');
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.publicId;
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        return NextResponse.json(
          { success: false, error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }
    
    const category = new Category({
      name,
      slug: finalSlug,
      description,
      image: imageUrl,
      imagePublicId,
    });
    
    await category.save();
    
    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}