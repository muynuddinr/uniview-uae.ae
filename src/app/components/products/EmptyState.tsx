// src/components/products/EmptyState.tsx
'use client';

import React, { memo } from 'react';
import { Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const AnimatedIcon = memo(({ icon }: { icon?: React.ReactNode }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1, rotate: 360 }}
    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    className="inline-block mb-6"
  >
    {icon || (
      <div className="w-24 h-24 bg-gradient-to-br from-[#0560f5] to-[#3b82f6] rounded-full flex items-center justify-center shadow-lg">
        <Package className="h-12 w-12 text-white" />
      </div>
    )}
  </motion.div>
));

AnimatedIcon.displayName = 'AnimatedIcon';

export const EmptyState = memo(function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-16"
    >
      <AnimatedIcon icon={icon} />
      
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 text-lg max-w-md mx-auto"
      >
        {message}
      </motion.p>
    </motion.div>
  );
});