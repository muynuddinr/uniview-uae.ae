// src/models/Category.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  imagePublicId: {
    type: String,
  },
}, {
  timestamps: true,
});

// Pre-save middleware to generate slug from name
categorySchema.pre('save', function(this: mongoose.Document & ICategory, next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Add virtual for id
categorySchema.virtual('id').get(function(this: mongoose.Document & ICategory) {
  return this._id.toHexString();
});

// Add virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Subcategory',
  localField: '_id',
  foreignField: 'categoryId',
});

// Ensure virtual fields are serialized
categorySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Ensure virtual fields are populated when using toObject
categorySchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

export default Category;