// src/app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { verifyAdminAuth } from '@/lib/apiAuth';
import { uploadImage, uploadMultipleImages } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await verifyAdminAuth(request);
    if (!auth.isValid) {
      return auth.response;
    }

    await connectDB();

    const products = await Product.find({})
      .populate('categoryId', 'name slug image')
      .populate('subcategoryId', 'name slug image')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products: products
    }, { status: 200 });

  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products'
      },
      { status: 500 }
    );
  }
}

// POST: Admin - Create new product
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
    const shortDescription = formData.get('shortDescription') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const categoryId = formData.get('categoryId') as string;
    const subcategoryId = formData.get('subcategoryId') as string;
    const inStock = formData.get('inStock') === 'true';
    const mainImageFile = formData.get('mainImage') as File;
    
    let finalSlug = slug;
    if (!finalSlug && name) {
      finalSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    // Validate required fields including main image
    if (!name || !finalSlug || !categoryId || !price) {
      return NextResponse.json(
        { success: false, error: 'Name, slug, category, and price are required' },
        { status: 400 }
      );
    }
    
    // Validate main image is provided
    if (!mainImageFile || mainImageFile.size === 0) {
      return NextResponse.json(
        { success: false, error: 'Main image is required' },
        { status: 400 }
      );
    }
    
    const existingProduct = await Product.findOne({ slug: finalSlug });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product with this slug already exists' },
        { status: 400 }
      );
    }
    
    // Handle main image upload - now required
    let mainImageUrl = '';
    let mainImagePublicId = '';
    if (mainImageFile && mainImageFile.size > 0) {
      try {
        const uploadResult = await uploadImage(mainImageFile, 'products/main');
        // Ensure we get the full secure URL
        mainImageUrl = uploadResult.url;
        mainImagePublicId = uploadResult.publicId;
        
        // Debug: Log the actual URL being stored
        console.log('Main image uploaded - URL:', mainImageUrl);
        console.log('Main image publicId:', mainImagePublicId);
      } catch (error) {
        console.error('Error uploading main image:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to upload main image' },
          { status: 500 }
        );
      }
    }
    
    // Handle additional images
    const images: string[] = [];
    const imagePublicIds: string[] = [];
    const imageFiles = formData.getAll('images') as File[];
    
    // Filter out empty files
    const validImageFiles = imageFiles.filter(file => file && file.size > 0);
    
    if (validImageFiles.length > 0) {
      try {
        const uploadResults = await uploadMultipleImages(validImageFiles, 'products/gallery');
        uploadResults.forEach(result => {
          images.push(result.url);
          imagePublicIds.push(result.publicId);
        });
      } catch (error) {
        console.error('Error uploading additional images:', error);
        // Continue with product creation even if additional images fail
      }
    }
    
    // Handle features
    const features: string[] = [];
    let featureIndex = 0;
    while (formData.get(`features[${featureIndex}]`)) {
      const feature = formData.get(`features[${featureIndex}]`) as string;
      if (feature.trim()) {
        features.push(feature.trim());
      }
      featureIndex++;
    }
    
    const product = new Product({
      name,
      slug: finalSlug,
      shortDescription,
      description,
      price,
      mainImage: mainImageUrl,
      mainImagePublicId,
      images,
      imagePublicIds,
      categoryId,
      subcategoryId: subcategoryId && subcategoryId !== 'none' ? subcategoryId : undefined,
      features,
      inStock
    });
    
    await product.save();
    
    const populatedProduct = await Product.findById(product._id)
      .populate('categoryId', 'name')
      .populate('subcategoryId', 'name');
    
    return NextResponse.json(
      { success: true, message: 'Product created successfully', product: populatedProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}