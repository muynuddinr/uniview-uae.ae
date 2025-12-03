// src/app/api/sitemap/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Fetch all products with slug
    const products = await Product.find({}).select('slug updatedAt').lean();

    // Fetch all categories with slug
    const categories = await Category.find({}).select('slug updatedAt').lean();

    // Fetch all subcategories with slug
    const subcategories = await Subcategory.find({}).select('slug updatedAt').lean();

    // Build URLs array with static and dynamic pages
    const staticPages = [
      { path: '/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
      { path: '/Aboutus', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { path: '/Contactus', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { path: '/Disclaimer', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
      { path: '/Faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Privacypolicy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
      { path: '/Solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { path: '/Termsofservice', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
      { path: '/products', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ];

    // Solution pages
    const solutionPages = [
      { path: '/Solutions/Banking-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Solutions/Building-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Solutions/Hospital-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Solutions/Hotel-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Solutions/Retail-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Solutions/School-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Solutions/Shopping-mall-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Solutions/Stadium-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { path: '/Solutions/Warehouse-solutions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ];

    // Dynamic product URLs
    const productUrls = products.map(product => ({
      path: `/products/${product.slug}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Dynamic category URLs
    const categoryUrls = categories.map(category => ({
      path: `/products?category=${category.slug}`,
      lastModified: category.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Dynamic subcategory URLs
    const subcategoryUrls = subcategories.map(subcategory => ({
      path: `/products?subcategory=${subcategory.slug}`,
      lastModified: subcategory.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    // Combine all URLs
    const allUrls = [
      ...staticPages,
      ...solutionPages,
      ...productUrls,
      ...categoryUrls,
      ...subcategoryUrls,
    ];

    return NextResponse.json({
      success: true,
      urls: allUrls,
    });
  } catch (error) {
    console.error('Error generating sitemap data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate sitemap data' },
      { status: 500 }
    );
  }
}
