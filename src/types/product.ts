// src/types/product.ts
import { Category } from "./category";
import { Subcategory } from "./subcategory";

export interface Product {
  _id: string;
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price: number;
  mainImage: string;
  mainImagePublicId: string;
  images?: string[];
  imagePublicIds?: string[];
  categoryId: string | Category; 
  subcategoryId?: string | Subcategory;
  features?: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}