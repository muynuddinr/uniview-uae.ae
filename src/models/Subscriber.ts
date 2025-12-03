// src/models/Subscriber.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscriber extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  status: 'active' | 'inactive';
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

const subscriberSchema = new Schema<ISubscriber>({
  email: {
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

// Add virtual for id
subscriberSchema.virtual('id').get(function(this: mongoose.Document & ISubscriber) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
subscriberSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Subscriber = mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', subscriberSchema);

export default Subscriber;