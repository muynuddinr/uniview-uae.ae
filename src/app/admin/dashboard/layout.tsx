import React from 'react';
import AdminLayout from '../../components/admin/Layout';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default DashboardLayout;