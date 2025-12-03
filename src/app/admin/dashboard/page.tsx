'use client';

import React, { useEffect, useState } from 'react';
import { 
  FolderOpen, 
  FolderTree, 
  Package, 
  Users, 
  TrendingUp,
  ShoppingCart,
  DollarSign
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    categories: 0,
    subcategories: 0,
    products: 0,
    admins: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categoriesRes, subcategoriesRes, productsRes, adminsRes] = await Promise.all([
          fetch('/api/admin/categories'),
          fetch('/api/admin/subcategories'),
          fetch('/api/admin/products'),
          fetch('/api/admin/admins'),
        ]);

        const categoriesData = await categoriesRes.json();
        const subcategoriesData = await subcategoriesRes.json();
        const productsData = await productsRes.json();
        const adminsData = await adminsRes.json();

        setStats({
          categories: categoriesData.categories?.length || 0,
          subcategories: subcategoriesData.subcategories?.length || 0,
          products: productsData.products?.length || 0,
          admins: adminsData.admins?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, description }: any) => (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm border-l-4 border-l-${color}-500 hover:shadow-lg transition-all duration-300`}>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
        <h3 className="text-sm font-medium">{title}</h3>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="px-6 pb-6">
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome to your admin dashboard. Manage your store efficiently.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Categories"
          value={stats.categories}
          icon={FolderOpen}
          color="blue"
          description="Product categories"
        />
        <StatCard
          title="Subcategories"
          value={stats.subcategories}
          icon={FolderTree}
          color="green"
          description="Nested categories"
        />
        <StatCard
          title="Products"
          value={stats.products}
          icon={Package}
          color="purple"
          description="Active products"
        />
        <StatCard
          title="Admin Users"
          value={stats.admins}
          icon={Users}
          color="orange"
          description="Team members"
        />
      </div>

      {/* Quick Actions & Welcome */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Quickly access frequently used features
            </p>
            <div className="grid grid-cols-2 gap-4">
              <a href="/admin/dashboard/categories/create" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <FolderOpen className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold">Add Category</h3>
                <p className="text-sm text-gray-500">Create new category</p>
              </a>
              <a href="/admin/dashboard/subcategories/create" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <FolderTree className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold">Add Subcategory</h3>
                <p className="text-sm text-gray-500">Create new subcategory</p>
              </a>
              <a href="/admin/dashboard/products/create" className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                <Package className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-semibold">Add Product</h3>
                <p className="text-sm text-gray-500">Create new product</p>
              </a>
              <div className="block p-4 bg-white rounded-lg shadow-sm border">
                <ShoppingCart className="h-8 w-8 text-orange-600 mb-2" />
                <h3 className="font-semibold">View Orders</h3>
                <p className="text-sm text-gray-500">Manage orders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Store Summary</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Total Products Value</span>
                <span className="font-bold text-green-600">$0.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Out of Stock</span>
                <span className="font-bold text-red-600">0 Products</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Active Categories</span>
                <span className="font-bold text-blue-600">{stats.categories}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-gray-500">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <p className="text-sm text-gray-600 mb-4">
            Latest actions in your store
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Welcome to Uniview Admin</p>
                <p className="text-xs text-gray-500">Your admin dashboard is ready to use</p>
              </div>
              <span className="text-xs text-gray-500">Now</span>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Start adding products</p>
                <p className="text-xs text-gray-500">Create categories and add your first products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;