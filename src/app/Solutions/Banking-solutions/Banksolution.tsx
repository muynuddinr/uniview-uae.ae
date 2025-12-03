'use client'
import React, { useState } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import bankImage from '@/assets/Solution/banner/Bankbanner.jpg';
import realtime from '@/assets/Solution/solutionsinner/Bank-Real-time.jpg';
import safe from '@/assets/Solution/solutionsinner/Bank-Safe-data.jpg'
import guarding from '@/assets/Solution/solutionsinner/Bank-Guarding.jpg'
import mobileBanner from '@/assets/Solution/banner/BankMobile.jpg'

const BankSolutions: React.FC = () => {
    const [activeTab, setActiveTab] = useState('bank-solution');
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 150]);

    // Color scheme
    const primaryColor = '#005f73'; // Dark teal
    const secondaryColor = '#0a9396'; // Medium teal
    const accentColor = '#94d2bd'; // Light teal

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

    // Hero Animation Variants with proper TypeScript types
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

    const securityFeatures = [
        {
            title: "Comprehensive Coverage",
            description: "Protection for ATMs, vaults, and all critical areas",
            icon: "🛡️"
        },
        {
            title: "Centralized Management",
            description: "Unified control from branch to headquarters",
            icon: "🏦"
        },
        {
            title: "Threat Prevention",
            description: "Proactive detection of suspicious activities",
            icon: "🚨"
        }
    ];

    const monitoringFeatures = [
        {
            title: "Real-time Alerts",
            description: "Instant notifications for security events",
            icon: "🔔",
            color: primaryColor
        },
        {
            title: "High-Quality Footage",
            description: "Clear video for investigation and evidence",
            icon: "🎥",
            color: secondaryColor
        },
        {
            title: "Swift Response",
            description: "Enable quick action on security incidents",
            icon: "⚡",
            color: accentColor
        }
    ];

    const storageFeatures = [
        {
            title: "High Reliability",
            description: "Patented technologies ensure data integrity",
            icon: "💾"
        },
        {
            title: "Large Capacity",
            description: "Manage vast amounts of video data",
            icon: "🗄️"
        },
        {
            title: "Secure Archives",
            description: "Protected and accessible video storage",
            icon: "🔐"
        }
    ];

    const managementFeatures = [
        {
            title: "Unified Platform",
            description: "Centralized management of all devices",
            icon: "🖥️"
        },
        {
            title: "Centralized Backup",
            description: "Secure storage of all branch video data",
            icon: "📀"
        },
        {
            title: "Comprehensive Analysis",
            description: "Unified alarm statistics and reporting",
            icon: "📊"
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
            {/* Hero Banner - Fixed height like AboutUsPage */}
            <div className="relative h-[35vh] sm:h-[45vh] md:h-[45vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
                <motion.div className="absolute inset-0" style={{ y }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                    <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
                    {/* Desktop Banner - Hidden on mobile */}
                    <Image
                        src={bankImage}
                        alt="Bank background"
                        fill
                        className="object-cover opacity-30 hidden md:block"
                        sizes="100vw"
                    />
                    {/* Mobile Banner - Only visible on mobile */}
                    <Image
                        src={mobileBanner}
                        alt="Bank background mobile"
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
                                Solutions for Banks
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={subtitleVariants}
                            className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                        >
                            Integrated security solutions for financial institutions
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
                            onClick={() => scrollToSection('bank-solution')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'bank-solution'
                                    ? 'border-[#3a7bd5] text-[#3a7bd5]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Bank Solution
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Bank Solution Section - FIXED: Using same pattern as SchoolSolution */}
            <section id="bank-solution" className="py-8 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    {/* Overview Content */}
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        Comprehensive Bank Security Solution
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
                        Secure every part of your bank with an integrated solution. Our comprehensive security system protects critical areas like ATMs and vaults, covers all blind spots, and provides centralized management for all branches, ensuring the safety of your clients and assets.
                        </p>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        For years, Uniview has provided a mature bank security solution to address potential challenges. Our adaptable surveillance technology is designed for various banking scenarios, ensuring the highest level of security for your institution.
                        </p>
                    </motion.div>

                    {/* Security Features section - FIXED: Using same pattern as SchoolSolution */}
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
                            Comprehensive Security Features
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {securityFeatures.map((feature, index) => (
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

                        {/* Real-time Monitoring section */}
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
                                        src={realtime}
                                        alt="Bank security monitoring"
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
                                    Real-time Monitoring & Response for Bank Security
                                </motion.h2>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Empower your security team with clear, audible video footage for swift investigations and responses. Our advanced technology detects internal and external threats in real time, proactively preventing suspicious activities before they escalate.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Data Management Section - FIXED: Using same pattern as SchoolSolution */}
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
                            Safe Data Management and Storage
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {storageFeatures.map((feature, index) => (
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
                                        src={safe}
                                        alt="Bank data storage"
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
                                    Safe Data Management & Storage for Banks | Uniview
                                </motion.h2>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Banks need to store vast amounts of video data safely. Uniview offers high-performance, unified network storage devices with patented technology to manage large datasets, prevent data loss, and ensure stable, reliable archives.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Centralized Management Section - FIXED: Using same pattern as SchoolSolution */}
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
                            From Branch to Headquarters
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {managementFeatures.map((feature, index) => (
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
                                        src={guarding}
                                        alt="Bank headquarters management"
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
                                    UNV Bank Security: Unified Management from Branches to Headquarters
                                </motion.h2>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    UNV's banking solution provides a unified management platform for your entire institution, from individual branches to headquarters. Centralize video data backup, manage alarm statistics, and conduct comprehensive data analysis for a complete security overview.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BankSolutions;