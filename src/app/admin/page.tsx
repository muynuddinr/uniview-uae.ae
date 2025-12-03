import React from 'react';
import { redirect } from 'next/navigation';

const AdminPage: React.FC = () => {
  redirect('/admin/login');
  return null;
};

export default AdminPage;