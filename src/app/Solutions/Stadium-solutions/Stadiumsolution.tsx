'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import stadiumBanner from '@/assets/Solution/banner/Stadiumbanner.jpg';
import image1 from "@/assets/Solution/solutionsinner/Stadium-1.jpg";
import image2 from "@/assets/Solution/solutionsinner/Stadium-2.jpg";
import image3 from "@/assets/Solution/solutionsinner/Stadium-3.jpg";
import mobileBanner from "@/assets/Solution/banner/StadiumMobile.jpg"

const StadiumSolutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stadium-solution');
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  
  // Refs for each section to track when they're in view
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hero Animation Variants
  const heroVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
        delay: 0.2
      }
    }
  };

  const subtitleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.6
      }
    }
  };

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2,
        ease: "easeOut" 
      }
    }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.0,
        ease: "easeOut" 
      }
    }
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 1.4,
        ease: "easeOut" 
      }
    }
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 1.4,
        ease: "easeOut" 
      }
    }
  };

  const solutionFeatures = [
    {
      title: "Robust Perimeter Protection with UNV's Tri-guard Technology",
      description: "Achieve robust perimeter protection for your stadium with UNV's Tri-guard technology. Our deep-learning algorithms swiftly detect intruders and issue light and sound warnings, ensuring a rapid response to security threats. This advanced solution reduces the need for extensive manpower, saving costs while effectively safeguarding your premises.",
      image: image1
    },
    {
      title: "Optimize Stadium Security with MultiView and OmniView Cameras",
      description: "Embrace comprehensive coverage for large sports venues with UNV's MultiView and OmniView cameras. MultiView provides multi-directional monitoring by seamlessly combining panoramic views with detailed shots, while OmniView offers a wider field of view from a single installation to eliminate blind spots. Optimize security and cost-effectiveness across your stadium with these advanced surveillance solutions.",
      image: image2
    },
    {
      title: "Smooth Stadium Traffic Flow: Advanced Access Control & Parking Solutions",
      description: "Ensure a seamless experience for fans and staff with advanced stadium access control and parking management. Our solutions support multiple authentication methods for quick entry and use ANPR technology for smooth vehicle flow. Effective parking guidance and 24/7 monitoring maintain order and security, even during peak hours.",
      image: image3
    }
  ];

  const scrollToSection = (section: string) => {
    setActiveTab(section);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[45vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
          <Image
            src={stadiumBanner}
            alt="Stadium background"
            fill
            className="object-cover opacity-30 hidden md:block"
            sizes="100vw"
            priority
          />
          <Image
            src={mobileBanner}
            alt="Stadium background mobile"
            fill
            className="object-cover opacity-30 block md:hidden"
            sizes="100vw"
          />
        </motion.div>

        <div className="relative h-full flex items-center justify-center py-12">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-4 px-4 sm:px-6 lg:px-8"
          >
            <motion.h2
              variants={titleVariants}
              className="text-4xl sm:text-4xl md:text-6xl font-black text-white tracking-tight pt-8 sm:pt-0"
            >
              Uniview Smart{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Solutions for Stadium
              </span>
            </motion.h2>
            <motion.p
              variants={subtitleVariants}
              className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Advanced security and management solutions for sports venues and stadiums.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <motion.div 
        className="bg-white border-b border-gray-200 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
      >
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-4 md:space-x-8 min-w-max">
            <button
              onClick={() => scrollToSection('stadium-solution')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'stadium-solution'
                  ? 'border-[#3a7bd5] text-[#3a7bd5]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Stadium Solution
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stadium Solution Section - FIXED: Added proper container constraints */}
      <section id="stadium-solution" className="py-8 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            Stadium Security Solutions
          </motion.h1>
          
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              Discover comprehensive stadium security solutions designed to effectively manage crowds, mitigate potential threats like unruly behavior and violence, and safeguard fans and athletes. Our strategies are essential for maintaining a safe environment and preserving the reputation of your bustling venue.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Integrate UNV's advanced AIoT technology into your stadium operations to achieve unparalleled peace of mind. Our devices significantly reduce response times and enhance situational awareness, ensuring a safe and secure environment for all attendees.
            </p>
          </motion.div>

          {/* Solutions Section - FIXED: Added proper container constraints like BuildingSolutions */}
          <div className="mt-16 space-y-16 md:space-y-20">
            {solutionFeatures.map((feature, index) => {
              // Create a custom component for each feature to handle in-view detection
              const FeatureSection = () => {
                const ref = useRef(null);
                const isInView = useInView(ref, { 
                  once: true, 
                  margin: "0px 0px -100px 0px",
                  amount: 0.3
                });

                return (
                  <motion.div
                    ref={ref}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 md:gap-12 mx-auto w-full max-w-7xl px-4 sm:px-4 md:px-8 lg:px-8 xl:px-12`}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  >
                    <div className="w-full lg:w-1/2">
                      <motion.div
                        className="relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-100"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </motion.div>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <motion.h3 
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
                        variants={fadeInUp}
                      >
                        {feature.title}
                      </motion.h3>
                      <motion.p 
                        className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                        variants={fadeInUp}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              };

              return <FeatureSection key={index} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StadiumSolutions;