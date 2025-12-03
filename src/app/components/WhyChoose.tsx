'use client';

import React, { useState } from 'react';
import { Rocket, Monitor, Diamond, CheckCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface ServiceCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyChooseUs: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const services: ServiceCard[] = [
    {
      id: 1,
      icon: <Rocket className="w-6 h-6" style={{ color: '#0560f5' }} />,
      title: "24/7 monitoring support",
      description: "Round-the-clock surveillance with immediate response to any security incidents."
    },
    {
      id: 2,
      icon: <Monitor className="w-6 h-6" style={{ color: '#0560f5' }} />,
      title: "Smart home integration",
      description: "Seamlessly connect your CCTV system with other smart devices for complete home automation."
    },
    {
      id: 3,
      icon: <Diamond className="w-6 h-6" style={{ color: '#0560f5' }} />,
      title: "Free consultations",
      description: "Expert security assessments to design the perfect surveillance solution for your property."
    },
    {
      id: 4,
      icon: <CheckCircle className="w-6 h-6" style={{ color: '#0560f5' }} />,
      title: "Affordable maintenance plans",
      description: "Cost-effective service plans to keep your security system operating at peak performance."
    }
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const leftContentVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -80 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  // Different entry animations for each card position
  const getCardVariants = (index: number): Variants => {
    const positions = [
      { x: -300, y: -300 }, // Top-left
      { x: 300, y: -300 },  // Top-right
      { x: -300, y: 300 },  // Bottom-left
      { x: 300, y: 300 }    // Bottom-right
    ];

    // Different hover rotations for each card position to create the sticky effect
    const hoverRotations = [
      { rotate: -8, x: -5, y: -8 },    // Top-left tilts left and up
      { rotate: 8, x: 5, y: -8 },      // Top-right tilts right and up
      { rotate: 8, x: -5, y: -5 },     // Bottom-left tilts right and up slightly
      { rotate: -8, x: 5, y: -5 }      // Bottom-right tilts left and up slightly
    ];

    return {
      hidden: { 
        opacity: 0, 
        x: positions[index].x,
        y: positions[index].y,
        scale: 0.3,
        rotate: index % 2 === 0 ? -45 : 45
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 100,
          duration: 1.5,
          ease: "easeOut"
        }
      },
      hover: {
        scale: 1.05,
        rotate: hoverRotations[index].rotate,
        x: hoverRotations[index].x,
        y: hoverRotations[index].y,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
          duration: 0.4
        }
      },
      active: {
        scale: 1.05,
        rotate: hoverRotations[index].rotate,
        x: hoverRotations[index].x,
        y: hoverRotations[index].y,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
          duration: 0.4
        }
      }
    };
  };

  const iconVariants: Variants = {
    hover: {
      rotate: [0, -15, 15, -10, 0],
      scale: [1, 1.2, 1.1, 1.15, 1],
      transition: {
        duration: 1.0,
        ease: "easeInOut"
      }
    },
    active: {
      rotate: [0, -15, 15, -10, 0],
      scale: [1, 1.2, 1.1, 1.15, 1],
      transition: {
        duration: 1.0,
        ease: "easeInOut"
      }
    }
  };

  const titleVariants: Variants = {
    hover: {
      color: '#0560f5',
      x: 5,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    active: {
      color: '#0560f5',
      x: 5,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const handleCardClick = (cardId: number) => {
    if (activeCard === cardId) {
      setActiveCard(null);
    } else {
      setActiveCard(cardId);
    }
  };

  return (
    <motion.div 
      className="w-full" 
      style={{ backgroundColor: '#f9fafb' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-6"
            variants={leftContentVariants}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 100,
                duration: 1.2, 
                delay: 0.1 
              }}
            >
              Dubai's Trusted CCTV Experts
            </motion.h2>
            
            <motion.div 
              className="space-y-4 text-gray-600 text-[17px] font-normal leading-relaxed text-justify"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, delay: 0.3 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 30, x: -50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 100,
                  duration: 0.8, 
                  delay: 0.4 
                }}
              >
                For over a decade, we've secured Dubai with advanced <strong>UNV CCTV systems</strong> featuring 4K resolution, AI analytics, and weatherproof durability. Our certified technicians provide tailored surveillance solutions for homes and businesses.
              </motion.p>
              
              <motion.h3
                className="text-2xl font-bold text-gray-800 mt-8"
                initial={{ opacity: 0, y: 30, x: -50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 100,
                  duration: 0.8, 
                  delay: 0.5 
                }}
              >
                24/7 Protection You Can Rely On
              </motion.h3>
              
              <motion.ul
                className="space-y-2 text-gray-600"
                initial={{ opacity: 0, y: 30, x: -50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 100,
                  duration: 0.8, 
                  delay: 0.6 
                }}
              >
                <li className="flex items-start">
                  <span className="mr-2">✔️</span>
                  <span>24/7 monitoring support</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✔️</span>
                  <span>Smart home integration</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✔️</span>
                  <span>Free consultations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✔️</span>
                  <span>Affordable maintenance plans</span>
                </li>
              </motion.ul>
              
              <motion.p
                className="mt-4 font-medium"
                initial={{ opacity: 0, y: 30, x: -50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 100,
                  duration: 0.8, 
                  delay: 0.7 
                }}
              >
                Get your free security assessment today!
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Content - Service Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={cardContainerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group bg-white rounded-xl p-6 shadow-md border border-gray-100 cursor-pointer relative overflow-visible touch-manipulation select-none"
                style={{ willChange: 'transform' }}
                variants={getCardVariants(index)}
                animate={activeCard === service.id ? "active" : "visible"}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(service.id)}
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, rgba(5, 96, 245, 0.03) 0%, rgba(5, 96, 245, 0.08) 100%)`,
                    willChange: 'opacity'
                  }}
                  animate={{
                    opacity: activeCard === service.id ? 1 : 0
                  }}
                  whileHover={{
                    opacity: 1,
                    transition: { duration: 0.4 }
                  }}
                />

                {/* Icon Container with Enhanced Hover Effect */}
                <div className="relative mb-4 z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300" 
                    style={{ 
                      backgroundColor: '#0560f5' + '15', 
                      borderColor: '#0560f5' + '30', 
                      borderWidth: '1px',
                      willChange: 'transform'
                    }}
                    variants={iconVariants}
                    animate={activeCard === service.id ? "active" : ""}
                    whileHover="hover"
                  >
                    {service.icon}
                  </motion.div>
                  
                  {/* Multiple layered backgrounds on hover */}
                  <motion.div 
                    className="absolute inset-0 w-12 h-12 rounded-full -z-10" 
                    style={{ backgroundColor: '#0560f5' + '20', willChange: 'transform, opacity' }}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                      opacity: activeCard === service.id ? 1 : 0,
                      scale: activeCard === service.id ? [1, 1.4, 1.2] : 1
                    }}
                    whileHover={{ 
                      opacity: 1, 
                      scale: [1, 1.4, 1.2],
                      transition: { duration: 0.6, times: [0, 0.5, 1] }
                    }}
                  />
                  
                  <motion.div 
                    className="absolute inset-0 w-12 h-12 rounded-full -z-20" 
                    style={{ backgroundColor: '#0560f5' + '10', willChange: 'transform, opacity' }}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                      opacity: activeCard === service.id ? 1 : 0,
                      scale: activeCard === service.id ? [1, 1.8, 1.5] : 1
                    }}
                    whileHover={{ 
                      opacity: 1, 
                      scale: [1, 1.8, 1.5],
                      transition: { duration: 0.8, delay: 0.1, times: [0, 0.6, 1] }
                    }}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2 relative z-10">
                  <motion.h3 
                    className="text-lg font-semibold text-gray-800 transition-colors duration-300"
                    style={{ willChange: 'transform' }}
                    variants={titleVariants}
                    animate={activeCard === service.id ? "active" : ""}
                    whileHover="hover"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-3"
                    initial={{ opacity: 0.8 }}
                    animate={{
                      opacity: activeCard === service.id ? 1 : 0.8,
                      y: activeCard === service.id ? -2 : 0
                    }}
                    whileHover={{ 
                      opacity: 1,
                      y: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {service.description}
                  </motion.p>
                </div>

                {/* Enhanced shadow and glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ 
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    filter: "brightness(1)"
                  }}
                  animate={{
                    boxShadow: activeCard === service.id ? 
                      "0 20px 25px -5px rgba(5, 96, 245, 0.12), 0 10px 10px -5px rgba(5, 96, 245, 0.06)" :
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    filter: activeCard === service.id ? "brightness(1.02)" : "brightness(1)"
                  }}
                  whileHover={{
                    boxShadow: [
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      "0 25px 35px -5px rgba(5, 96, 245, 0.15), 0 15px 15px -5px rgba(5, 96, 245, 0.08)",
                      "0 20px 25px -5px rgba(5, 96, 245, 0.12), 0 10px 10px -5px rgba(5, 96, 245, 0.06)"
                    ],
                    filter: ["brightness(1)", "brightness(1.05)", "brightness(1.02)"],
                    transition: { 
                      duration: 0.6,
                      times: [0, 0.5, 1]
                    }
                  }}
                />

                {/* Subtle border animation on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-transparent"
                  animate={{
                    borderColor: activeCard === service.id ? 'rgba(5, 96, 245, 0.1)' : 'rgba(5, 96, 245, 0)'
                  }}
                  whileHover={{
                    borderColor: ['rgba(5, 96, 245, 0)', 'rgba(5, 96, 245, 0.3)', 'rgba(5, 96, 245, 0.1)'],
                    transition: { duration: 0.6, times: [0, 0.5, 1] }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUs;