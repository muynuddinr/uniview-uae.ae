// src/components/products/ProductDetail.tsx
'use client';

import React, { useState, useCallback, memo, useMemo, useEffect } from 'react';
import { ShoppingCart, Star, Package, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  mainImage?: string;
  images?: string[];
  shortDescription?: string;
  description?: string;
  features?: string[];
  inStock: boolean;
  categoryId?: { name: string; slug: string };
  subcategoryId?: { name: string; slug: string };
}

interface ProductDetailProps {
  product: Product;
}

// Contact Form Interfaces
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

// Contact Form Component
const ContactFormPopup = memo(({ 
  isOpen, 
  onClose, 
  productName 
}: { 
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: productName,
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');

  // Update subject when productName changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      subject: productName
    }));
  }, [productName]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please provide a valid email address (e.g., name@example.com).';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your mobile number.';
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,20}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please provide a valid phone number (numbers, spaces, hyphens, parentheses only).';
      } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
        newErrors.phone = 'Phone number must be at least 8 digits.';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject.';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const filteredValue = value.replace(/[^\d\s\-\(\)\+]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: filteredValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('Sending...');
    setSubmitStatus('');

    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('Message sent successfully! We will get back to you soon.');
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: productName,
          message: ''
        });
        
        // Close popup after success
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitMessage(result.error || 'Failed to send message. Please try again.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('Network error. Please try again later.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage('');
        setSubmitStatus('');
      }, 5000);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0560f5]">Enquiry Related</h2>
            <p className="text-gray-600 text-sm mt-1">
              Required fields are marked <span className="text-[#0560f5] font-semibold">*</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-700 font-semibold block text-sm mb-2">
                Name <span className="text-[#0560f5]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Smith"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 shadow-sm outline-none text-sm ${
                  errors.name 
                    ? 'border-red-400 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 bg-gray-50 focus:border-[#0560f5] focus:bg-white focus:shadow-md'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700 font-semibold block text-sm mb-2">
                Email <span className="text-[#0560f5]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 shadow-sm outline-none text-sm ${
                  errors.email 
                    ? 'border-red-400 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 bg-gray-50 focus:border-[#0560f5] focus:bg-white focus:shadow-md'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-700 font-semibold block text-sm mb-2">
                Mobile <span className="text-[#0560f5]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+971 50 123 4567"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 shadow-sm outline-none text-sm ${
                  errors.phone 
                    ? 'border-red-400 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 bg-gray-50 focus:border-[#0560f5] focus:bg-white focus:shadow-md'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700 font-semibold block text-sm mb-2">
                Subject <span className="text-[#0560f5]">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 shadow-sm outline-none text-sm ${
                  errors.subject 
                    ? 'border-red-400 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 bg-gray-50 focus:border-[#0560f5] focus:bg-white focus:shadow-md'
                }`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-gray-700 font-semibold block text-sm mb-2">
              Message <span className="text-[#0560f5]">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Please describe your inquiry in detail..."
              rows={5}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 shadow-sm resize-none outline-none text-sm ${
                errors.message 
                  ? 'border-red-400 bg-red-50 focus:border-red-500' 
                  : 'border-gray-200 bg-gray-50 focus:border-[#0560f5] focus:bg-white focus:shadow-md'
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#0560f5] to-blue-600 text-white px-8 py-3.5 rounded-full hover:shadow-2xl transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {submitMessage && (
            <div
              className={`text-center text-sm py-2 px-4 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-50 text-green-600 border border-green-200' 
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}
            >
              {submitMessage}
            </div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
});

ContactFormPopup.displayName = 'ContactFormPopup';

// Loading Component
const LoadingState = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0560f5] mx-auto mb-4"></div>
      <p className="text-gray-600 text-lg">Loading product...</p>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';

// Star Rating Component
const StarRating = memo(({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          const isHalfStar = rating >= starValue - 0.5 && rating < starValue;
          const isFullStar = rating >= starValue;

          return (
            <span
              key={i}
              className={`text-xl ${
                isFullStar
                  ? "text-yellow-500"
                  : isHalfStar
                    ? "text-gray-300 relative"
                    : "text-gray-300"
              }`}
            >
              {isHalfStar ? (
                <span className="relative">
                  ★
                  <span
                    className="absolute top-0 left-0 overflow-hidden text-yellow-500"
                    style={{ width: '50%' }}
                  >
                    ★
                  </span>
                </span>
              ) : (
                "★"
              )}
            </span>
          );
        })}
      </div>
      <span className="ml-2 text-gray-600 font-medium">({rating})</span>
    </div>
  );
});

StarRating.displayName = 'StarRating';

// Product Header Component
const ProductHeader = memo(({ product }: { product: Product }) => (
  <motion.div 
    className="mb-8 sm:mb-12"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-2 mb-2">
      {product.subcategoryId && (
        <>
          <span className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            {product.subcategoryId.name}
          </span>
          <span className="text-gray-400">•</span>
        </>
      )}
      <motion.span
        className="text-xs bg-gradient-to-r from-[#0560f5] to-[#3b82f6] text-white px-3 py-1 rounded-full font-medium tracking-wide shadow-sm"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        NEW
      </motion.span>
    </div>
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
      {product.name}
    </h1>
    {product.shortDescription && (
      <p className="text-gray-600 text-lg max-w-2xl">{product.shortDescription}</p>
    )}
  </motion.div>
));

ProductHeader.displayName = 'ProductHeader';

// Image Navigation Component
const ImageNavigation = memo(({ 
  onPrev, 
  onNext 
}: { 
  onPrev: () => void;
  onNext: () => void;
}) => (
  <>
    <motion.button
      onClick={onPrev}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white rounded-full p-3 shadow-lg backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
    </motion.button>
    
    <motion.button
      onClick={onNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white rounded-full p-3 shadow-lg backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </motion.button>
  </>
));

ImageNavigation.displayName = 'ImageNavigation';

// Thumbnail Component
const Thumbnail = memo(({ 
  image, 
  index, 
  currentImageIndex, 
  onClick 
}: { 
  image: string;
  index: number;
  currentImageIndex: number;
  onClick: () => void;
}) => (
  <motion.div
    className={`thumbnail-item ${
      index === currentImageIndex 
        ? "ring-2 ring-[#0560f5]" 
        : "ring-1 ring-gray-200"
    } rounded-lg overflow-hidden cursor-pointer transition-all duration-300`}
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ 
      scale: 1.05, 
      y: -2,
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
    }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="relative w-full aspect-square">
      <img
        src={image}
        alt={`Product ${index + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  </motion.div>
));

Thumbnail.displayName = 'Thumbnail';

// Feature Card Component
const FeatureCard = memo(({ 
  feature, 
  index 
}: { 
  feature: string;
  index: number;
}) => (
  <motion.div
    className="feature-card bg-gradient-to-br from-white to-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm group cursor-pointer"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut"
    }}
    whileHover={{ 
      y: -4, 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderColor: "rgb(191, 219, 254)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }}
  >
    <motion.div 
      className="feature-number bg-gradient-to-r from-[#0560f5]/10 to-[#3b82f6]/10 text-[#0560f5] font-bold rounded-full w-6 h-6 flex items-center justify-center mb-2 border border-[#0560f5]/20"
      whileHover={{ 
        backgroundColor: "#0560f5",
        color: "white",
        borderColor: "#0560f5",
        transition: {
          duration: 0.2
        }
      }}
    >
      {index + 1}
    </motion.div>
    <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
      {feature}
    </p>
  </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

// Product Images Component
const ProductImages = memo(({ 
  product, 
  currentImageIndex, 
  onPrevImage, 
  onNextImage,
  onThumbnailClick 
}: { 
  product: Product;
  currentImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  onThumbnailClick: (index: number) => void;
}) => {
  const allImages = useMemo(() => {
    const images = product.images || [];
    if (product.mainImage && !images.includes(product.mainImage)) {
      return [product.mainImage, ...images];
    }
    return images;
  }, [product.mainImage, product.images]);

  return (
    <motion.div 
      className="product-images w-full lg:w-5/12"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="main-image-container mb-4 sm:mb-6 relative group overflow-hidden rounded-2xl shadow-md">
        {allImages.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="relative w-full h-64 md:h-80"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={allImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {allImages.length > 1 && (
              <ImageNavigation onPrev={onPrevImage} onNext={onNextImage} />
            )}
          </>
        ) : (
          <div className="w-full h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
            <Package className="h-32 w-32 text-gray-400" />
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {allImages.length > 1 && (
        <motion.div 
          className="thumbnails grid grid-cols-4 gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {allImages.map((image, index) => (
            <Thumbnail
              key={index}
              image={image}
              index={index}
              currentImageIndex={currentImageIndex}
              onClick={() => onThumbnailClick(index)}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
});

ProductImages.displayName = 'ProductImages';

// Product Features Component
const ProductFeatures = memo(({ 
  product,
  onContactClick
}: { 
  product: Product;
  onContactClick: () => void;
}) => {
  return (
    <motion.div
      className="product-features w-full lg:w-6/12 mt-8 lg:mt-0 lg:pl-8 flex flex-col"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-4 text-gray-900 flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span 
          className="bg-gradient-to-r from-[#0560f5] to-[#3b82f6] w-1 h-8 rounded-full mr-3"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        Product Features
      </motion.h2>

      {/* Stock Status and Rating */}
      <motion.div 
        className="flex items-center space-x-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StarRating rating={4.7} />
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            product.inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </motion.span>
      </motion.div>

      {/* Features List */}
      {product.features && product.features.length > 0 ? (
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
          {product.features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      ) : (
        <motion.div 
          className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 text-center">No features listed for this product.</p>
        </motion.div>
      )}

      {/* Contact Button */}
      <motion.div 
        className="mt-6 sm:mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.button
          onClick={onContactClick}
          className="sales-inquiry-btn group flex items-center justify-center w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-[#0560f5] to-[#3b82f6] text-white rounded-xl font-semibold tracking-wide"
          whileHover={{ 
            y: -4,
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(5, 96, 245, 0.3)",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 25
            }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ rotate: 12 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </motion.svg>
          Request Information
        </motion.button>
      </motion.div>
    </motion.div>
  );
});

ProductFeatures.displayName = 'ProductFeatures';

// Product Description Component
const ProductDescription = memo(({ product }: { product: Product }) => {
  if (!product.description) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="mt-12"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Product Description
      </h2>
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg mb-6">
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
});

ProductDescription.displayName = 'ProductDescription';

export const ProductDetail = memo(function ProductDetail({ product }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsMounted(true);
  }, [product.id]);

  // Memoized image navigation handlers
  const handlePrevImage = useCallback(() => {
    const allImages = product.images || [];
    const totalImages = product.mainImage && !allImages.includes(product.mainImage) 
      ? [product.mainImage, ...allImages].length 
      : allImages.length;
    
    if (totalImages > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? totalImages - 1 : prev - 1
      );
    }
  }, [product.mainImage, product.images]);

  const handleNextImage = useCallback(() => {
    const allImages = product.images || [];
    const totalImages = product.mainImage && !allImages.includes(product.mainImage) 
      ? [product.mainImage, ...allImages].length 
      : allImages.length;
    
    if (totalImages > 0) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % totalImages
      );
    }
  }, [product.mainImage, product.images]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const handleContactClick = useCallback(() => {
    setIsContactFormOpen(true);
  }, []);

  const handleCloseContactForm = useCallback(() => {
    setIsContactFormOpen(false);
  }, []);

  const allImages = useMemo(() => {
    const images = product.images || [];
    if (product.mainImage && !images.includes(product.mainImage)) {
      return [product.mainImage, ...images];
    }
    return images;
  }, [product.mainImage, product.images]);

  // Update current image when images array changes
  useEffect(() => {
    if (allImages.length > 0 && currentImageIndex >= allImages.length) {
      setCurrentImageIndex(0);
    }
  }, [allImages, currentImageIndex]);

  // Show loading state until component is properly mounted
  if (!isMounted) {
    return <LoadingState />;
  }

  return (
    <>
      <main className="container mx-auto px-4 py-2 sm:py-4">
        <div className="product-container max-w-6xl mx-auto">
          <ProductHeader product={product} />

          {/* Product Main Content */}
          <div className="product-content flex flex-col lg:flex-row gap-8 sm:gap-12">
            <ProductImages
              product={product}
              currentImageIndex={currentImageIndex}
              onPrevImage={handlePrevImage}
              onNextImage={handleNextImage}
              onThumbnailClick={handleThumbnailClick}
            />

            <ProductFeatures 
              product={product} 
              onContactClick={handleContactClick}
            />
          </div>

          <ProductDescription product={product} />
        </div>
      </main>

      {/* Contact Form Popup */}
      <AnimatePresence>
        <ContactFormPopup
          isOpen={isContactFormOpen}
          onClose={handleCloseContactForm}
          productName={product.name}
        />
      </AnimatePresence>
    </>
  );
});