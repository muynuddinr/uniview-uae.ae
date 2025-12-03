'use client'
import React, { useState, useEffect } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import MultiViewCamera from "@/assets/Solution/solutionsinner/MultiViewCamera.jpg"
import SmartOffice from "@/assets/Solution/solutionsinner/SmartOffice.jpg"
import UnifiedPersonnel from "@/assets/Solution/solutionsinner/UnifiedPersonnel.jpg"
import AutomatedVehicle from "@/assets/Solution/solutionsinner/AutomatedVehicle.jpg"
import CentralizedSecurity from "@/assets/Solution/solutionsinner/CentralizedSecurity.jpg"
import desktopBanner from "@/assets/Solution/banner/Buildingbanner.jpg";
import mobileBanner from "@/assets/Solution/banner/BuildingMobile.jpg" 

const BuildingSolutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('building-solution');
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);

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

  // Animation variants - Made slower
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
        duration: 1.6,
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
        duration: 1.6,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      title: "High integration compatibility with third-party platforms",
      icon: "⚙️",
      description: "Seamlessly integrate with existing systems and third-party platforms for comprehensive building management."
    },
    {
      title: "Fusion and visualization of events and data",
      icon: "📊",
      description: "Advanced data fusion capabilities that provide real-time visualization of all building events and analytics."
    },
    {
      title: "Clear design and Simplified operation",
      icon: "🎛️",
      description: "Intuitive interface design that simplifies complex building operations for all users."
    },
    {
      title: "Flexible integration of various modules to meet your needs",
      icon: "🧩",
      description: "Modular architecture that allows customization based on specific building requirements."
    }
  ];

  const solutions = [
    {
      title: "MultiView Camera with Smart Intrusion Prevention & Deterrence",
      features: [
        "Get reliable external protection with our MultiView camera.",
        "Provides multi-directional monitoring, seamlessly combining panoramic and detailed views.",
        "Smart Intrusion Prevention significantly reduces false alarms by accurately focusing on humans, motor vehicles, and non-motor vehicles.",
        "Advanced system offers proactive deterrence with warning lights and speakers to prevent potential risks before they happen."
      ],
      image: MultiViewCamera
    },
    {
      title: "Smart Office Digital Transformation: Elevators, Meeting Rooms & Safety",
      features: [
        "Upgrade your workspace with a digital internal transformation.",
        "Detailed monitoring for areas like elevators and warehouses.",
        "Interactive meeting rooms with UNV displays.",
        "High-quality information displays using LCD or LED video walls.",
        "Enhance safety with advanced detection for smoke, fire, and obstructed evacuation routes."
      ],
      image: SmartOffice
    },
    {
      title: "Unified Personnel Management System | Efficient HR & Visitor Management",
      features: [
        "Unified personnel management solution provides a seamless experience for your entire organization.",
        "Manage personnel uniformly through departmental organizations.",
        "Enhance entry and exit with rapid staff identification.",
        "Offer a pleasant visitor experience with convenient registration.",
        "Flexibly manage attendance rules and records."
      ],
      image: UnifiedPersonnel
    },
    {
      title: "Automated Vehicle Management: ANPR, Parking Guidance & 24/7 Monitoring",
      features: [
        "Streamline your vehicle management with ANPR for automated entry and exit.",
        "Effective parking guidance with real-time space detection and license plate recognition.",
        "24-hour full-color monitoring, even at night.",
        "Easily access detailed vehicle traffic records."
      ],
      image: AutomatedVehicle
    },
    {
      title: "Centralized Security Management Platform: CCTV, Access Control & Intercom",
      features: [
        "Manage all your building's security from one place.",
        "Customizable platform integrates CCTV, access control, and video intercom systems.",
        "Improve efficiency with rich data visualization and electronic maps.",
        "Open integration with third-party platforms."
      ],
      image: CentralizedSecurity
    }
  ];

  const scrollToSection = (section: string) => {
    setActiveTab(section);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      const buildingSolution = document.getElementById('building-solution');
      if (buildingSolution) {
        const buildingSolutionTop = buildingSolution.getBoundingClientRect().top;
        if (buildingSolutionTop < window.innerHeight / 2) {
          setActiveTab('building-solution');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - Fixed height like AboutUsPage */}
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[45vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
          {/* Desktop Banner - Hidden on mobile */}
          <Image
            src={desktopBanner}
            alt="Building background"
            fill
            className="object-cover opacity-30 hidden md:block"
            sizes="100vw"
          />
          {/* Mobile Banner - Only visible on mobile */}
          <Image
            src={mobileBanner}
            alt="Building background mobile"
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
                Solutions for Buildings
              </span>
            </motion.h2>
            <motion.p
              variants={subtitleVariants}
              className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Comprehensive technology solutions tailored for every industry and business need.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs - Sticky version */}
      <motion.div
        className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide space-x-4 md:space-x-8">
            <button
              onClick={() => scrollToSection('building-solution')}
              className={`py-4 px-1 md:px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${activeTab === 'building-solution'
                ? 'border-[#3a7bd5] text-[#3a7bd5]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Building Solution
            </button>
          </div>
        </div>
      </motion.div>

      {/* Building Solution Section - FIXED: Proper container constraints for all devices */}
      <section id="building-solution" className="py-8 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            Comprehensive Building Security Solutions
          </motion.h1>

          <motion.div
            className="text-center max-w-4xl mx-auto mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              Our advanced building security solutions are designed to protect privacy while covering all critical areas. We consider the unique social, cultural, and economic activities within your venue to create a sophisticated, blind-spot-free security plan.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              With years of experience, Uniview offers comprehensive building security solutions for all types of surveillance scenes. Our in-depth industry knowledge ensures your building is protected with an effective and reliable security system.
            </p>
          </motion.div>

          {/* Features Grid - Responsive - FIXED: Using same pattern as HotelSolution */}
          <motion.div
            className="mt-16"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={stagger}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 border border-gray-100"
                  variants={scaleIn}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1.0 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions Section - FIXED: Proper container constraints for iPad Pro and all tablet sizes */}
          <div className="mt-16 space-y-16 md:space-y-20">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 md:gap-12 mx-auto w-full max-w-7xl px-4 sm:px-4 md:px-8 lg:px-8 xl:px-12`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
              >
                <div className="w-full lg:w-1/2">
                  <motion.div
                    className="relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </motion.div>
                </div>
                <div className="w-full lg:w-1/2">
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
                    variants={fadeInUp}
                  >
                    {solution.title}
                  </motion.h2>
                  <motion.ul
                    className="space-y-3"
                    variants={stagger}
                  >
                    {solution.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start text-gray-700"
                        variants={fadeInUp}
                      >
                        <span className="text-blue-500 mr-3 mt-1">-</span>
                        <span className="text-sm md:text-base">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildingSolutions;