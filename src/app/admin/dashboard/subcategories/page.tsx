'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, FolderTree, CheckCircle, XCircle } from 'lucide-react';
import { Subcategory } from '@/types/subcategory';
import { Category } from '@/types/category';

const SubcategoriesPage: React.FC = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subcategoriesRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/subcategories', {
          method: 'GET',
          credentials: 'include',
        }),
        fetch('/api/admin/categories', {
          method: 'GET',
          credentials: 'include',
        })
      ]);
      
      if (subcategoriesRes.ok) {
        const subcategoriesData = await subcategoriesRes.json();
        console.log('Subcategories data:', subcategoriesData.subcategories);
        // Sort subcategories by createdAt in descending order (newest first)
        const sortedSubcategories = subcategoriesData.subcategories.sort((a: Subcategory, b: Subcategory) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSubcategories(sortedSubcategories);
      } else {
        setError('Failed to fetch subcategories');
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        console.log('Categories data:', categoriesData.categories);
        setCategories(categoriesData.categories);
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this subcategory? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(slug);
    try {
      const response = await fetch(`/api/admin/subcategories/${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setSubcategories(subcategories.filter(sub => sub.slug !== slug));
        setSuccess('Subcategory deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete subcategory');
      }
    } catch (err) {
      setError('An error occurred while deleting the subcategory');
    } finally {
      setDeleteLoading(null);
    }
  };

  const getCategoryName = (subcategory: Subcategory): string => {
    console.log('Processing subcategory:', subcategory);
    
    if (typeof subcategory.categoryId === 'object' && subcategory.categoryId !== null) {
      return (subcategory.categoryId as any).name || 'Unknown Category';
    }
    
    if (typeof subcategory.categoryId === 'string') {
      const category = categories.find(cat => cat.id === subcategory.categoryId);
      return category?.name || 'Unknown Category';
    }
    
    return 'Unknown Category';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subcategories</h1>
          <p className="text-gray-600 mt-1">
            Manage your product subcategories and organization
          </p>
        </div>
        <Link href="/admin/dashboard/subcategories/create">
          <button className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Subcategory
          </button>
        </Link>
      </div>

      {/* Success and Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Success</p>
            <p className="text-green-700 text-sm">{success}</p>
          </div>
          <button
            onClick={() => setSuccess('')}
            className="ml-auto text-green-600 hover:text-green-800"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError('')}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subcategories List */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center space-x-2">
                <FolderTree className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">All Subcategories</h3>
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                  {subcategories.length}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Manage and organize your product subcategories
              </p>
            </div>
            <div className="p-0">
              {subcategories.length === 0 ? (
                <div className="text-center py-12">
                  <FolderTree className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No subcategories found</h3>
                  <p className="text-gray-500 mb-4">Get started by creating your first subcategory</p>
                  <Link href="/admin/dashboard/subcategories/create">
                    <button className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      Create Subcategory
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b bg-gray-50">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Subcategory</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Category</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Description</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Created</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {subcategories.map((subcategory) => (
                          <tr key={subcategory.id} className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                              <div className="flex items-center space-x-3">
                                {subcategory.image ? (
                                  <img
                                    src={subcategory.image}
                                    alt={subcategory.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FolderTree className="h-5 w-5 text-green-600" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{subcategory.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {getCategoryName(subcategory)}
                              </span>
                            </td>
                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                              <p className="text-gray-600 max-w-xs truncate">
                                {subcategory.description || 'No description'}
                              </p>
                            </td>
                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                              <div className="text-sm text-gray-500">
                                {new Date(subcategory.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                              <div className="flex justify-end space-x-2">
                                <Link href={`/admin/dashboard/subcategories/${subcategory.slug}/edit`}>
                                  <button className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    <Edit className="h-4 w-4" />
                                  </button>
                                </Link>
                                <button 
                                  className="inline-flex items-center justify-center rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                                  onClick={() => handleDelete(subcategory.slug)}
                                  disabled={deleteLoading === subcategory.slug}
                                >
                                  {deleteLoading === subcategory.slug ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700"></div>
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-sm">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-green-900">Subcategories Overview</h3>
            </div>
            <div className="px-6 pb-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-green-700">Total Subcategories</span>
                <span className="text-2xl font-bold text-green-900">{subcategories.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700">Parent Categories</span>
                <span className="text-lg font-semibold text-blue-600">{categories.length}</span>
              </div>
              <div className="pt-4">
                <Link href="/admin/dashboard/subcategories/create">
                  <button className="w-full inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Subcategory
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Tips</h3>
            </div>
            <div className="p-6 text-sm text-gray-600 space-y-2">
              <p>• Use clear, descriptive names for subcategories</p>
              <p>• Add images to make subcategories more appealing</p>
              <p>• Organize subcategories logically under parent categories</p>
              <p>• Use descriptions to provide context</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoriesPage;