'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, FolderOpen, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Category } from '@/types/category';
import CategoryForm from '../../../components/admin/CategoryForm';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        // Sort categories by createdAt in descending order (newest first)
        const sortedCategories = data.categories.sort((a: Category, b: Category) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setCategories(sortedCategories);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      setError('An error occurred while fetching categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(slug);
    try {
      const response = await fetch(`/api/admin/categories/${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat.slug !== slug));
        setSuccess('Category deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete category');
      }
    } catch (err) {
      setError('An error occurred while deleting the category');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (category: Category) => {
    setIsEditing(true);
    setEditData(category);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(false);
    setEditData(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
    setEditData(null);
    setError('');
    setSuccess('');
  };

  const handleFormSubmit = async (formDataObj: FormData) => {
    setFormLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = isEditing && editData 
        ? `/api/admin/categories/${editData.slug}`
        : '/api/admin/categories';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataObj,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(isEditing ? 'Category updated successfully!' : 'Category created successfully!');
        setFormLoading(false);
        setTimeout(() => {
          fetchCategories();
          handleCancelEdit();
          setSuccess('');
        }, 1500);
      } else {
        setError(data.error || (isEditing ? 'Failed to update category' : 'Failed to create category'));
        setFormLoading(false);
      }
    } catch (err) {
      setError('An error occurred while saving the category');
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Form and List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Category' : isCreating ? 'Create Category' : 'Categories'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Update category information' : isCreating ? 'Add a new category to organize your products' : 'Manage your product categories and organization'}
          </p>
        </div>
        {!isEditing && !isCreating && (
          <button 
            onClick={handleCreate}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </button>
        )}
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

      {/* Show Form or List */}
      {isEditing || isCreating ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isEditing ? 'Edit Category' : 'Create New Category'}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {isEditing ? 'Update category information' : 'Add a new category to organize your products'}
                </p>
              </div>
              <div className="p-6 pt-6">
                <CategoryForm
                  category={editData || undefined}
                  onSubmit={handleFormSubmit}
                  isLoading={formLoading}
                  error={error}
                  success={success}
                  setError={setError}
                  setSuccess={setSuccess}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <button
              onClick={handleCancelEdit}
              className="w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </button>

            {/* Guidelines */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Guidelines</h3>
              </div>
              <div className="p-6 text-sm text-gray-600 space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Use clear, descriptive names that customers will understand</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Add high-quality images that represent the category well</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Keep descriptions concise but informative</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Organize categories in a logical hierarchy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">All Categories</h3>
                  <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                    {categories.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and organize your product categories
                </p>
              </div>
              <div className="p-0">
                {categories.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                    <p className="text-gray-500 mb-4">Get started by creating your first category</p>
                    <button
                      onClick={handleCreate}
                      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Create Category
                    </button>
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b bg-gray-50">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Category</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Description</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Created</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {categories.map((category) => (
                            <tr key={category.id} className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-muted">
                              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                <div className="flex items-center space-x-3">
                                  {category.image ? (
                                    <img
                                      src={category.image}
                                      alt={category.name}
                                      className="w-10 h-10 rounded-lg object-cover"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <FolderOpen className="h-5 w-5 text-blue-600" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium text-gray-900">{category.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                <p className="text-gray-600 max-w-xs truncate">
                                  {category.description || 'No description'}
                                </p>
                              </td>
                              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                <div className="text-sm text-gray-500">
                                  {new Date(category.createdAt).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleEdit(category)}
                                    className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button 
                                    className="inline-flex items-center justify-center rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                                    onClick={() => handleDelete(category.slug)}
                                    disabled={deleteLoading === category.slug}
                                  >
                                    {deleteLoading === category.slug ? (
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
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-sm">
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-blue-900">Categories Overview</h3>
              </div>
              <div className="px-6 pb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Total Categories</span>
                  <span className="text-2xl font-bold text-blue-900">{categories.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-700">Active</span>
                  <span className="text-lg font-semibold text-green-600">{categories.length}</span>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleCreate}
                    className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Category
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Tips</h3>
              </div>
              <div className="p-6 text-sm text-gray-600 space-y-2">
                <p>• Use clear, descriptive names for categories</p>
                <p>• Add images to make categories more appealing</p>
                <p>• Organize categories logically for easy navigation</p>
                <p>• Use descriptions to provide context</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;