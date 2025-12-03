export interface NewsletterSubscription {
  _id: string;
  id: string;
  email: string;
  slug: string;
  status: 'active' | 'inactive';
  subscribedAt: Date;
  unsubscribedAt?: Date;
}