'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FolderTree, CheckCircle, XCircle } from 'lucide-react';
import { Category } from '@/types/category';
import SubcategoryForm from '../../../../components/admin/SubcategoryForm';

const CreateSubcategoryPage: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        setCategories(data.categories);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      setError('An error occurred while fetching categories');
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/subcategories', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Subcategory created successfully!');
        setTimeout(() => {
          router.push('/admin/dashboard/subcategories');
        }, 1500);
      } else {
        setError(data.error || 'Failed to create subcategory');
      }
    } catch (err) {
      setError('An error occurred while creating the subcategory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/dashboard/subcategories">
          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subcategories
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Subcategory</h1>
          <p className="text-gray-600 mt-1">
            Add a new subcategory to organize your products
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
        {/* Create Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-green-50 to-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center space-x-2">
                <FolderTree className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Create New Subcategory</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Add a new subcategory to organize your products under a parent category
              </p>
            </div>
            <div className="p-6 pt-6">
              <SubcategoryForm
                categories={categories}
                onSubmit={handleSubmit}
                isLoading={loading}
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
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Use clear, descriptive names that customers will understand</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Each subcategory must belong to a parent category</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Add high-quality images that represent the subcategory well</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Keep descriptions concise but informative</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubcategoryPage;