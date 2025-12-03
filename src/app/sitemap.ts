// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://uniview-uae.ae';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB();

    // Fetch all products with slug
    const products = await Product.find({}).select('slug updatedAt').lean();

    // Fetch all categories with slug
    const categories = await Category.find({}).select('slug updatedAt').lean();

    // Fetch all subcategories with slug
    const subcategories = await Subcategory.find({}).select('slug updatedAt').lean();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/Aboutus`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/Contactus`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/Disclaimer`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/Faq`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Privacypolicy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/Solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/Termsofservice`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/products`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ];

    // Solution pages
    const solutionPages: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/Solutions/Banking-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Solutions/Building-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Solutions/Hospital-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Solutions/Hotel-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Solutions/Retail-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Solutions/School-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Solutions/Shopping-mall-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Solutions/Stadium-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/Solutions/Warehouse-solutions`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];

    // Dynamic product URLs from backend
    const productUrls: MetadataRoute.Sitemap = products.map(product => ({
      url: `${BASE_URL}/products/${product.slug}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Dynamic category URLs from backend
    const categoryUrls: MetadataRoute.Sitemap = categories.map(category => ({
      url: `${BASE_URL}/products?category=${category.slug}`,
      lastModified: category.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Dynamic subcategory URLs from backend
    const subcategoryUrls: MetadataRoute.Sitemap = subcategories.map(subcategory => ({
      url: `${BASE_URL}/products?subcategory=${subcategory.slug}`,
      lastModified: subcategory.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
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

    return allUrls;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return basic sitemap if database connection fails
    return [
      {
        url: `${BASE_URL}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ];
  }
}
