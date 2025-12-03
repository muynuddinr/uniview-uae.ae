// src/models/Product.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price: number;
  mainImage: string;
  mainImagePublicId: string;
  images?: string[];
  imagePublicIds?: string[];
  categoryId: mongoose.Types.ObjectId;
  subcategoryId?: mongoose.Types.ObjectId;
  features?: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  shortDescription: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  mainImage: {
    type: String,
    required: true,
  },
  mainImagePublicId: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  imagePublicIds: [{
    type: String,
  }],
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
  },
  features: [{
    type: String,
  }],
  inStock: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Pre-save middleware to generate slug from name
productSchema.pre('save', function(this: mongoose.Document & IProduct, next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Add virtual for id
productSchema.virtual('id').get(function(this: mongoose.Document & IProduct) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Ensure virtual fields are populated when using toObject
productSchema.set('toObject', {
  virtuals: true,
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;