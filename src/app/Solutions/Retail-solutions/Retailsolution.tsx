'use client'
import React, { useState } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import retailImage from '@/assets/Solution/banner/Retailbanner.jpg';
import mobileBanner from '@/assets/Solution/banner/RetailMobile.jpg'
import EnhanceStore from "@/assets/Solution/solutionsinner/EnhanceStore.jpg"
import POSIntegration from "@/assets/Solution/solutionsinner/POSIntegration.jpg"
import BoostSales from "@/assets/Solution/solutionsinner/BoostSales.jpg"

const RetailChainSolutions: React.FC = () => {
    const [activeTab, setActiveTab] = useState('retail-solution');
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

    const securityChallenges = [
        {
            title: "Theft Prevention",
            description: "Address both shoplifting and employee theft",
            icon: "🛡️"
        },
        {
            title: "Loss Prevention",
            description: "Minimize inventory shrinkage and financial losses",
            icon: "💰"
        },
        {
            title: "Access Control",
            description: "Manage who can access sensitive areas",
            icon: "🔒"
        }
    ];


    const posFeatures = [
        {
            title: "Transaction Overlay",
            description: "POS data displayed on live and playback videos",
            icon: "💳"
        },
        {
            title: "Quick Retrieval",
            description: "Find records based on POS keywords",
            icon: "🔍"
        },
        {
            title: "Fraud Prevention",
            description: "Seamless investigation of disputes",
            icon: "🕵️"
        }
    ];

    const analyticsFeatures = [
        {
            title: "Customer Traffic Analysis",
            description: "Optimize staff allocation based on foot traffic",
            icon: "👥"
        },
        {
            title: "Store Heat Maps",
            description: "Understand customer movement patterns",
            icon: "🗺️"
        },
        {
            title: "Sales Optimization",
            description: "Refine business strategies based on data",
            icon: "📈"
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
                        src={retailImage}
                        alt="Retail store background"
                        fill
                        className="object-cover opacity-30 hidden md:block"
                        sizes="100vw"
                    />
                    {/* Mobile Banner - Only visible on mobile */}
                    <Image
                        src={mobileBanner}
                        alt="Retail store background mobile"
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
                            Uniview Solutions for{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                Retail Chain Store
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={subtitleVariants}
                            className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                        >
                            Comprehensive protection for your retail chain operations
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
                            onClick={() => scrollToSection('retail-solution')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'retail-solution'
                                ? 'border-[#3a7bd5] text-[#3a7bd5]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Retail Solution
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Retail Solution Section - FIXED: Exact same pattern as SchoolSolution */}
            <section id="retail-solution" className="py-8 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        Security Solutions for Retail Chain Stores
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
                        Learn about the key security challenges facing retail chains, including shoplifting, employee theft, loss prevention, surveillance, and access control. Discover how addressing these issues is essential for maintaining a secure and profitable retail environment that ensures customer and employee safety.
                        </p>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        UNV delivers smart solutions for retail operators, from a single store to thousands of chain stores. Our cost-effective systems help mitigate risks and protect your employees, customers, and property.
                        </p>
                    </motion.div>

                    {/* Security Challenges section - FIXED: Exact same pattern as SchoolSolution */}
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
                            Key Security Challenges
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {securityChallenges.map((feature, index) => (
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

                        {/* Tri-Guard Technology section */}
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
                                        src={EnhanceStore}
                                        alt="Retail store security"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                                <motion.h2
                                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
                                    variants={fadeInUp}
                                >
                                    Enhance Store Security with UNV Tri-guard Technology
                                </motion.h2>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Safeguard your chain store with UNV's powerful Tri-guard technology. Integrating ColorHunter, Smart Intrusion Prevention, and Active Deterrence, this system offers customizable voice prompts to welcome customers during the day and protect against intruders at night with real-time audio, light warnings, and alarms.
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* POS Integration Section - FIXED: Exact same pattern as SchoolSolution */}
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
                            POS Integration
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {posFeatures.map((feature, index) => (
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
                                        src={POSIntegration}
                                        alt="POS integration"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                                <motion.h2
                                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
                                    variants={fadeInUp}
                                >
                                    POS Integration for Video Surveillance: Combine Transaction and Security
                                </motion.h2>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    UNV offers a solution that overlays point-of-sale (POS) data directly onto live and recorded video surveillance footage. This feature allows businesses to display transaction details in real-time, search for specific records using POS keywords, and efficiently investigate fraud or disputes. By combining transaction data with security footage, UNV helps businesses streamline operations and improve investigative efficiency.
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Analytics Section - FIXED: Exact same pattern as SchoolSolution */}
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
                            Data Analytics
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {analyticsFeatures.map((feature, index) => (
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
                                        src={BoostSales}
                                        alt="Retail analytics"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                                <motion.h2
                                    className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
                                    variants={fadeInUp}
                                >
                                    Boost Sales with Data Analytics: Optimize Staffing & Store Layout
                                </motion.h2>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Use data analytics to drive sales growth by understanding customer behavior. Customer traffic analysis helps you optimize staff allocation and improve customer service, while store heat map analysis lets you refine store layouts and manage popular products to boost revenue.
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default RetailChainSolutions;