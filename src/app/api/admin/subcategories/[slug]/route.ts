// src/app/api/admin/subcategories/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Subcategory from '@/models/Subcategory';
import Product from '@/models/Product';
import { verifyAdminAuth } from '@/lib/apiAuth';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

// GET: Public - Fetch single subcategory with products
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    const subcategory = await Subcategory.findOne({ slug })
      .populate('categoryId', 'name slug');
    
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    
    // Generate slug if missing
    if (!subcategory.slug && subcategory.name) {
      subcategory.slug = subcategory.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      await subcategory.save();
    }
    
    // Get all products under this subcategory
    const products = await Product.find({ subcategoryId: subcategory._id })
      .select('name slug shortDescription mainImage price inStock')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      subcategory,
      products,
    });
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subcategory' },
      { status: 500 }
    );
  }
}

// PUT: Admin - Update subcategory
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
    
    const subcategory = await Subcategory.findOne({ slug });
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slugField = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('categoryId') as string;
    const imageFile = formData.get('image') as File;
    const keepCurrentImage = formData.get('keepCurrentImage') === 'true';
    
    if (name) subcategory.name = name;
    if (description) subcategory.description = description;
    if (categoryId) subcategory.categoryId = categoryId;
    
    // Handle slug update
    if (slugField && slugField !== subcategory.slug) {
      // Check if new slug already exists
      const existingSubcategory = await Subcategory.findOne({ 
        slug: slugField,
        _id: { $ne: subcategory._id }
      });
      
      if (existingSubcategory) {
        return NextResponse.json(
          { success: false, error: 'Subcategory with this slug already exists' },
          { status: 400 }
        );
      }
      
      subcategory.slug = slugField;
    }
    
    // Handle image update
    if (imageFile && imageFile.size > 0) {
      if (subcategory.imagePublicId) {
        await deleteImage(subcategory.imagePublicId);
      }
      
      const uploadResult = await uploadImage(imageFile, 'subcategories');
      subcategory.image = uploadResult.url;
      subcategory.imagePublicId = uploadResult.publicId;
    } else if (!keepCurrentImage && subcategory.imagePublicId) {
      await deleteImage(subcategory.imagePublicId);
      subcategory.image = '';
      subcategory.imagePublicId = '';
    }
    
    await subcategory.save();
    await subcategory.populate('categoryId', 'name _id');
    
    return NextResponse.json({
      success: true,
      message: 'Subcategory updated successfully',
      subcategory,
    });
  } catch (error) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update subcategory' },
      { status: 500 }
    );
  }
}

// DELETE: Admin - Delete subcategory
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
    
    const subcategory = await Subcategory.findOne({ slug });
    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    
    // Check if subcategory has products
    const productCount = await Product.countDocuments({ 
      subcategoryId: subcategory._id 
    });
    
    if (productCount > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete subcategory with products' },
        { status: 400 }
      );
    }
    
    // Delete image if exists
    if (subcategory.imagePublicId) {
      await deleteImage(subcategory.imagePublicId);
    }
    
    await Subcategory.findByIdAndDelete(subcategory._id);
    
    return NextResponse.json({
      success: true,
      message: 'Subcategory deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete subcategory' },
      { status: 500 }
    );
  }
}