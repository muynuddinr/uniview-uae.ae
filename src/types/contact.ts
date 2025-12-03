export interface ContactSubmission {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  slug: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}