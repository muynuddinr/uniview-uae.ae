// src/components/admin/ProductForm.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Category } from '@/types/category';
import { Subcategory } from '@/types/subcategory';
import { Product } from '@/types/product';
import { Upload, X, Plus, Trash2, CheckCircle, XCircle, List, ChevronDown, Check } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  subcategories: Subcategory[];
  onSuccess: () => void;
  setError?: (error: string) => void;
  setSuccess?: (success: string) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  subcategories,
  onSuccess,
  setError,
  setSuccess,
}) => {
  // Basic product information
  const [name, setName] = useState(product?.name || '');
  const [slug, setSlug] = useState(product?.slug || '');
  const [shortDescription, setShortDescription] = useState(product?.shortDescription || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [inStock, setInStock] = useState(product?.inStock ?? true);

  // Track if user has manually modified the slug
  const [isSlugManuallyModified, setIsSlugManuallyModified] = useState(false);

  // Category and subcategory
  const [categoryId, setCategoryId] = useState(
    product?.categoryId 
      ? (typeof product.categoryId === 'object' ? product.categoryId.id : product.categoryId)
      : ''
  );
  const [subcategoryId, setSubcategoryId] = useState(
    product?.subcategoryId 
      ? (typeof product.subcategoryId === 'object' ? product.subcategoryId.id : product.subcategoryId)
      : ''
  );

  // Filtered subcategories based on selected category
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);

  // Images - main image is now required
  const [mainImagePreview, setMainImagePreview] = useState<string>(product?.mainImage || '');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [existingMainImage, setExistingMainImage] = useState(product?.mainImage || '');
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  // Features
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const [featuresText, setFeaturesText] = useState<string>(
    product?.features ? product.features.join('\n') : ''
  );

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setErrorState] = useState('');
  const [success, setSuccessState] = useState('');

  // Select dropdown states
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);

  // Set error and success functions
  const handleError = (error: string) => {
    setErrorState(error);
    if (setError) setError(error);
  };

  const handleSuccessMessage = (success: string) => {
    setSuccessState(success);
    if (setSuccess) setSuccess(success);
  };

  // Auto-generate slug from name
  useEffect(() => {
    if (!isSlugManuallyModified && name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(generatedSlug);
    }
  }, [name, product?.slug, isSlugManuallyModified]);

  // Reset slug modified flag when product changes
  useEffect(() => {
    setIsSlugManuallyModified(false);
  }, [product?.id]);

  // Handle manual slug changes
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setSlug(newSlug);
    
    if (!isSlugManuallyModified) {
      setIsSlugManuallyModified(true);
    }
  };

  // Handle name changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Filter subcategories when category changes
  useEffect(() => {
    if (categoryId) {
      const filtered = subcategories.filter((sub) => {
        if (!sub || !sub.categoryId) return false;

        if (typeof sub.categoryId === 'object') {
          return (
            sub.categoryId &&
            (sub.categoryId.id === categoryId ||
              (sub.categoryId as any)._id === categoryId)
          );
        } else {
          return sub.categoryId === categoryId;
        }
      });
      setFilteredSubcategories(filtered);

      // Reset subcategory if it doesn't belong to the selected category
      if (subcategoryId !== '' && subcategoryId !== 'none') {
        const currentSubcategory = subcategories.find(
          (sub) => sub && sub.id === subcategoryId
        );
        if (currentSubcategory && currentSubcategory.categoryId) {
          const subCatCategoryId =
            typeof currentSubcategory.categoryId === 'object'
              ? (currentSubcategory.categoryId as any).id
              : currentSubcategory.categoryId;
          if (subCatCategoryId !== categoryId) {
            setSubcategoryId('none');
          }
        }
      }
    } else {
      setFilteredSubcategories([]);
      setSubcategoryId('none');
    }
  }, [categoryId, subcategories, subcategoryId]);

  // Image management functions
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview('');
    setExistingMainImage('');
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    const newPreviews: string[] = [];
    let completedReads = 0;

    newFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews[index] = reader.result as string;
        completedReads++;
        
        if (completedReads === newFiles.length) {
          setAdditionalImages(prev => [...prev, ...newFiles]);
          setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExistingImage = (index: number) => {
    setImagesToDelete([...imagesToDelete, index]);
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Features management
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFeaturesText(text);
    
    const lines = text.split('\n').filter(line => line.trim() !== '');
    setFeatures(lines);
  };

  // Form submission - with main image validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    handleError('');
    handleSuccessMessage('');

    // Validate main image
    if (!mainImagePreview && !existingMainImage) {
      handleError('Main image is required');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('slug', slug);
      formData.append('shortDescription', shortDescription);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('categoryId', categoryId);
      
      if (subcategoryId && subcategoryId !== 'none') {
        formData.append('subcategoryId', subcategoryId);
      }
      formData.append('inStock', inStock.toString());
      
      // Handle main image - now required
      if (mainImageFile) {
        formData.append('mainImage', mainImageFile);
      } else if (product && existingMainImage) {
        // Keep existing main image
        formData.append('keepCurrentMainImage', 'true');
      }
      
      // Add additional images
      additionalImages.forEach(file => {
        formData.append('images', file);
      });
      
      // Add images to delete
      imagesToDelete.forEach(index => {
        formData.append('imagesToDelete', index.toString());
      });
      
      // Add features
      features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });

      const url = product
        ? `/api/admin/products/${product.slug}`
        : '/api/admin/products';

      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccessMessage(
          product
            ? 'Product updated successfully!'
            : 'Product created successfully!'
        );
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        handleError(data.error || 'Something went wrong');
      }
    } catch (err) {
      handleError('An error occurred while saving the product');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get display values
  const getCategoryName = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    return category?.name || 'Select a category';
  };

  const getSubcategoryName = (id: string) => {
    if (id === 'none') return 'None';
    const subcategory = filteredSubcategories.find(sub => sub.id === id);
    return subcategory?.name || (!categoryId ? 'Select category first' : 'No subcategories');
  };

  const getStockStatus = (value: boolean) => {
    return value ? 'In Stock' : 'Out of Stock';
  };

  return (
    <div className="space-y-6">
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
            onClick={() => handleError('')}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium block text-gray-700">
                  Product Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                  placeholder="Enter product name"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium block text-gray-700">
                  Slug *
                </label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={handleSlugChange}
                  required
                  placeholder="product-slug"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500">
                  {isSlugManuallyModified 
                    ? "Slug is manually modified. Changes to name won't affect it."
                    : "Slug will auto-update based on product name."}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="shortDescription" className="text-sm font-medium block text-gray-700">
                Short Description
              </label>
              <textarea
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                rows={2}
                placeholder="Brief product description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium block text-gray-700">
                Full Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Detailed product description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium block text-gray-700">
                  Price (AED) *
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium block text-gray-700">
                  Category *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                  >
                    <span className={categoryId ? 'text-gray-900' : 'text-gray-400'}>
                      {getCategoryName(categoryId)}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  {categoryOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => {
                              setCategoryId(category.id);
                              setCategoryOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 flex items-center space-x-2 cursor-pointer"
                          >
                            {category.image && (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-6 h-6 rounded object-cover"
                              />
                            )}
                            <span>{category.name}</span>
                            {categoryId === category.id && (
                              <Check className="h-4 w-4 ml-auto text-blue-600" />
                            )}
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-500 cursor-not-allowed">
                          No categories available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium block text-gray-700">
                  Subcategory
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSubcategoryOpen(!subcategoryOpen)}
                    disabled={!categoryId || filteredSubcategories.length === 0}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className={subcategoryId && subcategoryId !== 'none' ? 'text-gray-900' : 'text-gray-400'}>
                      {getSubcategoryName(subcategoryId)}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  {subcategoryOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setSubcategoryId('none');
                          setSubcategoryOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                      >
                        None
                        {subcategoryId === 'none' && (
                          <Check className="h-4 w-4 float-right text-blue-600" />
                        )}
                      </button>
                      {filteredSubcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          type="button"
                          onClick={() => {
                            setSubcategoryId(subcategory.id);
                            setSubcategoryOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 flex items-center space-x-2 cursor-pointer"
                        >
                          {subcategory.image && (
                            <img
                              src={subcategory.image}
                              alt={subcategory.name}
                              className="w-6 h-6 rounded object-cover"
                            />
                          )}
                          <span>{subcategory.name}</span>
                          {subcategoryId === subcategory.id && (
                            <Check className="h-4 w-4 ml-auto text-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium block text-gray-700">
                Stock Status
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setStockOpen(!stockOpen)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                >
                  <span>{getStockStatus(inStock)}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                
                {stockOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setInStock(true);
                        setStockOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 cursor-pointer flex justify-between items-center"
                    >
                      In Stock
                      {inStock && <Check className="h-4 w-4 text-blue-600" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInStock(false);
                        setStockOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 cursor-pointer flex justify-between items-center"
                    >
                      Out of Stock
                      {!inStock && <Check className="h-4 w-4 text-blue-600" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Image - Now Required */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Main Image *
              {(!mainImagePreview && !existingMainImage) && (
                <span className="text-red-500 text-sm ml-2">(Required)</span>
              )}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    id="mainImage"
                    type="file"
                    ref={mainImageInputRef}
                    onChange={handleMainImageChange}
                    accept="image/*"
                    className="hidden"
                    required={!existingMainImage}
                  />
                  <button
                    type="button"
                    onClick={() => mainImageInputRef.current?.click()}
                    className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-center transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Main Image
                  </button>
                </div>
                {mainImagePreview && (
                  <div className="relative">
                    <img
                      src={mainImagePreview}
                      alt="Main product preview"
                      className="h-32 w-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeMainImage}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-300 hover:bg-gray-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {existingMainImage && !mainImagePreview && (
                  <div className="relative">
                    <img
                      src={existingMainImage}
                      alt="Main product preview"
                      className="h-32 w-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeMainImage}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-300 hover:bg-gray-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              {(!mainImagePreview && !existingMainImage) && (
                <p className="text-sm text-red-500">Please upload a main image for the product</p>
              )}
            </div>
          </div>

          {/* Additional Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Images</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    id="additionalImages"
                    type="file"
                    ref={imagesInputRef}
                    onChange={handleAdditionalImagesChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => imagesInputRef.current?.click()}
                    className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-center transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Additional Images
                  </button>
                </div>
              </div>

              {/* Existing images */}
              {existingImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {existingImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square overflow-hidden rounded-lg border">
                          <img
                            src={image}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New image previews */}
              {additionalImagePreviews.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">New Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {additionalImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square overflow-hidden rounded-lg border">
                          <img
                            src={preview}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
            <div className="space-y-2">
              <label htmlFor="features" className="text-sm font-medium block text-gray-700">
                Features (one per line)
              </label>
              <textarea
                id="features"
                value={featuresText}
                onChange={handleFeaturesChange}
                rows={6}
                placeholder="• Feature 1&#10;• Feature 2&#10;• Feature 3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
              />
              <p className="text-xs text-gray-500">
                Enter each feature on a new line. You can use bullet points (•) or just start a new line.
              </p>
            </div>
            
            {/* Features Preview */}
            {features.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Features Preview:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-6 border-t">
            <button
              type="button"
              onClick={() => window.history.back()}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (!mainImagePreview && !existingMainImage)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{product ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>{product ? 'Update Product' : 'Create Product'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;