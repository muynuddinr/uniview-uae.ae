export interface Category {
  _id: string;
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}