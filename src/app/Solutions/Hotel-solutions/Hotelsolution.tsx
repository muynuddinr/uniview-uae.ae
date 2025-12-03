'use client'
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import image1 from '@/assets/Solution/banner/Hotelbanner.jpg';
import staffMonitoring from '@/assets/Solution/solutionsinner/Hotel-StaffMonitoring.jpg';
import unauthorizedAccess from '@/assets/Solution/solutionsinner/Hotel-Unauthorized.jpg';
import theftAndVandalism from '@/assets/Solution/solutionsinner/Hotel-Theft.jpg';
import mobileBanner from "@/assets/Solution/banner/HotelMobile.jpg"
import image2 from "@/assets/Solution/solutionsinner/Hotel-1.jpg"
import image3 from "@/assets/Solution/solutionsinner/Hotel-2.jpg"
import image4 from "@/assets/Solution/solutionsinner/Hotel-3.jpg"

const HotelSolutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants - optimized for initial load
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
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
        duration: 0.8,
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
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

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

  const challenges = [
    {
      title: "Staff Monitoring",
      description: "Non-compliance with safety procedures and job duties may lead to customer conflicts.",
      features: [
        "No Work Clothes Detection",
        "On-duty Detection",
        "Sleep-on-duty Detection"
      ],
      image: staffMonitoring
    },
    {
      title: "Unauthorized Access",
      description: "Unauthorized access to restricted or hazardous areas can disrupt hotel operations.",
      features: [
        "Access control for restricted areas",
        "Real-time intrusion alerts",
        "24/7 monitoring of sensitive locations"
      ],
      image: unauthorizedAccess
    },
    {
      title: "Theft and Vandalism",
      description: "Property loss, poor guest experience, and damage to your hotel's reputation",
      features: [
        "Vandalism detection",
        "Property protection monitoring",
        "Instant incident alerts"
      ],
      image: theftAndVandalism
    }
  ];

  const solutionFeatures = [
    {
      title: "Optimize Hotel Operations: Staff Monitoring & Safety with UNV Solutions",
      description: "Enhance hotel safety and efficiency with UNV's advanced staff monitoring solutions. Ensure compliance with safety protocols, optimize duty performance, and prevent on-duty negligence with features like No Work Clothes Detection and Sleep-on-duty Detection for seamless hotel operations.",
      features: [
        "No Work Clothes Detection ensures uniform compliance",
        "On-duty Detection verifies staff presence",
        "Sleep-on-duty Detection maintains service quality"
      ],
      image: image2.src
    },
    {
      title: "Complete Hotel Security: UNV Solutions for Corridors & Elevators",
      description: "Secure every corner of your hotel with UNV's comprehensive security solutions. Our system provides real-time monitoring and instant alerts for key areas like corridors and elevators, detecting incidents such as smoking, fighting, or falls to ensure the safety of your guests and their property",
      features: [
        "Corridor and elevator monitoring",
        "Smoking and fighting detection",
        "Fall detection for guest safety"
      ],
      image: image3.src
    },
    {
      title: "Enhance Guest Experience: Optimize Hotel Services with UNV",
      description: "Improve guest satisfaction with UNV's customer flow counting solutions. Optimize staffing, streamline check-in/out, and reduce wait times. Our system also features VIP notifications and protects guest privacy with privacy masks and face mosaics, creating a more enjoyable and worry-free stay.",
      features: [
        "Customer flow counting for staff optimization",
        "VIP notification for premium service",
        "Privacy protection features"
      ],
      image: image4.src
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
      {/* Hero Banner - Fixed height like other solutions */}
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[45vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
          {/* Desktop Banner - Hidden on mobile */}
          <Image
            src={image1}
            alt="Hotel background"
            fill
            className="object-cover opacity-30 hidden md:block"
            sizes="100vw"
          />
          {/* Mobile Banner - Only visible on mobile */}
          <Image
            src={mobileBanner}
            alt="Hotel background mobile"
            fill
            className="object-cover opacity-30 block md:hidden"
            sizes="100vw"
          />
        </div>

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
                Solutions for Hotel
              </span>
            </motion.h2>
            <motion.p
              variants={subtitleVariants}
              className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Comprehensive security and management solutions for the hospitality industry.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <motion.div
        className="bg-white border-b border-gray-200 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-4 md:space-x-8 min-w-max">
            <button
              onClick={() => scrollToSection('challenges')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'challenges'
                ? 'border-[#3a7bd5] text-[#3a7bd5]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Challenges
            </button>
            <button
              onClick={() => scrollToSection('hotel-solution')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'hotel-solution'
                ? 'border-[#3a7bd5] text-[#3a7bd5]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              Hotel Solution
            </button>
          </div>
        </div>
      </motion.div>

      {/* Challenges Section - Fixed */}
      <section id="challenges" className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            Challenges
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={stagger}
          >
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                variants={scaleIn}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src={challenge.image}
                    alt={challenge.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </div>
                <div className="p-4 md:p-6">
                  <div className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    {challenge.title}
                  </div>
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                    {challenge.description}
                  </p>
                  <div className="space-y-2">
                    {challenge.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-xs md:text-sm text-gray-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hotel Solution Section - FIXED: Added proper container constraints */}
      <section id="hotel-solution" className="py-8 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Hotel Security Solutions
          </motion.h1>

          <motion.div
            className="text-center max-w-4xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              Discover how modern hotel solutions are meeting the rising demand for accommodation. We focus on creating a comfortable environment for guests by leveraging digital advancements in the hospitality industry.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              UNV's hotel security solutions address critical security challenges, creating a safer environment for both guests and staff. Enhance your hotel's reputation for safety and reliability while improving the overall guest experience.
            </p>
          </motion.div>

          {/* Solutions Section - FIXED: Added proper container constraints for iPad Pro and all tablet sizes */}
          <div className="mt-16 space-y-16 md:space-y-20">
            {solutionFeatures.map((solution, index) => (
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
                  <motion.p
                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                    variants={fadeInUp}
                  >
                    {solution.description}
                  </motion.p>
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

export default HotelSolutions;