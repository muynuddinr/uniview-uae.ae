import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'superadmin']).default('admin'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  imagePublicId: z.string().optional(),
});

export const subcategorySchema = z.object({
  name: z.string().min(2, 'Subcategory name must be at least 2 characters'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  imagePublicId: z.string().optional(),
  categoryId: z.string().min(1, 'Category ID is required'),
});

export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  slug: z.string().min(1, 'Slug is required'),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number'),
  mainImage: z.string().optional(),
  mainImagePublicId: z.string().optional(),
  images: z.array(z.string()).optional(),
  imagePublicIds: z.array(z.string()).optional(),
  categoryId: z.string().min(1, 'Category ID is required'),
  subcategoryId: z.string().optional(),
  features: z.array(z.string()).optional(),
  specifications: z.record(z.string(), z.string()).optional(),
  inStock: z.boolean().default(true),
});