'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  FolderTree,
  Package,
  LogOut,
  Mail,
  Users
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Categories', href: '/admin/dashboard/categories', icon: FolderOpen },
  { name: 'Subcategories', href: '/admin/dashboard/subcategories', icon: FolderTree },
  { name: 'Products', href: '/admin/dashboard/products', icon: Package },
  { name: 'Contacts', href: '/admin/dashboard/contacts', icon: Mail },
  { name: 'Newsletter', href: '/admin/dashboard/newsletter', icon: Users },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout, admin } = useAdminAuth();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-gradient-to-b from-blue-900 to-purple-900 text-white">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 px-4 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-900 font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Uniview</h1>
              <p className="text-blue-200 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-4 py-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="font-semibold text-lg">
                {admin?.name?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{admin?.name || 'Admin User'}</p>
              <p className="text-blue-200 text-xs truncate">{admin?.email || 'admin@uniview.com'}</p>
              <span className="inline-block px-2 py-1 text-xs bg-blue-600 rounded-full mt-1">
                {admin?.role || 'Admin'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-blue-900 shadow-lg'
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                      isActive ? 'text-blue-900' : 'text-blue-300 group-hover:text-white'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="flex-shrink-0 border-t border-blue-700 p-4">
          <button
            onClick={logout}
            className="group flex items-center w-full px-3 py-3 text-sm font-medium rounded-xl text-blue-100 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut className="mr-3 h-5 w-5 text-blue-300 group-hover:text-white" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;