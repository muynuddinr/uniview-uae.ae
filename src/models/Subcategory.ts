// src/models/Subcategory.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISubcategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imagePublicId?: string;
  categoryId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const subcategorySchema = new Schema<ISubcategory>({
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
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, {
  timestamps: true,
});

// Pre-save middleware to generate slug from name
subcategorySchema.pre('save', function(this: mongoose.Document & ISubcategory, next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Add virtual for id
subcategorySchema.virtual('id').get(function(this: mongoose.Document & ISubcategory) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
subcategorySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Subcategory = mongoose.models.Subcategory || mongoose.model<ISubcategory>('Subcategory', subcategorySchema);

export default Subcategory;