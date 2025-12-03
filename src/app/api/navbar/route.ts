// src/app/api/navbar/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const categories = await Category.find({})
      .populate({
        path: 'subcategories',
        model: Subcategory,
        select: 'name slug'
      })
      .select('name slug subcategories')
      .sort({ name: 1 });
    
    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error('Error fetching navbar data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch navbar data' },
      { status: 500 }
    );
  }
}