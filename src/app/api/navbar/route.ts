// src/app/api/navbar/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const categories = await Category.find({})
      .select('name slug')
      .sort({ name: 1 });
    
    // Manually fetch subcategories for each category
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
    
    console.log('Navbar categories fetched:', categoriesWithSubcategories.length);
    return NextResponse.json({
      success: true,
      categories: categoriesWithSubcategories,
    });
  } catch (error) {
    console.error('Error fetching navbar data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch navbar data' },
      { status: 500 }
    );
  }
}