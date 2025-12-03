// src/components/admin/SubcategoryForm.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, XCircle } from 'lucide-react';
import { Subcategory } from '@/types/subcategory';
import { Category } from '@/types/category';

interface SubcategoryFormProps {
  subcategory?: Subcategory | null;
  categories: Category[];
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  success?: string;
  error?: string;
  setError?: (error: string) => void;
  setSuccess?: (success: string) => void;
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
  subcategory,
  categories,
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
    description: '',
    categoryId: ''
  });
  const [isSlugManuallyModified, setIsSlugManuallyModified] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [existingImage, setExistingImage] = useState<string>('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (subcategory) {
      setFormData({
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description || '',
        categoryId: typeof subcategory.categoryId === 'object' 
          ? (subcategory.categoryId as any).id 
          : subcategory.categoryId
      });
      setExistingImage(subcategory.image || '');
    }
  }, [subcategory]);

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

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      categoryId: value
    }));
    setCategoryOpen(false);
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
    
    if (!formData.categoryId) {
      if (setError) setError('Category is required');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name.trim());
    data.append('slug', formData.slug.trim());
    data.append('description', formData.description.trim());
    data.append('categoryId', formData.categoryId);
    
    if (image) {
      data.append('image', image);
    }

    if (subcategory && !image && existingImage) {
      // Keep existing image if not changing
      data.append('keepCurrentImage', 'true');
    }

    try {
      await onSubmit(data);
    } catch (err) {
      if (setError) setError('An error occurred while processing the subcategory');
    }
  };

  const getCategoryName = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    return category?.name || 'Select a parent category';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Subcategory Name */}
        <div className="space-y-3">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
            Subcategory Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            required
            placeholder="e.g., Smartphones, Laptops, T-Shirts"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
          <p className="text-xs text-gray-500">
            Choose a descriptive name for your subcategory
          </p>
        </div>

        {/* Slug Field */}
        <div className="space-y-3">
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
            placeholder="smartphones, laptops, t-shirts"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
          <p className="text-xs text-gray-500">
            {isSlugManuallyModified 
              ? "Slug is manually modified. Changes to name won't affect it."
              : "Slug will auto-update based on subcategory name."}
          </p>
        </div>
        
        {/* Parent Category */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">
            Parent Category *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
            >
              <span className={formData.categoryId ? 'text-gray-900' : 'text-gray-400'}>
                {getCategoryName(formData.categoryId)}
              </span>
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {categoryOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleSelectChange(category.id)}
                    className="w-full px-3 py-2 text-left hover:bg-green-50 focus:bg-green-50 cursor-pointer flex items-center space-x-2"
                  >
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-6 h-6 rounded object-cover"
                      />
                    )}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Choose which category this subcategory belongs to
          </p>
        </div>
        
        {/* Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">
            Subcategory Image
          </label>
          <div className="space-y-3">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Subcategory preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white border border-gray-300 rounded-md px-3 py-1 text-sm flex items-center"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Remove
                </button>
              </div>
            ) : existingImage ? (
              <div className="relative">
                <img
                  src={existingImage}
                  alt="Subcategory preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveExistingImage}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white border border-gray-300 rounded-md px-3 py-1 text-sm flex items-center"
                >
                  <XCircle className="h-4 w-4 mr-1" />
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
            Add an image to represent this subcategory
          </p>
        </div>
        
        {/* Description */}
        <div className="space-y-3">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 block">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe this subcategory..."
            className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
          <p className="text-xs text-gray-500">
            Optional description for this subcategory
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white min-w-32 h-10 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>{subcategory ? 'Updating...' : 'Creating...'}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>{subcategory ? 'Update' : 'Create'} Subcategory</span>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default SubcategoryForm;