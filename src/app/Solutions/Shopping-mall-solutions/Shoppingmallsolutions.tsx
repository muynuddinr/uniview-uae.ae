'use client'
import React, { useState } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import shoppingbanner from '@/assets/Solution/banner/Shopingmallbanner.jpg';
import mallImage from '@/assets/Solution/solutionsinner/Shopping-security.jpg';
import surveillanceImage from '@/assets/Solution/solutionsinner/Shopping-Surveillance.jpg';
import displayImage from '@/assets/Solution/solutionsinner/Shopping-Digital.jpg';
import mobileBanner from "@/assets/Solution/banner/ShoppingMobile.jpg"

const ShoppingMallSolutions: React.FC = () => {
    const [activeTab, setActiveTab] = useState('mall-solution');
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

    const fadeInUpMain: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
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

    const safetyFeatures = [
        {
            title: "Shopper Safety",
            description: "Protect shoppers from theft, vandalism, and other security threats",
            icon: "🛡️",
            color: primaryColor
        },
        {
            title: "Operational Efficiency",
            description: "Streamlined security operations that allow store owners to focus on their business",
            icon: "⚙️",
            color: secondaryColor
        },
        {
            title: "Higher Sales",
            description: "Create a safe and welcoming environment to increase foot traffic and encourage longer stays",
            icon: "💰",
            color: accentColor
        }
    ];

    const surveillanceFeatures = [
        {
            title: "HD Video Coverage",
            description: "Capture every moment with high-definition video, ensuring clarity day or night",
            icon: "📹",
            color: primaryColor
        },
        {
            title: "Customer Flow Analysis",
            description: "Understand foot traffic patterns to optimize mall layout and staffing",
            icon: "👥",
            color: secondaryColor
        },
        {
            title: "Area Protection",
            description: "Monitor all areas from entrances to elevators and warehouses",
            icon: "🏬",
            color: accentColor
        }
    ];

    const displayFeatures = [
        {
            title: "LED Displays",
            description: "Highlight star products on mall exteriors and checkout counters",
            icon: "🖥️"
        },
        {
            title: "LCD Solutions",
            description: "Tell your brand story through engaging digital displays",
            icon: "📺"
        },
        {
            title: "Emergency Notices",
            description: "Provide safety information promptly in mall corridors",
            icon: "⚠️"
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
                        src={shoppingbanner}
                        alt="Shopping mall background"
                        fill
                        className="object-cover opacity-30 hidden md:block"
                        sizes="100vw"
                    />
                    {/* Mobile Banner - Only visible on mobile */}
                    <Image
                        src={mobileBanner}
                        alt="Shopping mall background mobile"
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
                                Solutions for Shopping Mall
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={subtitleVariants}
                            className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                        >
                            Comprehensive protection for shoppers, retailers, and mall operations
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
                            onClick={() => scrollToSection('mall-solution')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'mall-solution'
                                ? 'border-[#3a7bd5] text-[#3a7bd5]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Mall Solution
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Mall Solution Section - FIXED: Using same pattern as SchoolSolution */}
            <section id="mall-solution" className="py-8 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUpMain}
                    >
                        Shopping Mall Security Solution
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
                        Discover the ultimate shopping experience at our vibrant mall, a destination where interconnected stores, diverse restaurants, and exciting entertainment venues come together. We prioritize a secure environment for shoppers and seamless operations for store owners, ensuring a top-tier experience that boosts revenue and provides endless leisure activities.
                        </p>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        Discover how UNV's comprehensive and integrated security solutions can enhance safety and operational efficiency in your shopping mall. Our tailored systems, implemented in numerous malls worldwide, are designed to create a secure and enjoyable experience for everyone.
                        </p>
                    </motion.div>

                    {/* Safety Features section - FIXED: Using same pattern as SchoolSolution */}
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
                            Shopper Safety
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {safetyFeatures.map((feature, index) => (
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
                                        src={mallImage}
                                        alt="Shopping mall security"
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
                                    Comprehensive Shopping Mall Security: Products for Every Area
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Protect every corner of your shopping mall with our diverse range of security products. From outdoor areas and entrances to elevators, escalators and warehouses, our solutions provide high-definition video capture, ensuring you never miss a detail, day or night.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Surveillance Content - FIXED: Using same pattern as SchoolSolution */}
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
                            Comprehensive Surveillance Coverage
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {surveillanceFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                    variants={scaleIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h4>
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
                                        src={surveillanceImage}
                                        alt="Mall surveillance"
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
                                    Master Customer Flow Data for Optimal Shopping Mall Layout
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Understand foot traffic patterns across your shopping mall to optimize layout and improve customer experience. Our solutions provide data on peak traffic times, enabling efficient staff allocation for superior customer service and security, ultimately enhancing operational efficiency and driving revenue growth.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Display & Control Content - FIXED: Using same pattern as SchoolSolution */}
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
                            Digital Display Solutions
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {displayFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className={`bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow`}
                                    variants={scaleIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h4>
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
                                        src={displayImage}
                                        alt="Mall digital displays"
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
                                    Immersive Experiences: UNV Display & Control Products for Shopping Malls
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    UNV's display and control products enhance shopping mall communication with vibrant LED and LCD solutions. Showcase your brand story on exterior displays, highlight products at checkout counters, and provide crucial safety information in corridors to engage customers and ensure optimal visibility.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ShoppingMallSolutions;