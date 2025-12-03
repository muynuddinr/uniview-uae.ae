export interface Admin {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  createdAt: Date;
  updatedAt: Date;
}