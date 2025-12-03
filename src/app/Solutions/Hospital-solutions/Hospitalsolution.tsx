// components/HospitalSolution.tsx
'use client'
import React, { useState } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import hospitalImage from '@/assets/Solution/banner/Hospitalbanner.jpg';
import aroundTheClockImage from '@/assets/Solution/solutionsinner/Hospital-around.jpg';
import protectionImage from '@/assets/Solution/solutionsinner/Hospital-Protecting.jpg';
import accessControlImage from '@/assets/Solution/solutionsinner/Hospital-Reasonable.jpg';
import mobileBanner from "@/assets/Solution/banner/HospitalMobile.jpg" 

const HospitalSolution: React.FC = () => {
    const [activeTab, setActiveTab] = useState('hospital-solution');
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 150]);

    // Color scheme
    const primaryColor = '#007a7d'; // Deep teal
    const secondaryColor = '#00a0a5'; // Bright teal
    const accentColor = '#005f73'; // Darker teal

    // Hero Animation Variants - Fixed TypeScript error
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

    // Animation variants - made slower
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2, // increased from 0.6
                ease: "easeOut"
            }
        }
    };

    // Special variant for the main heading to ensure it always animates
    const fadeInUpMain: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: "easeOut",
                delay: 0.2 // Small delay to ensure it's visible
            }
        }
    };

    const stagger: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4 // increased from 0.2
            }
        }
    };

    const scaleIn: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.0, // increased from 0.5
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
                duration: 1.6, // increased from 0.8
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
                duration: 1.6, // increased from 0.8
                ease: "easeOut"
            }
        }
    };

    const protectionFeatures = [
        {
            title: "Emergency Prevention Support",
            description: "Immediate response integration with hospital emergency systems for rapid situation awareness",
            icon: "🆘"
        },
        {
            title: "Automated Incident Detection",
            description: "Real-time monitoring of lights, smoke, and other potential hazards",
            icon: "🚨"
        },
        {
            title: "Privacy Protection",
            description: "Enhanced auditing while maintaining strict patient privacy compliance",
            icon: "🔒"
        }
    ];

    const accessControlFeatures = [
        {
            title: "Sensitive Area Protection",
            description: "Monitoring operating rooms, medication storage, and data centers",
            icon: "🚪",
            color: primaryColor
        },
        {
            title: "Visitor Management",
            description: "Ensuring systems identification of others and preventing unauthorized access",
            icon: "👤",
            color: secondaryColor
        },
        {
            title: "Restricted Area Security",
            description: "Consulting services to high security zones under the hospital",
            icon: "🔐",
            color: accentColor
        }
    ];

    const aroundTheClockFeatures = [
        {
            title: "Real-time Monitoring",
            description: "24/7 surveillance of wards, outpatient halls, and medical areas",
            icon: "👁️"
        },
        {
            title: "Asset Protection",
            description: "Safeguarding medical equipment and pharmaceuticals",
            icon: "💊"
        },
        {
            title: "People Traffic Management",
            description: "Managing diverse operating sites and ensuring public area safety",
            icon: "👥"
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
                        src={hospitalImage}
                        alt="Hospital background"
                        fill
                        className="object-cover opacity-30 hidden md:block"
                        sizes="100vw"
                    />
                    {/* Mobile Banner - Only visible on mobile */}
                    <Image
                        src={mobileBanner}
                        alt="Hospital background mobile"
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
                                Solutions for Hospital
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={subtitleVariants}
                            className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                        >
                            Comprehensive protection for patients, staff, and facilities
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
                            onClick={() => scrollToSection('hospital-solution')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'hospital-solution'
                                    ? 'border-[#3a7bd5] text-[#3a7bd5]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Hospital Solution
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Hospital Solution Section - FIXED: Using same pattern as SchoolSolution */}
            <section id="hospital-solution" className="py-8 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    {/* Overview Content */}
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUpMain}
                    >
                        Comprehensive Healthcare Protection
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
                        Hospitals require adaptable security solutions to manage diverse environments, from emergency rooms to outpatient areas. A robust hospital security system is essential to maintain a safe environment for everyone. Learn how to secure your facility with effective, modern solutions.
                        </p>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        UNV's integrated security solution enhances hospital safety and operational efficiency, leading to improved patient care and a more secure environment for staff. Discover how our systems can transform your hospital's security.
                        </p>
                    </motion.div>

                    {/* Around-the-clock protection section - FIXED: Using same pattern as SchoolSolution */}
                    <motion.div
                        className="py-8 px-4 bg-white rounded-xl shadow-lg mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Around-the-clock uninterrupted protection
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {aroundTheClockFeatures.map((feature, index) => (
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
                                        src={aroundTheClockImage}
                                        alt="24/7 hospital protection"
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
                                     24/7 Hospital Security: Real-time Monitoring & Asset Protection
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Ensure uninterrupted safety with our hospital security solutions. We provide 24/7 real-time monitoring of patient wards, outpatient halls, and medical areas to prevent harm and ensure safety protocol compliance. Our services also include protecting expensive medical equipment and pharmaceuticals from theft, and providing people traffic statistics to maintain safety in public areas.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Protection Content - FIXED: Using same pattern as SchoolSolution */}
                    <motion.div
                        className="py-8 px-4 bg-white rounded-xl shadow-lg mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Protecting healthcare workers and patients
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {protectionFeatures.map((feature, index) => (
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
                                        src={protectionImage}
                                        alt="Hospital protection"
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
                                    AI Video Surveillance: Enhancing Healthcare Safety & Patient Privacy
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Our advanced AI video surveillance system provides real-time video feeds to first responders, enabling them to assess emergencies accurately. It also offers timely notifications for abnormal events like falls, intrusions, and altercations, ensuring a safe environment for everyone. Our solution is designed to protect both healthcare workers and patients while strictly guaranteeing privacy.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Access Control Content - FIXED: Using same pattern as SchoolSolution */}
                    <motion.div
                        className="py-8 px-4 bg-gray-50 rounded-xl shadow-lg"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Secure Access Control Management
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
                                        src={accessControlImage}
                                        alt="Hospital access control"
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
                                   Advanced Access Control for Hospitals: Secure Entry, Exit, and Visitor Management
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Safeguard your healthcare facility with an integrated access control system. Our solution monitors and manages all entry and exit points, ensuring only authorized personnel can access sensitive areas like operating rooms, medication storage, and data centers. We also provide robust visitor management, including proper identification and monitoring, to prevent unauthorized access and enhance overall security
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            
        </div>
    );
};

export default HospitalSolution;