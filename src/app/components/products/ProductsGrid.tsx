// src/components/products/ProductsGrid.tsx
"use client";

import React, { useEffect, useRef, useState, memo, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface Product {
  _id?: string;
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  price: number;
  mainImage?: string;
  inStock: boolean;
  data?: {
    title: string;
    imgCard: { src: string };
    imgAlt: string;
    date: string;
  };
}

interface ProductsGridProps {
  products: Product[];
  baseHref: string;
}

// Constants
const PRODUCTS_PER_PAGE = 8;

// Fixed rating - 4.7 but don't show the text
const getRating = () => 4.7;

// Check if product is new
const isNewProduct = (date: string) => {
  return new Date(date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
};

// Optimized Pagination Component
const Pagination = memo(({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = useMemo(() => {
    if (totalPages <= 1) return [];
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  if (totalPages <= 1) return null;

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <motion.div 
      className="flex justify-center items-center space-x-2 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Previous Button - Mobile: icon only, Desktop: text+icon */}
      <motion.button
        onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={`flex items-center px-3 py-2 rounded-lg border font-medium transition-all duration-300 text-sm ${
          !canGoPrevious
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-[#0560f5] text-[#0560f5] hover:bg-[#0560f5] hover:text-white shadow-sm hover:shadow-md'
        }`}
        whileHover={canGoPrevious ? { scale: 1.05, y: -1 } : {}}
        whileTap={canGoPrevious ? { scale: 0.95 } : {}}
      >
        <ChevronLeft className="w-4 h-4 mr-1 hidden md:block" />
        <ChevronLeft className="w-4 h-4 md:hidden" />
        <span className="hidden md:inline">Previous</span>
      </motion.button>

      {/* Desktop: Show all page numbers */}
      <div className="hidden md:flex space-x-1">
        {pages.map((page) => (
          <motion.button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-lg border font-medium transition-all duration-300 text-sm ${
              currentPage === page
                ? 'bg-[#0560f5] border-[#0560f5] text-white shadow-md'
                : 'bg-white border-gray-200 text-gray-700 hover:border-[#0560f5] hover:text-[#0560f5] shadow-sm hover:shadow-md'
            }`}
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.9 }}
          >
            {page}
          </motion.button>
        ))}
      </div>

      {/* Mobile Page Indicator - REMOVED "Page X of Y" text */}
      <div className="flex md:hidden items-center space-x-2">
        {/* Quick navigation for mobile */}
        {totalPages > 1 && (
          <div className="flex space-x-1">
            {currentPage > 2 && totalPages > 3 && (
              <motion.button
                onClick={() => onPageChange(1)}
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium text-sm shadow-sm hover:border-[#0560f5] hover:text-[#0560f5]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                1
              </motion.button>
            )}
            {currentPage > 3 && totalPages > 4 && (
              <span className="flex items-center text-gray-400">...</span>
            )}
            {currentPage > 1 && (
              <motion.button
                onClick={() => onPageChange(currentPage - 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium text-sm shadow-sm hover:border-[#0560f5] hover:text-[#0560f5]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentPage - 1}
              </motion.button>
            )}
            <motion.button
              onClick={() => {}}
              className="w-8 h-8 rounded-lg border border-[#0560f5] bg-[#0560f5] text-white font-medium text-sm shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {currentPage}
            </motion.button>
            {currentPage < totalPages && (
              <motion.button
                onClick={() => onPageChange(currentPage + 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium text-sm shadow-sm hover:border-[#0560f5] hover:text-[#0560f5]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentPage + 1}
              </motion.button>
            )}
            {currentPage < totalPages - 2 && totalPages > 4 && (
              <span className="flex items-center text-gray-400">...</span>
            )}
            {currentPage < totalPages - 1 && totalPages > 2 && (
              <motion.button
                onClick={() => onPageChange(totalPages)}
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium text-sm shadow-sm hover:border-[#0560f5] hover:text-[#0560f5]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {totalPages}
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Next Button - Mobile: icon only, Desktop: text+icon */}
      <motion.button
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`flex items-center px-3 py-2 rounded-lg border font-medium transition-all duration-300 text-sm ${
          !canGoNext
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-[#0560f5] text-[#0560f5] hover:bg-[#0560f5] hover:text-white shadow-sm hover:shadow-md'
        }`}
        whileHover={canGoNext ? { scale: 1.05, y: -1 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
      >
        <span className="hidden md:inline">Next</span>
        <ChevronRight className="w-4 h-4 ml-1 hidden md:block" />
        <ChevronRight className="w-4 h-4 md:hidden" />
      </motion.button>
    </motion.div>
  );
});

Pagination.displayName = 'Pagination';

// Search Component
const SearchComponent = memo(({ value, onChange }: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <motion.div 
    className="mb-10 max-w-2xl mx-auto"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <div className="relative">
      <motion.input
        id="searchInput"
        type="text"
        placeholder="Search for products..."
        value={value}
        onChange={onChange}
        className="w-full py-4 px-6 pr-16 rounded-full bg-white border-2 shadow-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-500"
        style={{ 
          borderColor: "#0560f5",
          ['--tw-ring-color' as any]: "#0560f5"
        }}
        whileFocus={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(5, 96, 245, 0.2), 0 10px 10px -5px rgba(5, 96, 245, 0.1)"
        }}
        transition={{ duration: 0.4 }}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <motion.button 
          id="searchButton"
          className="text-white p-3 rounded-full bg-gradient-to-r from-[#0560f5] to-[#3b82f6]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "center" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.button>
      </div>
    </div>
  </motion.div>
));

SearchComponent.displayName = 'SearchComponent';

// Star Rating Component for Products Grid
const ProductStarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      const isHalfStar = rating >= starValue - 0.5 && rating < starValue;
      const isFullStar = rating >= starValue;

      return (
        <motion.span
          key={i}
          className={`text-2xl ${
            isFullStar
              ? "text-yellow-500"
              : isHalfStar
                ? "text-gray-300 relative"
                : "text-gray-300"
          }`}
          whileHover={{ scale: 1.3, rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          {isHalfStar ? (
            <span className="relative">
              ★
              <span
                className="absolute top-0 left-0 overflow-hidden text-yellow-500"
                style={{ width: "50%" }}
              >
                ★
              </span>
            </span>
          ) : (
            "★"
          )}
        </motion.span>
      );
    })}
  </div>
));

ProductStarRating.displayName = 'ProductStarRating';

// Product Card Component with individual in-view detection
const ProductCard = memo(({ 
  product, 
  baseHref, 
  index 
}: { 
  product: Product; 
  baseHref: string; 
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: "0px 0px -50px 0px",
  });

  const rating = getRating();
  const productDate = product.data?.date || new Date().toISOString();
  const isNew = isNewProduct(productDate);
  const productKey = product.id ?? product._id ?? product.slug ?? index;

  return (
    <motion.div 
      ref={cardRef}
      key={productKey}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ 
        duration: 0.7, 
        ease: "easeOut", 
        delay: index * 0.1 
      }}
      data-title={product.name.toLowerCase().replace(/[-\s()\/]/g, '')}
      className="group relative"
    >
      <motion.div 
        className="product-card bg-white rounded-xl overflow-hidden shadow-xl border-2 border-gray-100 h-full"
        whileHover={{ 
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(5, 96, 245, 0.3)",
          borderColor: "#0560f5"
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="h-48 bg-white flex items-center justify-center p-4 relative">
            {product.mainImage || product.data?.imgCard?.src ? (
              <img
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                src={product.mainImage || product.data?.imgCard?.src}
                alt={product.data?.imgAlt || product.name}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
            )}

            {/* Show NEW badge only for recent products */}
            {isNew && (
              <motion.div 
                className="absolute top-3 right-3 bg-gradient-to-r from-[#0560f5] to-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15,
                  delay: 0.2 + index * 0.1
                }}
              >
                NEW
              </motion.div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="px-6 py-4">
          <motion.h3
            className="product-title font-bold text-xl mb-2 text-gray-800 group-hover:text-[#0560f5] transition-colors duration-500 line-clamp-2"
            whileHover={{ color: "#0560f5" }}
            transition={{ duration: 0.4 }}
          >
            {product.name}
          </motion.h3>
          
          {/* Display Rating with Half-Star Support - Only stars, no text */}
          <div className="flex items-center mb-4">
            <ProductStarRating rating={rating} />
          </div>
          
          {/* View Details Button */}
          <div className="flex items-center justify-end border-t border-gray-100 pt-4">
            <motion.div
              className="relative overflow-hidden bg-gradient-to-r from-[#0560f5] to-[#3b82f6] text-white font-semibold rounded-lg px-6 py-2.5 flex items-center justify-center cursor-pointer shadow-md w-full group/btn"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 8px 20px -4px rgba(5, 96, 245, 0.5)"
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-[#0560f5]/50 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              View Details
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>
        
        {/* Invisible Link Overlay */}
        <Link
          href={`${baseHref}/${product.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${product.name}`}
        ></Link>
      </motion.div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

// No Results Component
const NoResults = memo(({ searchTerm }: { searchTerm: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-center py-16"
  >
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-10 max-w-md mx-auto shadow-xl">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 12,
          delay: 0.3
        }}
        className="w-20 h-20 bg-gradient-to-br from-[#0560f5] to-[#3b82f6] rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Package className="h-10 w-10 text-white" />
      </motion.div>
      <motion.h3 
        className="text-2xl font-bold text-gray-900 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        No products found
      </motion.h3>
      <motion.p 
        className="text-gray-600 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        No products match "<span className="text-[#0560f5] font-semibold">{searchTerm}</span>"
      </motion.p>
    </div>
  </motion.div>
));

NoResults.displayName = 'NoResults';

// Products Count Component
const ProductsCount = memo(({ 
  currentCount, 
  totalCount, 
  currentPage, 
  totalPages 
}: { 
  currentCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}) => (
  <motion.div 
    className="text-center mb-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-gray-600 text-sm">
      Showing {currentCount} of {totalCount} products 
      {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
    </p>
  </motion.div>
));

ProductsCount.displayName = 'ProductsCount';

export const ProductsGrid = memo(function ProductsGrid({ products, baseHref }: ProductsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Optimized filtered products calculation
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/[-\s()\/]/g, "");
    
    return products.filter(product => {
      const normalizedTitle = product.name.toLowerCase().replace(/[-\s()\/]/g, "");
      return normalizedTitle.includes(normalizedSearchTerm);
    });
  }, [products, searchTerm]);

  // Optimized pagination calculation
  const { currentProducts, totalPages, totalProducts } = useMemo(() => {
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts);
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      currentProducts,
      totalPages,
      totalProducts,
      currentCount: currentProducts.length
    };
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Optimized handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div ref={containerRef}>
      {/* Search Bar */}
      <SearchComponent 
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Products Count */}
      <ProductsCount 
        currentCount={currentProducts.length}
        totalCount={totalProducts}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentProducts.map((product, index) => (
          <ProductCard
            key={product.id ?? product._id ?? product.slug ?? index}
            product={product}
            baseHref={baseHref}
            index={index}
          />
        ))}
      </div>

      {/* No Results State */}
      {currentProducts.length === 0 && searchTerm && (
        <NoResults searchTerm={searchTerm} />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
});