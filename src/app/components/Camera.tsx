'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ArrowUpRight, Sparkles, Shield, Zap } from 'lucide-react';
import Building from '@/assets/images/remain/Building.jpg';
import BuildingMobile from '@/assets/images/remain/Buildingmobile.jpg';
import School from '@/assets/images/remain/School.jpg';
import SchoolMobile from '@/assets/images/remain/Schoolmobile.jpg';
import Warehouse from '@/assets/images/remain/Warehouse.jpg';
import WarehouseMobile from '@/assets/images/remain/Warehousemobile.jpg';
import Retail from '@/assets/images/remain/Retail.jpg';
import RetailMobile from '@/assets/images/remain/Retailmobile.jpg';
import Shopping from '@/assets/images/remain/Shopping.jpg';
import ShoppingMobile from '@/assets/images/remain/Shoppingmobile.jpg';
import Stadium from '@/assets/images/remain/Stadium.jpg';
import StadiumMobile from '@/assets/images/remain/Stadiummobile.jpg';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  mobileImageUrl: string;
  href: string;
  index: number;
  shouldAnimate: boolean;
}

interface ProductGridProps {
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ className = '' }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });
  const headerInView = useInView(headerRef, { 
    once: true, 
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optimized card shuffle animation - faster and smoother
  const cardShuffle: Variants = {
    hidden: {
      opacity: 0,
      rotateY: -30,
      x: -60,
      scale: 0.9
    },
    visible: (index: number) => ({
      opacity: 1,
      rotateY: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.34, 1.26, 0.64, 1],
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    })
  };

  // Faster stagger container
  const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const products: Omit<ProductCardProps, 'index' | 'shouldAnimate'>[] = [
    {
      title: "Building",
      subtitle: "Comprehensive Security for Modern Buildings",
      description: "Advanced surveillance and access control systems",
      imageUrl: Building.src,
      mobileImageUrl: BuildingMobile.src,
      href: "/Solutions/Building-solutions"
    },
    {
      title: "School",
      subtitle: "Safe Learning Environments",
      description: "Campus security and student protection solutions",
      imageUrl: School.src,
      mobileImageUrl: SchoolMobile.src,
      href: "/Solutions/School-solutions"
    },
    {
      title: "Warehouse & Logistics",
      subtitle: "Secure Your Supply Chain",
      description: "Inventory protection and facility monitoring",
      imageUrl: Warehouse.src,
      mobileImageUrl: WarehouseMobile.src,
      href: "/Solutions/Warehouse-solutions"
    },
    {
      title: "Retail",
      subtitle: "Retail Security Solutions",
      description: "Theft prevention and customer safety",
      imageUrl: Retail.src,
      mobileImageUrl: RetailMobile.src,
      href: "/Solutions/Retail-solutions"
    },
    {
      title: "Shopping Mall",
      subtitle: "Large Scale Public Security",
      description: "Multi-level surveillance and crowd management",
      imageUrl: Shopping.src,
      mobileImageUrl: ShoppingMobile.src,
      href: "/Solutions/Shopping-mall-solutions"
    },
    {
      title: "Stadium",
      subtitle: "Event and Venue Security",
      description: "High-capacity crowd monitoring systems",
      imageUrl: Stadium.src,
      mobileImageUrl: StadiumMobile.src,
      href: "/Solutions/Stadium-solutions"
    }
  ];

  const ProductCard: React.FC<ProductCardProps> = ({ 
    title, 
    subtitle, 
    description, 
    imageUrl, 
    mobileImageUrl,
    href,
    index,
    shouldAnimate
  }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const cardIsInView = useInView(cardRef, { 
      once: true, 
      amount: 0.08,
      margin: "0px 0px -150px 0px"
    });

    return (
      <motion.div
        ref={cardRef}
        className="group cursor-pointer h-full"
        custom={index}
        variants={cardShuffle}
        initial="hidden"
        animate={cardIsInView ? "visible" : "hidden"}
        whileHover={{ 
          y: -8,
          scale: 1.02,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
      >
        <div className="relative h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg group-hover:shadow-2xl transition-all duration-400">
          {/* Animated Background Image */}
          <motion.div 
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Desktop Image */}
            <div className="hidden md:block w-full h-full relative">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-500"
                priority
              />
            </div>
            
            {/* Mobile Image */}
            <div className="md:hidden w-full h-full relative">
              <Image
                src={mobileImageUrl}
                alt={title}
                fill
                className="object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-500"
                priority
              />
            </div>
          </motion.div>
          
          {/* Lighter gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Subtle blue accent overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.15 }}
            transition={{ duration: 0.4 }}
            style={{ 
              background: 'radial-gradient(circle at 30% 20%, rgba(5, 96, 245, 0.3) 0%, transparent 70%)' 
            }}
          />

          {/* Floating particles effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-800">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#0560f5]"
                style={{ 
                  left: `${20 + i * 15}%`,
                  bottom: '20%'
                }}
                animate={{
                  y: [-15, -60],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0]
                }}
                transition={{
                  duration: 1.8 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
          
          {/* Content Container */}
          <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
            {/* Top Section */}
            <div className="space-y-3">
              {/* Icon Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/20 w-fit bg-[#0560f5]/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={cardIsInView ? { 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: index * 0.12 + 0.1, duration: 0.3 }
                } : {}}
              >
                <Shield size={14} className="text-[#0560f5]" />
                <span className="text-white text-xs font-semibold">Industry</span>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-3xl font-bold text-white tracking-tight"
                style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={cardIsInView ? { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.12 + 0.15, duration: 0.3 }
                } : {}}
              >
                {title}
              </motion.h3>

              {/* Animated Divider */}
              <motion.div className="relative h-1 w-16 overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#0560f5]"
                  initial={{ x: '-100%' }}
                  animate={cardIsInView ? { 
                    x: 0,
                    transition: { delay: index * 0.12 + 0.2, duration: 0.4 }
                  } : {}}
                />
              </motion.div>
            </div>

            {/* Middle Section - Always visible on mobile, enhanced on hover */}
            <motion.div 
              className="space-y-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-400"
            >
              <h4 className="text-sm font-semibold text-white/90 leading-relaxed">
                {subtitle}
              </h4>
              <p className="text-xs text-white/75 leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={cardIsInView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.12 + 0.25, duration: 0.3 }
              } : {}}
            >
              <motion.a
                href={href}
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden group/btn"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                whileHover={{ 
                  scale: 1.03
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0560f5] to-[#3b82f6] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-250"
                />
                
                <span className="relative z-10 text-white flex items-center gap-2">
                  Explore Solutions
                  <motion.div
                    className="group-hover/btn:rotate-45 group-hover/btn:scale-115 transition-transform duration-250"
                  >
                    <ArrowUpRight size={16} />
                  </motion.div>
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Glowing border on hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-400"
            style={{ 
              boxShadow: 'inset 0 0 0 2px rgba(5, 96, 245, 0.8), 0 0 20px rgba(5, 96, 245, 0.2)',
            }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      ref={containerRef}
      className={`w-full relative overflow-hidden bg-[#f9fafb] ${className}`}
      style={{ perspective: '1500px' }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6"
          initial={{ opacity: 0 }}
          animate={headerInView ? { 
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          } : {}}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-[#0560f5]/10 to-[#3b82f6]/10 border border-[#0560f5]/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={headerInView ? { 
              opacity: 1, 
              scale: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }
            } : {}}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={14} className="text-[#0560f5]" />
            </motion.div>
            <span className="text-[#0560f5] text-xs md:text-sm font-semibold tracking-wide">
              INDUSTRY SOLUTIONS
            </span>
            <motion.div 
              className="w-1.5 h-1.5 bg-[#0560f5] rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Main Heading */}
          <motion.div className="space-y-2 md:space-y-3 overflow-hidden">
            <motion.h3 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight md:leading-tight"
              initial={{ opacity: 0, y: 25 }}
              animate={headerInView ? { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }
              } : {}}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.25,
                    ease: "easeOut"
                  }
                } : {}}
              >
                Tailored solutions for
              </motion.span>
              <br />
              <motion.span 
                className="inline-block bg-gradient-to-r from-[#0560f5] via-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent relative"
                initial={{ opacity: 0, x: 20 }}
                animate={headerInView ? { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.35,
                    ease: "easeOut"
                  }
                } : {}}
              >
                your business needs
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#0560f5] to-[#3b82f6] rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={headerInView ? { 
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.7,
                      delay: 0.45,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  } : {}}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.span>
            </motion.h3>
          </motion.div>
          
          {/* Description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }
            } : {}}
          >
            Comprehensive security solutions designed specifically for different industries and business requirements
          </motion.p>

          {/* Feature badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-6"
            initial={{ opacity: 0 }}
            animate={headerInView ? { 
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.5,
                ease: "easeOut"
              }
            } : {}}
          >
            {['Custom Solutions', '24/7 Support', 'Scalable Systems'].map((feature, i) => (
              <motion.div
                key={feature}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-xs md:text-sm shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={headerInView ? { 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: 0.55 + i * 0.08,
                    ease: [0.25, 0.1, 0.25, 1]
                  }
                } : {}}
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: 'rgba(5, 96, 245, 0.4)',
                  backgroundColor: 'rgba(5, 96, 245, 0.02)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Product Grid - Using optimized cardShuffle animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product, index) => (
            <ProductCard 
              key={index} 
              {...product} 
              index={index} 
              shouldAnimate={true}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductGrid;