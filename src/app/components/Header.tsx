'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, easeOut, easeIn } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiShield, FiEye, FiGlobe, FiAward, FiUsers, FiLayers, FiInfo,FiPackage, FiMail } from 'react-icons/fi'
import Uniview from "@/assets/images/banner/Uniview-uae.jpg"
import Trusted from "@/assets/images/banner/Trusted-world-wide.jpg"
import Business from "@/assets/images/banner/Business-security.jpg"
import Innovation from "@/assets/images/banner/Innovation-first.png"
import SmartCity from "@/assets/images/banner/Smart-city.jpg"
import UniviewMobile from "@/assets/images/banner/UniviewMobile.jpg"
import TrustedMobile from "@/assets/images/banner/TrustedMobile.jpg"
import BusinessMobile from "@/assets/images/banner/BusinessMobile.jpg"
import InnovationMobile from "@/assets/images/banner/InnovationMobile.jpg"
import SmartCityMobile from "@/assets/images/banner/SmartCityMobile.jpg"

import Image from 'next/image'

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Professional content slides that change every 5 seconds
  const contentSlides = [
    {
      title: "Uniview Cameras,",
      subtitle: "Secure Smarter.",
      description: "Advanced surveillance with AI analytics.",
      subtext: "Crisp imaging. Reliable protection.",
      linkText: "See cameras",
      linkHref: "/products",
      icon: FiShield,
      lapImage: Uniview,
      mobileImage: UniviewMobile
    },
    {
      title: "Business Security,",
      subtitle: "Unmatched Clarity.",
      description: "4K cameras for enterprises.",
      subtext: "Facial recognition. Perimeter safety.",
      linkText: "View products",
      linkHref: "/products",
      icon: FiEye,
      lapImage: Business,
      mobileImage: BusinessMobile
    },
    {
      title: "Innovation First,",
      subtitle: "Future-Ready Tech.",
      description: "Cutting-edge R&D.",
      subtext: "Next-gen surveillance.",
      linkText: "Our tech",
      linkHref: "/Aboutus",
      icon: FiAward,
      lapImage: Innovation,
      mobileImage: InnovationMobile
    },
     {
      title: "Smart City Vision,",
      subtitle: "Powered by Uniview.",
      description: "AI-driven urban security.",
      subtext: "Safer communities, seamless monitoring.",
      linkText: "Explore solutions",
      linkHref: "/Solutions",
      icon: FiGlobe,
      lapImage: SmartCity,
      mobileImage: SmartCityMobile
    },   {
      title: "Trusted Worldwide,",
      subtitle: "Proven Performance.",
      description: "Global deployments. Local trust.",
      subtext: "Governments. Retail. Industry.",
      linkText: "Our reach",
      linkHref: "/Contactus",
      icon: FiUsers,
      lapImage: Trusted,
      mobileImage: TrustedMobile
    }
  ];

  // Auto-slide content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contentSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [contentSlides.length])

  const slideVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      } as const // Explicitly cast to satisfy the type
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      } as const
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      } as const
    }
  }

  const imageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: easeIn
      }
    }
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* MAIN CONTAINER WITH RESPONSIVE HEIGHTS */}
      <div className="min-h-[50vh] sm:min-h-[50vh] md:min-h-[50vh] lg:min-h-[75vh] xl:min-h-[calc(100vh-90px)] relative">
        
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {/* Desktop Image */}
              <div className="hidden sm:block absolute inset-0 w-full h-full">
                <Image
                  src={contentSlides[currentSlide].lapImage}
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Mobile Image */}
              <div className="sm:hidden absolute inset-0 w-full h-full">
                <Image
                  src={contentSlides[currentSlide].mobileImage}
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </div>

        {/* Content Overlay - Keeping your original content alignment */}
        <div className="absolute inset-0 flex items-center justify-start z-10 lg:items-center md:items-center sm:items-end sm:pb-4">
          <div className="container mx-auto px-4 lg:px-12 md:px-6 sm:px-4">
            <div className="max-w-3xl w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-3 lg:space-y-4 md:space-y-3 sm:space-y-1.5"
                >
                  {/* Main Title */}
                  <motion.div variants={itemVariants}>
                    <h1 className="text-4xl md:text-3xl lg:text-5xl xl:text-6xl sm:text-3xl font-bold text-white leading-tight">
                      {contentSlides[currentSlide].title}
                      <br />
                      <span className="text-white">
                        {contentSlides[currentSlide].subtitle}
                      </span>
                    </h1>
                  </motion.div>

                  {/* Description */}
                  <motion.div variants={itemVariants} className="space-y-1.5 lg:space-y-2 md:space-y-1.5 sm:space-y-1 max-w-2xl">
                    <p className="text-xl lg:text-xl md:text-base sm:text-lg text-white/90 font-medium">
                      {contentSlides[currentSlide].description}
                    </p>
                    <p className="text-lg lg:text-lg md:text-sm sm:text-base text-white/75">
                      {contentSlides[currentSlide].subtext}
                    </p>
                  </motion.div>

                  {/* Call to Action Link */}
                  <motion.div variants={itemVariants} className="pt-1.5 lg:pt-2 md:pt-1.5 sm:pt-1">
                    <Link
                      href={contentSlides[currentSlide].linkHref}
                      className="group inline-flex items-center text-lg lg:text-lg md:text-base sm:text-lg text-[#3a7bd5] hover:text-[#3a7bd5] transition-colors duration-300 font-medium"
                    >
                      <FiArrowRight className="w-5 h-5 lg:w-4 lg:h-4 md:w-4 md:h-4 sm:w-5 sm:h-5 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      {contentSlides[currentSlide].linkText}
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Simple Navigation Dots - Left Side (All Devices) */}
        <div className="absolute bottom-6 left-4 z-20 lg:bottom-8 lg:left-12 md:bottom-6 md:left-6 sm:bottom-4 sm:left-4">
          <div className="flex space-x-1.5 lg:space-x-2 md:space-x-1.5 sm:space-x-1">
            {contentSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 lg:w-1.5 lg:h-1.5 md:w-1.5 md:h-1.5 sm:w-1 sm:h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Navigation Links - Desktop only */}
        <div className="absolute top-1/2 right-6 lg:right-12 transform -translate-y-16 z-20 hidden lg:block">
          <div className="space-y-3">
            <Link
              href="/products"
              className="block p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              title="Products"
            >
              <FiPackage className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="/Solutions"
              className="block p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              title="Solutions"
            >
              <FiLayers className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="/Aboutus"
              className="block p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              title="About Us"
            >
              <FiInfo className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="/Contactus"
              className="block p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              title="Contact"
            >
              <FiMail className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Header