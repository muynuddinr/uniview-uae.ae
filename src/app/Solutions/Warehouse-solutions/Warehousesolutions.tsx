'use client'
import React, { useState } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import warehouseImage from '@/assets/Solution/banner/warehousebanner.jpg';
import perimeter from '@/assets/Solution/solutionsinner/Warehouse-Perimeter.jpg'
import accessControl from '@/assets/Solution/solutionsinner/Warehouse-AccessControl.jpg'
import cargo from '@/assets/Solution/solutionsinner/Warehouse-CargoManagement.jpg'
import mobileBanner from '@/assets/Solution/banner/WarehouseMobile.jpg';

const WarehouseSolutions: React.FC = () => {
    const [activeTab, setActiveTab] = useState('warehouse-solution');
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 150]);

    // Color scheme
    const primaryColor = '#007a7d'; // Deep teal
    const secondaryColor = '#00a0a5'; // Bright teal
    const accentColor = '#005f73'; // Darker teal

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

    const titleFadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
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

    // Hero Animation Variants (from first file)
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

    const solutionAreas = [
        {
            title: "Personnel",
            description: "Protect employees and achieve efficient personnel management",
            icon: "👥"
        },
        {
            title: "Vehicle",
            description: "From entry to exit, all key aspects of the vehicle's operation are guarded",
            icon: "🚛"
        },
        {
            title: "Cargo",
            description: "Monitor and record the condition and movement of all goods",
            icon: "📦"
        },
        {
            title: "Process",
            description: "Ensure that every link of the operation is orderly and compliant",
            icon: "🔄"
        }
    ];

    const protectionAreas = [
        {
            title: "Perimeter Protection",
            description: "Advanced intrusion detection and prevention systems",
            icon: "🛡️"
        },
        {
            title: "Access Control",
            description: "Secure and efficient management of personnel and vehicles",
            icon: "🔒"
        },
        {
            title: "Cargo Monitoring",
            description: "Comprehensive surveillance of goods and storage areas",
            icon: "📊"
        },
    ];

    const perimeterFeatures = [
        {
            description: "Smart Intrusion Prevention with high alarm accuracy",
            color: primaryColor
        },
        {
            description: "Active Deterrence to intervene proactively",
            color: secondaryColor
        },
        {
            description: "Thermal Technology to make the invisible visible",
            color: accentColor
        }
    ];

    const accessControlFeatures = [
        {
            title: "Deep Learning Algorithm",
            description: "High accuracy for personnel identification",
            icon: "🧠"
        },
        {
            title: "ANPR Technology",
            description: "Smooth and automated vehicle access",
            icon: "🚗"
        },
        {
            title: "Access Data Management",
            description: "Available for query and attendance management",
            icon: "📊"
        }
    ];

    const accessFeatures = [
        {
            description: "UNV deep learning algorithm for high accuracy",
            color: primaryColor
        },
        {
            description: "ANPR for smooth and automated vehicle access",
            color: secondaryColor
        },
        {
            description: "Access data available for query and attendance management",
            color: accentColor
        }
    ];

    const cargoFeatures = [
        {
            title: "360° Panoramic View",
            description: "Wide coverage without blind spots",
            icon: "👀"
        },
        {
            title: "Backlight Clarity",
            description: "Clear image in challenging lighting conditions",
            icon: "💡"
        },
        {
            title: "Temperature Monitoring",
            description: "Detect abnormal temperatures and fire hazards",
            icon: "🔥"
        }
    ];

    const cargoFeature = [
        {
            description: "360° panoramic view, a wide coverage without blind spot",
            color: primaryColor
        },
        {
            description: "Clear image in backlight environment to record every cargo",
            color: secondaryColor
        },
        {
            description: "Temperature Measurement and Fire Detection",
            color: accentColor
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
                <motion.div className="absolute inset-0" style={{ y }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                    <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
                    {/* Desktop Banner - Hidden on mobile */}
                    <Image
                        src={warehouseImage}
                        alt="Warehouse background"
                        fill
                        className="object-cover opacity-30 hidden md:block"
                        sizes="100vw"
                    />
                    {/* Mobile Banner - Only visible on mobile */}
                    <Image
                        src={mobileBanner}
                        alt="Warehouse background mobile"
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
                            className="text-4xl sm:text-4xl md:text-5xl font-black text-white tracking-tight pt-8 sm:pt-0"
                        >
                            Uniview Smart{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                Solutions for Warehouse and Logistics
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={subtitleVariants}
                            className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                        >
                            End-to-end protection for your warehouse operations and logistics
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
                            onClick={() => scrollToSection('warehouse-solution')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'warehouse-solution'
                                    ? 'border-[#3a7bd5] text-[#3a7bd5]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Warehouse Solution
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Warehouse Solution Section - FIXED: Using same pattern as SchoolSolution */}
            <section id="warehouse-solution" className="py-8 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    {/* Overview Content - This is the ONLY h1 tag */}
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={titleFadeInUp}
                    >
                       Comprehensive Warehouse and Logistics Solution
                    </motion.h1>

                    <motion.div
                        className="text-center max-w-4xl mx-auto mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 60 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 1.2,
                                    ease: "easeOut",
                                    delay: 0.3
                                }
                            }
                        }}
                    >
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                            Business and consumers around the world depend on warehousing and logistics for safe and timely delivery of goods. Theft, break-ins and other unforeseen threats can have a devastating impact on their business continuity.
                        </p>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                            UNV's end-to-end warehouse and logistics solution empowers operators to create a secure environment safeguarding employees, vehicle processes, and cargo storage. This ensures uninterrupted workflow and enhances operational efficiency.
                        </p>
                    </motion.div>

                  
                    <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12"
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                        >
                            {solutionAreas.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                    variants={scaleIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-700">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                    {/* Solution Areas section - FIXED: Using same pattern as SchoolSolution */}
                    <motion.div
                        className="py-8 px-4 bg-white rounded-xl shadow-lg mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Comprehensive Protection Areas
                        </motion.h2>

                        
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {protectionAreas.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                    variants={scaleIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-700">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Perimeter Protection section */}
                        <motion.div
                            className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-[${primaryColor}]/10 rounded-xl p-2`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInLeft}
                        >
                            <div className="w-full lg:w-1/2">
                                <motion.div
                                    className="relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-100"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Image
                                        src={perimeter}
                                        alt="Warehouse perimeter protection"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                                <motion.h3
                                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
                                    variants={fadeInUp}
                                >
                                     UNV Tri-guard Series: Perimeter Protection & Intrusion Detection
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                   Safeguard your property with UNV's Tri-guard series and advanced thermal cameras. Our solutions offer smart intrusion prevention, active deterrence, and thermal technology to detect threats like break-ins and fires, ensuring your premises are secure.
                                   </motion.p>
                                
                                <motion.h4
                                    className="text-lg md:text-xl font-semibold text-gray-900 mb-3"
                                    variants={fadeInUp}
                                >
                                    What we offer:
                                </motion.h4>
                                
                                <motion.div
                                    className="space-y-4"
                                    variants={stagger}
                                >
                                    {perimeterFeatures.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start space-x-3"
                                            variants={fadeInUp}
                                        >
                                            <div 
                                                className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gray-400"
                                            ></div>
                                            <p className="text-gray-700 text-base md:text-lg leading-relaxed">{feature.description}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Access Control Section - FIXED: Using same pattern as SchoolSolution */}
                    <motion.div
                        className="py-8 px-4 bg-white rounded-xl shadow-lg mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Access Control Management
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {accessControlFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                    variants={scaleIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-700">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className={`flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-12 bg-[${primaryColor}]/10 rounded-xl p-2`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInRight}
                        >
                            <div className="w-full lg:w-1/2">
                                <motion.div
                                    className="relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-100"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Image
                                        src={accessControl}
                                        alt="Access control management"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                                <motion.h3
                                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
                                    variants={fadeInUp}
                                >
                                    UNV Access Control: Secure and Smooth Operations
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                   UNV's advanced access control system ensures seamless and secure operations in high-traffic environments like warehouses. Using a deep-learning algorithm, our system offers highly accurate access for employees and automated vehicle entry via ANPR. Manage attendance and query access data with ease.
                                   </motion.p>
                                   <motion.h4
                                    className="text-lg md:text-xl font-semibold text-gray-900 mb-3"
                                    variants={fadeInUp}
                                >
                                    What we offer:
                                </motion.h4>
                                
                                <motion.div
                                    className="space-y-4"
                                    variants={stagger}
                                >
                                    {accessFeatures.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start space-x-3"
                                            variants={fadeInUp}
                                        >
                                            <div 
                                                className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gray-400"
                                            ></div>
                                            <p className="text-gray-700 text-base md:text-lg leading-relaxed">{feature.description}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Cargo Management Section - FIXED: Using same pattern as SchoolSolution */}
                    <motion.div
                        className="py-8 px-4 bg-gray-50 rounded-xl shadow-lg"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Cargo Management
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {cargoFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className={`bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow`}
                                    variants={scaleIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-700">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-white rounded-xl p-2 shadow-sm"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInLeft}
                        >
                            <div className="w-full lg:w-1/2">
                                <motion.div
                                    className="relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-100"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Image
                                        src={cargo}
                                        alt="Cargo management"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                                <motion.h3
                                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
                                    variants={fadeInUp}
                                >
                                    Cargo Management Solutions | UNV
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Streamline your warehouse operations with UNV's professional cargo management solutions. Our system provides a 360° panoramic view for comprehensive monitoring, ensuring every item is recorded clearly, even in challenging light conditions. Utilize our thermal imaging technology for real-time temperature measurement and fire detection to prevent losses and ensure the safety of your goods.
                                    </motion.p>
                                <motion.h4
                                    className="text-lg md:text-xl font-semibold text-gray-900 mb-3"
                                    variants={fadeInUp}
                                >
                                    What we offer:
                                </motion.h4>
                                
                                <motion.div
                                    className="space-y-4"
                                    variants={stagger}
                                >
                                    {cargoFeature.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start space-x-3"
                                            variants={fadeInUp}
                                        >
                                            <div 
                                                className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gray-400"
                                            ></div>
                                            <p className="text-gray-700 text-base md:text-lg leading-relaxed">{feature.description}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default WarehouseSolutions;