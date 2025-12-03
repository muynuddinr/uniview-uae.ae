'use client';

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import category from '@/assets/images/banner/Category.jpg';
import subcategory from '@/assets/images/banner/Subcategory.jpg';
import products from '@/assets/images/banner/Products.jpg';
import categorymobile from '@/assets/images/banner/CategoryMobile.jpg';
import subcategorymobile from '@/assets/images/banner/SubcategoryMobile.jpg';
import productsmobile from '@/assets/images/banner/ProductMobile.jpg';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationHeaderProps {
  title: string;
  description?: string;
  backHref: string;
  backLabel?: string;
  breadcrumbItems: BreadcrumbItem[];
  productCount?: number;
  type?: 'categories' | 'subcategories' | 'products';
  showHero?: boolean;
  hideBreadcrumbOnMobile?: boolean; // New prop to hide breadcrumb on mobile
}

// Constants
const ANIMATION_DURATION = {
  SHORT: 0.3,
  MEDIUM: 0.5,
  LONG: 0.8,
};

// Memoized Decorative Elements Component
const DecorativeElements = memo(() => (
  <>
    <motion.div 
      className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-white opacity-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ duration: ANIMATION_DURATION.MEDIUM, delay: 0.2 }}
    />
    <motion.div 
      className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-white opacity-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ duration: ANIMATION_DURATION.MEDIUM, delay: 0.4 }}
    />
  </>
));

DecorativeElements.displayName = 'DecorativeElements';

// Header Title Component
const HeaderTitle = memo(({ title }: { title: string }) => {
  const words = title.split(' ');
  
  if (words.length > 1) {
    return (
      <>
        {words.slice(0, -1).join(' ')}{' '}
        <span className="relative inline-block">
          <span className="relative z-10">{words.slice(-1)}</span>
          <motion.span 
            className="absolute bottom-0 left-0 w-full h-3 bg-cyan-400 opacity-70 rounded"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: ANIMATION_DURATION.LONG, delay: 0.5 }}
          />
          <motion.span 
            className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 opacity-30 blur-sm"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: ANIMATION_DURATION.LONG, delay: 0.6 }}
          />
        </span>
      </>
    );
  }

  return (
    <span className="relative inline-block">
      <span className="relative z-10">{title}</span>
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-3 bg-cyan-400 opacity-70 rounded"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: ANIMATION_DURATION.LONG, delay: 0.5 }}
      />
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 opacity-30 blur-sm"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: ANIMATION_DURATION.LONG, delay: 0.6 }}
      />
    </span>
  );
});

HeaderTitle.displayName = 'HeaderTitle';

// Header Section Component
const HeaderSection = memo(({ 
  title, 
  productCount,
  type 
}: { 
  title: string; 
  productCount?: number;
  type?: 'categories' | 'subcategories' | 'products';
}) => {
  const countText = useMemo(() => {
    if (productCount === undefined) return null;
    
    switch (type) {
      case 'categories':
        return `${productCount} Categories Available`;
      case 'subcategories':
        return `${productCount} SubCategories Available`;
      case 'products':
        return `${productCount} Products Available`;
      default:
        return `${productCount} Items Available`;
    }
  }, [productCount, type]);

  // Select banner image based on type and screen size
  const bannerImages = useMemo(() => {
    switch (type) {
      case 'categories':
        return {
          desktop: category,
          mobile: categorymobile
        };
      case 'subcategories':
        return {
          desktop: subcategory,
          mobile: subcategorymobile
        };
      case 'products':
        return {
          desktop: products,
          mobile: productsmobile
        };
      default:
        return {
          desktop: category,
          mobile: categorymobile
        };
    }
  }, [type]);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image for Desktop */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src={bannerImages.desktop}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/80 to-blue-800/80" />
      </div>

      {/* Background Image for Mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src={bannerImages.mobile}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/80 to-blue-800/80" />
      </div>

      <DecorativeElements />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.LONG, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            <HeaderTitle title={title} />
          </h1>
          
          {/* Count Badge */}
          {countText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">{countText}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,146.86,136.44,221.91,119.3,302.86,101.1,272,68,321.39,56.44Z"
            fill="#ffffff"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
});

HeaderSection.displayName = 'HeaderSection';

// Breadcrumb Component
const Breadcrumb = memo(({ 
  breadcrumbItems,
  hideOnMobile = false 
}: { 
  breadcrumbItems: BreadcrumbItem[];
  hideOnMobile?: boolean;
}) => (
  <motion.nav
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    className={`flex items-center space-x-2 text-sm text-gray-500 ${hideOnMobile ? 'hidden md:flex' : ''}`}
  >
    {breadcrumbItems.map((item, index) => (
      <React.Fragment key={`breadcrumb-${index}`}>
        {item.href ? (
          <Link
            href={item.href}
            className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
          >
            {index === 0 && item.label === 'Home' && <Home className="h-4 w-4" />}
            {item.label}
          </Link>
        ) : (
          <span className="text-gray-900 font-medium flex items-center gap-1">
            {index === 0 && item.label === 'Home' && <Home className="h-4 w-4" />}
            {item.label}
          </span>
        )}
        {index < breadcrumbItems.length - 1 && (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
      </React.Fragment>
    ))}
  </motion.nav>
));

Breadcrumb.displayName = 'Breadcrumb';

// Back Button Component
const BackButton = memo(({ backHref, backLabel }: { backHref: string; backLabel: string }) => (
  <Link href={backHref}>
    <motion.div whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }}>
      <button
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {backLabel}
      </button>
    </motion.div>
  </Link>
));

BackButton.displayName = 'BackButton';

// Simple Navigation Component (without hero section)
const SimpleNavigation = memo(({
  backHref,
  backLabel,
  breadcrumbItems,
  hideBreadcrumbOnMobile = false
}: {
  backHref: string;
  backLabel: string;
  breadcrumbItems: BreadcrumbItem[];
  hideBreadcrumbOnMobile?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white py-6"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Desktop Layout - side by side */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex-shrink-0">
          <BackButton backHref={backHref} backLabel={backLabel} />
        </div>
        <Breadcrumb 
          breadcrumbItems={breadcrumbItems} 
          hideOnMobile={hideBreadcrumbOnMobile}
        />
      </div>

      {/* Mobile Layout - stacked */}
      <div className="flex flex-col space-y-4 md:hidden">
        {!hideBreadcrumbOnMobile && (
          <Breadcrumb 
            breadcrumbItems={breadcrumbItems} 
            hideOnMobile={hideBreadcrumbOnMobile}
          />
        )}
        <div className="flex justify-center">
          <BackButton backHref={backHref} backLabel={backLabel} />
        </div>
      </div>
    </div>
  </motion.div>
));

SimpleNavigation.displayName = 'SimpleNavigation';

export const NavigationHeader = memo(function NavigationHeader({ 
  title, 
  description, 
  backHref, 
  backLabel = 'Back',
  breadcrumbItems,
  productCount,
  type,
  showHero = true,
  hideBreadcrumbOnMobile = false // Default to false for backward compatibility
}: NavigationHeaderProps) {
  // If showHero is false, render only the simple navigation
  if (!showHero) {
    return (
      <div className="mb-2">
        <SimpleNavigation
          backHref={backHref}
          backLabel={backLabel}
          breadcrumbItems={breadcrumbItems}
          hideBreadcrumbOnMobile={hideBreadcrumbOnMobile}
        />
      </div>
    );
  }

  // Original behavior with hero section
  return (
    <div className="mb-8">
      <HeaderSection title={title} productCount={productCount} type={type} />

      {/* Combined Back Button and Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-5 mt-8"
      >
        {/* Desktop Layout - side by side */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex-shrink-0">
            <BackButton backHref={backHref} backLabel={backLabel} />
          </div>
          <Breadcrumb 
            breadcrumbItems={breadcrumbItems} 
            hideOnMobile={hideBreadcrumbOnMobile}
          />
        </div>

        {/* Mobile Layout - stacked */}
        <div className="flex flex-col space-y-4 md:hidden">
          {!hideBreadcrumbOnMobile && (
            <Breadcrumb 
              breadcrumbItems={breadcrumbItems} 
              hideOnMobile={hideBreadcrumbOnMobile}
            />
          )}
          <div className="flex justify-center">
            <BackButton backHref={backHref} backLabel={backLabel} />
          </div>
        </div>
      </motion.div>
    </div>
  );
});