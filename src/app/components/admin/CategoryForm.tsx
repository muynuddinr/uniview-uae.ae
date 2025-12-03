// src/components/admin/CategoryForm.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Category } from '@/types/category';
import { CheckCircle, XCircle, Upload, X } from 'lucide-react';

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  success?: string;
  error?: string;
  setError?: (error: string) => void;
  setSuccess?: (success: string) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  isLoading = false,
  success = '',
  error = '',
  setError,
  setSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });
  const [isSlugManuallyModified, setIsSlugManuallyModified] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [existingImage, setExistingImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || ''
      });
      setExistingImage(category.image || '');
    }
  }, [category]);

  // Auto-generate slug from name
  useEffect(() => {
    if (!isSlugManuallyModified && formData.name) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug: generatedSlug
      }));
    }
  }, [formData.name, isSlugManuallyModified]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setFormData(prev => ({
      ...prev,
      slug: newSlug
    }));
    
    if (!isSlugManuallyModified) {
      setIsSlugManuallyModified(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData(prev => ({
      ...prev,
      name: newName
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveExistingImage = () => {
    setExistingImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      if (setError) setError('Name is required');
      return;
    }

    if (!formData.slug.trim()) {
      if (setError) setError('Slug is required');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name.trim());
    data.append('slug', formData.slug.trim());
    data.append('description', formData.description.trim());
    
    if (image) {
      data.append('image', image);
    }

    if (category && !image && existingImage) {
      // Keep existing image if not changing
      data.append('keepCurrentImage', 'true');
    }

    try {
      await onSubmit(data);
    } catch (err) {
      if (setError) setError('An error occurred while processing the category');
    }
  };

  return (
    <div className="space-y-4">
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
            onClick={() => setError && setError('')}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Category Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                Category Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                required
                placeholder="e.g., Electronics, Clothing"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-gray-500">
                Choose a descriptive name for your category
              </p>
            </div>

            {/* Slug Field */}
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium text-gray-700 block">
                Slug *
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleSlugChange}
                required
                placeholder="electronics, clothing"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-gray-500">
                {isSlugManuallyModified 
                  ? "Slug is manually modified. Changes to name won't affect it."
                  : "Slug will auto-update based on category name."}
              </p>
            </div>
            
            {/* Image Upload */}
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium text-gray-700 block">
                Category Image
              </label>
              <div className="space-y-3">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white/80 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                ) : existingImage ? (
                  <div className="relative">
                    <img
                      src={existingImage}
                      alt="Category preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white/80 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={handleRemoveExistingImage}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500">
                {existingImage 
                  ? "Current image will be kept unless you upload a new one or remove it."
                  : "Add an image to represent this category"
                }
              </p>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 block">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe this category..."
                className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
              <p className="text-xs text-gray-500">
                Optional description for this category
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button 
              type="submit" 
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 min-w-32"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{category ? 'Updating...' : 'Creating...'}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{category ? 'Update Category' : 'Create Category'}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;