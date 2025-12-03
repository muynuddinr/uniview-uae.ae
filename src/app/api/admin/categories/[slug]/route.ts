// src/app/api/admin/categories/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import Product from '@/models/Product';
import { verifyToken, getTokenCookie } from '@/lib/auth';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

// GET: Public - Fetch single category with subcategories or products
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    const category = await Category.findOne({ slug });
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    const subcategories = await Subcategory.find({ categoryId: category._id })
      .select('name slug description image')
      .sort({ name: 1 });
    
    let products: any[] = [];
    
    // Only fetch products if category has NO subcategories
    if (subcategories.length === 0) {
      products = await Product.find({ 
        categoryId: category._id,
        subcategoryId: { $exists: false }
      })
      .select('name slug shortDescription mainImage price inStock')
      .sort({ createdAt: -1 });
    }
    
    return NextResponse.json({
      success: true,
      category,
      hasSubcategories: subcategories.length > 0,
      subcategories,
      products,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT: Admin - Update category
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
    
    const category = await Category.findOne({ slug });
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slugField = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;
    const keepCurrentImage = formData.get('keepCurrentImage') === 'true';
    
    if (name) category.name = name;
    if (description) category.description = description;
    
    // Handle slug update
    if (slugField && slugField !== category.slug) {
      // Check if new slug already exists
      const existingCategory = await Category.findOne({ 
        slug: slugField,
        _id: { $ne: category._id }
      });
      
      if (existingCategory) {
        return NextResponse.json(
          { success: false, error: 'Category with this slug already exists' },
          { status: 400 }
        );
      }
      
      category.slug = slugField;
    }
    
    // Handle image update
    if (imageFile && imageFile.size > 0) {
      if (category.imagePublicId) {
        await deleteImage(category.imagePublicId);
      }
      
      const uploadResult = await uploadImage(imageFile, 'categories');
      category.image = uploadResult.url;
      category.imagePublicId = uploadResult.publicId;
    } else if (!keepCurrentImage && category.imagePublicId) {
      await deleteImage(category.imagePublicId);
      category.image = '';
      category.imagePublicId = '';
    }
    
    await category.save();
    
    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE: Admin - Delete category
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
    
    const category = await Category.findOne({ slug });
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if category has subcategories or products
    const subcategoryCount = await Subcategory.countDocuments({ categoryId: category._id });
    const productCount = await Product.countDocuments({ 
      categoryId: category._id,
      subcategoryId: { $exists: false }
    });
    
    if (subcategoryCount > 0 || productCount > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete category with subcategories or products' },
        { status: 400 }
      );
    }
    
    // Delete image if exists
    if (category.imagePublicId) {
      await deleteImage(category.imagePublicId);
    }
    
    await Category.findByIdAndDelete(category._id);
    
    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}