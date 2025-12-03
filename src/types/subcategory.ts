import { Category } from "./category";

export interface Subcategory {
  _id: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imagePublicId?: string;
  categoryId: string | Category;
  createdAt: Date;
  updatedAt: Date;
}
