// src/app/api/admin/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { verifyAdminAuth } from '@/lib/apiAuth';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import mongoose from 'mongoose';

// GET: Public - Fetch single product with details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    const product = await Product.findOne({ slug })
      .populate('categoryId', 'name slug')
      .populate('subcategoryId', 'name slug');
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      product
    }, { status: 200 });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT: Admin - Update product
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
    
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slugField = formData.get('slug') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const categoryId = formData.get('categoryId') as string;
    const subcategoryId = formData.get('subcategoryId') as string;
    const inStock = formData.get('inStock') === 'true';
    const mainImageFile = formData.get('mainImage') as File;
    const keepCurrentMainImage = formData.get('keepCurrentMainImage') === 'true';
    const imagesToDelete = formData.getAll('imagesToDelete') as string[];
    
    const product = await Product.findOne({ slug });
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Validate that we have a main image (either existing or new)
    const hasExistingMainImage = product.mainImage && product.mainImagePublicId;
    const hasNewMainImage = mainImageFile && mainImageFile.size > 0;
    const keepingCurrentImage = keepCurrentMainImage && hasExistingMainImage;
    
    if (!hasExistingMainImage && !hasNewMainImage && !keepingCurrentImage) {
      return NextResponse.json(
        { success: false, error: 'Main image is required' },
        { status: 400 }
      );
    }
    
    // Update fields - convert string IDs to ObjectId
    if (name) product.name = name;
    if (shortDescription) product.shortDescription = shortDescription;
    if (description) product.description = description;
    if (price) product.price = price;
    if (categoryId) product.categoryId = new mongoose.Types.ObjectId(categoryId);
    if (subcategoryId && subcategoryId !== 'none') {
      product.subcategoryId = new mongoose.Types.ObjectId(subcategoryId);
    } else if (subcategoryId === 'none') {
      product.subcategoryId = undefined;
    }
    if (inStock !== undefined) product.inStock = inStock;
    
    // Handle slug update
    let finalSlug = slugField;
    if (!finalSlug && name && name !== product.name) {
      finalSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    if (finalSlug && finalSlug !== product.slug) {
      const existingProduct = await Product.findOne({ 
        slug: finalSlug,
        _id: { $ne: product._id }
      });
      
      if (existingProduct) {
        return NextResponse.json(
          { success: false, error: 'Product with this slug already exists' },
          { status: 400 }
        );
      }
      
      product.slug = finalSlug;
    }
    
    // Handle main image
    if (mainImageFile && mainImageFile.size > 0) {
      if (product.mainImagePublicId) {
        await deleteImage(product.mainImagePublicId);
      }
      
      const uploadResult = await uploadImage(mainImageFile, 'products/main');
      product.mainImage = uploadResult.url;
      product.mainImagePublicId = uploadResult.publicId;
    } else if (!keepCurrentMainImage) {
      if (product.mainImagePublicId) {
        await deleteImage(product.mainImagePublicId);
        product.mainImage = '';
        product.mainImagePublicId = '';
      }
    }
    
    // Handle additional images
    const newImages: string[] = [];
    const newImagePublicIds: string[] = [];
    const imageFiles = formData.getAll('images') as File[];
    
    for (const imageFile of imageFiles) {
      if (imageFile && imageFile.size > 0) {
        try {
          const uploadResult = await uploadImage(imageFile, 'products/gallery');
          newImages.push(uploadResult.url);
          newImagePublicIds.push(uploadResult.publicId);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    }
    
    if (newImages.length > 0) {
      product.images = [...(product.images || []), ...newImages];
      product.imagePublicIds = [...(product.imagePublicIds || []), ...newImagePublicIds];
    }
    
    // Delete specified images
    if (imagesToDelete && imagesToDelete.length > 0) {
      for (let i = 0; i < imagesToDelete.length; i++) {
        const index = parseInt(imagesToDelete[i]);
        if (product.imagePublicIds && product.imagePublicIds[index]) {
          await deleteImage(product.imagePublicIds[index]);
        }
      }
      
      const indicesToDelete = imagesToDelete.map(i => parseInt(i));
      product.images = product.images?.filter((_, index) => !indicesToDelete.includes(index));
      product.imagePublicIds = product.imagePublicIds?.filter((_, index) => !indicesToDelete.includes(index));
    }
    
    // Handle features
    const features: string[] = [];
    let featureIndex = 0;
    while (formData.get(`features[${featureIndex}]`)) {
      features.push(formData.get(`features[${featureIndex}]`) as string);
      featureIndex++;
    }
    product.features = features;
    
    await product.save();
    
    const updatedProduct = await Product.findById(product._id)
      .populate('categoryId', 'name')
      .populate('subcategoryId', 'name');
    
    return NextResponse.json(
      { success: true, message: 'Product updated successfully', product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: Admin - Delete product
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
    
    const product = await Product.findOne({ slug });
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Delete images from Cloudinary
    if (product.mainImagePublicId) {
      await deleteImage(product.mainImagePublicId);
    }
    
    if (product.imagePublicIds && product.imagePublicIds.length > 0) {
      for (const publicId of product.imagePublicIds) {
        await deleteImage(publicId);
      }
    }
    
    await Product.findByIdAndDelete(product._id);
    
    return NextResponse.json(
      { success: true, message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}