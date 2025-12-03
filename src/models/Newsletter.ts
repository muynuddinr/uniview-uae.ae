import mongoose, { Document, Schema } from 'mongoose';

export interface INewsletter extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  slug: string;
  status: 'active' | 'inactive';
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

const newsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// REMOVED: Pre-save middleware (now handled in API route)

// Add virtual for id
newsletterSchema.virtual('id').get(function(this: mongoose.Document & INewsletter) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
newsletterSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Newsletter = mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', newsletterSchema);

export default Newsletter;