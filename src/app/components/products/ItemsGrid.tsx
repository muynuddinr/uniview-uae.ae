// src/components/products/ItemsGrid.tsx
'use client';

import React, { memo, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface GridItem {
  _id?: string;
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  subcategories?: any[];
  itemCount?: number;
}

interface ItemsGridProps {
  items: GridItem[];
  baseHref: string;
  type: 'categories' | 'subcategories';
  showCount?: boolean;
}

const ItemCard = memo(({ 
  item, 
  baseHref, 
  type, 
  showCount,
  index 
}: { 
  item: GridItem; 
  baseHref: string; 
  type: 'categories' | 'subcategories';
  showCount: boolean;
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: "0px 0px -50px 0px", // Same as SolutionsPage for better first element detection
  });

  const itemKey = useMemo(() => 
    item._id ?? item.id ?? item.slug ?? index, 
    [item._id, item.id, item.slug, index]
  );

  const countBadge = useMemo(() => {
    if (!showCount) return null;

    if (type === 'categories' && item.subcategories && item.subcategories.length > 0) {
      return (
        <div className="text-center mb-3">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#0560f5]/10 to-[#3b82f6]/10 text-[#0560f5] text-xs font-medium border border-[#0560f5]/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {item.subcategories.length} subcategories
          </motion.span>
        </div>
      );
    }

    if (type === 'subcategories' && item.itemCount && item.itemCount > 0) {
      return (
        <div className="text-center mb-3">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#0560f5]/10 to-[#3b82f6]/10 text-[#0560f5] text-xs font-medium border border-[#0560f5]/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {item.itemCount} products
          </motion.span>
        </div>
      );
    }

    return null;
  }, [showCount, type, item.subcategories, item.itemCount]);

  return (
    <motion.div 
      ref={cardRef}
      key={itemKey}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(5, 96, 245, 0.3)",
        borderColor: "#0560f5"
      }}
      className="bg-white rounded-xl overflow-hidden shadow-xl border-2 border-gray-100 h-full group relative cursor-pointer flex flex-col"
    >
      <Link 
        href={`${baseHref}/${item.slug}`}
        className="absolute inset-0 z-10" 
        aria-label={`View ${item.name}`} 
      />
      
      {/* Image Container */}
      <div className="h-48 bg-white flex items-center justify-center p-4 relative">
        {item.image ? (
          <motion.div className="w-full h-full">
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={160}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              priority={index < 4}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-lg bg-gradient-to-br from-[#0560f5]/10 to-[#3b82f6]/10">
            <Package className="h-12 w-12 text-[#0560f5]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-4 relative flex flex-col flex-grow">
        <div className="flex-grow">
          <motion.h2 
            className="font-bold text-xl mb-3 text-gray-800 group-hover:text-[#0560f5] transition-colors duration-500 line-clamp-2 text-center"
            whileHover={{ color: "#0560f5" }}
            transition={{ duration: 0.4 }}
          >
            {item.name}
          </motion.h2>
          
          {countBadge}
        </div>

        {/* Enhanced Button Container */}
        <div className="mt-auto pt-4">
          <motion.div
            className="relative overflow-hidden bg-gradient-to-r from-[#0560f5] to-[#3b82f6] text-white font-semibold rounded-lg px-5 py-2.5 flex items-center justify-center cursor-pointer shadow-md group/btn"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 20px -4px rgba(5, 96, 245, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            
            <span className="relative z-10 flex items-center gap-2 text-sm">
              <span>View Products</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
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
            </span>
            
            {/* Pulsing glow effect */}
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

ItemCard.displayName = 'ItemCard';

export const ItemsGrid = memo(function ItemsGrid({ 
  items, 
  baseHref, 
  type, 
  showCount = true 
}: ItemsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <ItemCard
          key={item._id ?? item.id ?? item.slug ?? index}
          item={item}
          baseHref={baseHref}
          type={type}
          showCount={showCount}
          index={index}
        />
      ))}
    </div>
  );
});