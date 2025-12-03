'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import SolutionCard from '../components/SolutionCard';
import Solutionbanner from '@/assets/images/banner/Solution.jpg';
import SolutionMobile from '@/assets/images/banner/SolutionMobile.jpg';
import schoolImage from "@/assets/Solution/card/School.jpg" 
import stadiumImage from "@/assets/Solution/card/Stadium.jpg"
import shoppingMall from "@/assets/Solution/card/Shopping.jpg"
import hospitalImage from "@/assets/Solution/card/Hospital.jpg"
import buildingImage from "@/assets/Solution/card/Building.jpg"
import retailImage from "@/assets/Solution/card/Retail.jpg"
import bankImgae from "@/assets/Solution/card/Bank.jpg"
import hotelImage from "@/assets/Solution/card/hotel2.jpg"
import warehouseImage from "@/assets/Solution/card/Warehouse.jpg"

interface SolutionData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  features: string[];
  url: string;
}

const solutionsData: SolutionData[] = [
    {
      id: '1',
      title: 'School',
      description: 'Education technology solutions for schools and learning institutions.',
      fullDescription: 'Our school management system integrates student information, learning management, communication tools, and campus operations to create efficient educational environments.',
      image: schoolImage.src,
      features: [
        'Student Information System (SIS)',
        'Learning Management System (LMS)',
        'Parent-teacher communication',
        'Attendance tracking',
        'Campus security solutions'
      ],
      url: 'School-solutions'
    },
    {
      id: '2',
      title: 'Stadium',
      description: 'Advanced solutions for stadium operations, fan engagement, and event management.',
      fullDescription: 'Transform your stadium into a smart venue with our integrated solutions for crowd management, ticketing, concessions, and fan engagement. Our systems enhance both operational efficiency and spectator experience.',
      image: stadiumImage.src,
      features: [
        'Digital ticketing and access control',
        'Crowd analytics and management',
        'Concession stand optimization',
        'In-seat ordering technology',
        'Enhanced fan engagement platforms'
      ],
      url: 'Stadium-solutions'
    },
    {
      id: '3',
      title: 'Shopping Mall',
      description: 'Integrated retail solutions for shopping center management and tenant optimization.',
      fullDescription: 'Our shopping mall platform provides comprehensive tools for mall operators including foot traffic analytics, tenant management, digital directories, and marketing automation to maximize retail performance.',
      image: shoppingMall.src,
      features: [
        'Visitor tracking and analytics',
        'Tenant performance dashboards',
        'Digital wayfinding solutions',
        'Parking management systems',
        'Promotional campaign tools'
      ],
      url: 'Shopping-mall-solutions'
    },
    {
      id: '4',
      title: 'Hospital',
      description: 'Healthcare technology solutions for patient care and medical facility management.',
      fullDescription: 'Our hospital management system streamlines clinical workflows, patient records, equipment tracking, and staff coordination to improve healthcare delivery and operational efficiency.',
      image: hospitalImage.src,
      features: [
        'Electronic Health Records (EHR)',
        'Patient flow management',
        'Medical equipment tracking',
        'Staff scheduling systems',
        'Telemedicine integration'
      ],
      url: 'Hospital-solutions'
    },
    {
      id: '5',
      title: 'Building',
      description: 'Smart building automation for commercial and residential properties.',
      fullDescription: 'Our building management solutions integrate IoT devices for intelligent control of lighting, HVAC, security, and energy systems, creating efficient and sustainable smart buildings.',
      image: buildingImage.src,
      features: [
        'Automated climate control',
        'Energy usage optimization',
        'Integrated security systems',
        'Predictive maintenance',
        'Occupancy analytics'
      ],
      url: 'Building-solutions'
    },
    {
      id: '6',
      title: 'Retail',
      description: 'Next-generation retail technology for stores and shopping experiences.',
      fullDescription: 'Enhance your retail operations with our omnichannel solutions including POS systems, inventory management, customer analytics, and personalized shopping experiences.',
      image: retailImage.src,
      features: [
        'Unified commerce platform',
        'Smart inventory management',
        'Customer behavior analytics',
        'Mobile checkout solutions',
        'Personalized promotions'
      ],
      url: 'Retail-solutions'
    },
    {
      id: '7',
      title: 'Bank',
      description: 'Digital banking solutions for financial institutions and customer services.',
      fullDescription: 'Modernize your banking operations with our secure digital platforms including core banking systems, mobile banking apps, fraud detection, and customer relationship management tools.',
      image: bankImgae.src,
      features: [
        'Digital banking platforms',
        'ATM and branch management',
        'Fraud detection systems',
        'Loan processing automation',
        'Customer analytics dashboards'
      ],
      url: 'Banking-solutions'
    },
    {
      id: '8',
      title: 'Hotel',
      description: 'Comprehensive hospitality solutions for seamless hotel operations and guest experiences.',
      fullDescription: 'Our hotel management system integrates property management, guest services, and operational efficiency tools to elevate your hospitality business. From automated check-ins to smart room controls, we provide end-to-end solutions for modern hotels.',
      image: hotelImage.src,
      features: [
        'Property Management System (PMS)',
        'Online booking engine integration',
        'Smart room automation',
        'Guest experience apps',
        'Revenue and yield management'
      ],
      url: 'Hotel-solutions'
    },
    {
      id: '9',
      title: 'Warehouse and Logistics',
      description: 'Supply chain optimization solutions for warehouses and distribution centers.',
      fullDescription: 'Streamline your logistics operations with our warehouse management systems featuring inventory control, order fulfillment, fleet management, and supply chain analytics.',
      image: warehouseImage.src,
      features: [
        'Warehouse Management System (WMS)',
        'Automated inventory tracking',
        'Order picking optimization',
        'Fleet management tools',
        'Supply chain analytics'
      ],
      url: 'Warehouse-solutions'
    }
  ];

// Animation variants - OPTIMIZED for all devices
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    }
  }
};

const heroVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const,
      delay: 0.2
    }
  }
};

const subtitleVariants = {
  hidden: {
    opacity: 0,
    y: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
      delay: 0.4
    }
  }
};

// Unified card animation for all devices
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const SolutionsPage: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isLoaded, setIsLoaded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Detect device type more precisely
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1200) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType();
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    window.addEventListener('resize', checkDeviceType);
    return () => {
      window.removeEventListener('resize', checkDeviceType);
      clearTimeout(timer);
    };
  }, []);

  // Determine grid columns based on device type
  const getGridCols = () => {
    switch (deviceType) {
      case 'mobile':
        return 'grid-cols-1';
      case 'tablet':
        return 'grid-cols-1 md:grid-cols-2';
      case 'desktop':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Get hero banner image based on device type
  const getHeroBanner = () => {
    return deviceType === 'mobile' ? SolutionMobile : Solutionbanner;
  };

  // Unified Solution Card with individual in-view detection for all devices
  const SolutionCardWrapper = ({ solution, index }: { solution: SolutionData; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: "0px 0px -50px 0px",
    });

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.6,
          delay: deviceType === 'desktop' ? index * 0.05 : index * 0.1,
          ease: "easeOut"
        }}
      >
        <SolutionCard solution={solution} />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Banner - Optimized for all devices */}
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[45vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
          {/* Banner image - Switched based on device type */}
          <Image
            src={getHeroBanner()}
            alt="Solutions background"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
        </motion.div>

        <div className="relative h-full flex items-center justify-center py-8 sm:py-12">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6 lg:px-8"
          >
            <motion.h1
              variants={titleVariants}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight pt-4 sm:pt-0"
            >
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Solutions
              </span>
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-2xl sm:max-w-3xl mx-auto px-2"
            >
              Comprehensive technology solutions tailored for every industry and business need.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Solutions Grid - Optimized for all devices */}
      <div className="bg-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Industry-Specific Solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Discover how our cutting-edge technology solutions can transform your business operations
              across various industries.
            </p>
          </motion.div>
          
          {/* Unified Grid with individual card detection for all devices */}
          <div 
            ref={gridRef}
            className={`grid ${getGridCols()} gap-6 sm:gap-8`}
          >
            {solutionsData.map((solution, index) => (
              <SolutionCardWrapper 
                key={solution.id} 
                solution={solution} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section - Optimized for all devices */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="bg-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "50+", label: "Industries Served" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2" style={{ color: '#0560f5' }}>
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section - Optimized for all devices */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-[#0560f5] to-[#3b82f6]"
      >
        <div className="max-w-7xl mx-auto py-10 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left mb-6 md:mb-0"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to transform your business?
            </h2>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-blue-100">
              Contact us today to discover the perfect solution for your needs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-white/10 transition-all duration-300 shadow-lg hover:bg-white/20"
              >
                Get Started
                <motion.svg
                  className="ml-2 sm:ml-3 -mr-1 h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        /* Force hardware acceleration for smoother animations on all devices */
        .solution-card {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Specific adjustments for all iPad models including iPad Pro */
        @media only screen and (min-width: 768px) and (max-width: 1366px) {
          .hero-banner {
            height: 35vh !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SolutionsPage;