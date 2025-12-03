// src/app/admin/dashboard/categories/[slug]/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FolderOpen, CheckCircle, XCircle } from 'lucide-react';
import { Category } from '@/types/category';
import CategoryForm from '../../../../../components/admin/CategoryForm';

const EditCategoryPage: React.FC = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  useEffect(() => {
    fetchCategory();
  }, [slug]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/admin/categories/${slug}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setCategory(data.category);
      } else {
        setError('Failed to fetch category');
      }
    } catch (err) {
      setError('An error occurred while fetching the category');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/admin/categories/${slug}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Category updated successfully!');
        setTimeout(() => {
          router.push('/admin/dashboard/categories');
        }, 1500);
      } else {
        setError(data.error || 'Failed to update category');
      }
    } catch (err) {
      setError('An error occurred while updating the category');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard/categories">
            <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          </div>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error || 'Category not found'}</p>
        </div>
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/dashboard/categories">
          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
          <p className="text-gray-600 mt-1">
            Update category information
          </p>
        </div>
      </div>

      {/* Success and Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Success</p>
            <p className="text-green-700 text-sm">{success}</p>
          </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Edit Category</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Update category information
              </p>
            </div>
            <div className="p-6 pt-6">
              <CategoryForm
                category={category}
                onSubmit={handleSubmit}
                isLoading={updating}
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
    </div>
  );
};

export default EditCategoryPage;