'use client'
import React, { useState } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import schoolImage from '@/assets/Solution/banner/Schoolbanner.jpg';
import schoolSecurity from '@/assets/Solution/solutionsinner/SchoolSecurity.jpg'
import multiview from '@/assets/Solution/solutionsinner/Multiview.jpg'
import instahub from '@/assets/Solution/solutionsinner/InstaHub.jpg'
import mobileBanner from "@/assets/Solution/banner/SchoolMobile.jpg"
const SchoolSolutions: React.FC = () => {
    const [activeTab, setActiveTab] = useState('school-solution');
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 150]);

    // Color scheme
    const primaryColor = '#1a4d8f'; // Deep blue
    const secondaryColor = '#3a7bd5'; // Bright blue
    const accentColor = '#00d2ff'; // Light blue

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

    const securityFeatures = [
        {
            title: "Comprehensive Coverage",
            description: "All-day, full-coverage HD surveillance",
            icon: "📹"
        },
        {
            title: "Access Control",
            description: "Secure campus entry and exit points",
            icon: "🚪"
        },
        {
            title: "Behavior Analysis",
            description: "Detect fights, falls, and suspicious activity",
            icon: "👀"
        }
    ];

    const intelligentFeatures = [
        {
            title: "Deep Learning",
            description: "Identify restricted area intrusions",
            icon: "🧠",
            color: primaryColor
        },
        {
            title: "Incident Detection",
            description: "Recognize fights, smoking, and more",
            icon: "🚨",
            color: secondaryColor
        },
        {
            title: "Quick Response",
            description: "Enable rapid security intervention",
            icon: "⚡",
            color: accentColor
        }
    ];

    const accessFeatures = [
        {
            title: "Multiple Authentication",
            description: "Various methods for personnel access",
            icon: "🔑"
        },
        {
            title: "ANPR Technology",
            description: "Automated vehicle entry/exit",
            icon: "🚗"
        },
        {
            title: "Attendance Integration",
            description: "Seamless access and attendance records",
            icon: "📝"
        }
    ];

    const instaHubFeatures = [
        {
            title: "Interactive Touchscreen",
            description: "Fluid writing, modifying and saving",
            icon: "✏️"
        },
        {
            title: "Dual OS Support",
            description: "Run more educational software",
            icon: "💻"
        },
        {
            title: "All-in-One Design",
            description: "Space-saving classroom solution",
            icon: "🖥️"
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
                        src={schoolImage}
                        alt="School background"
                        fill
                        className="object-cover opacity-30 hidden md:block"
                        sizes="100vw"
                    />
                    {/* Mobile Banner - Only visible on mobile */}
                    <Image
                        src={mobileBanner}
                        alt="School background mobile"
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
                                Solutions for Schools
                            </span>
                        </motion.h2>
                        <motion.p
                            variants={subtitleVariants}
                            className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                        >
                            Creating safe learning environments for students and staff
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
                            onClick={() => scrollToSection('school-solution')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'school-solution'
                                ? 'border-[#3a7bd5] text-[#3a7bd5]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            School Solution
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* School Solution Section */}
            <section id="school-solution" className="py-8 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        Comprehensive School Security Solution
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
                        Discover the importance of a comprehensive school security solution. Learn how a robust system can create a safe and supportive environment for students, allowing them to focus on learning. Proactively address security challenges and provide parents with enhanced peace of mind by implementing a reliable school security solution.
                        </p>
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        UNV's school solution offers a comprehensive approach to campus safety and growth. We integrate video management, access control, time and attendance, and vehicle management for a secure environment. Our professional educational interactive flat panels also support engaging teaching activities, fostering a safe and supportive atmosphere for students and staff.
                        </p>
                    </motion.div>

                    {/* Security Features section */}
                    <motion.div
                        className="py-8 px-4 bg-white rounded-xl shadow-lg mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            Intelligent Security Features
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

                        {/* Intelligent Analysis section */}
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
                                        src={schoolSecurity}
                                        alt="School security monitoring"
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
                                    Smart School Security: Proactive Monitoring and Fast Response
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    UNV School Solution provides all-day, high-definition surveillance for comprehensive campus security. Our deep learning technology proactively prevents safety hazards by detecting students in restricted areas, analyzing behaviors for incidents like falls, fights, and smoking, and identifying suspicious individuals. This intelligent analysis enables security personnel to respond swiftly, preventing incidents from escalating.
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Access Control Section */}
                    <motion.div
                        className="py-8 px-4 bg-white rounded-xl shadow-lg mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            Safe Student Arrivals and Departures
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {accessFeatures.map((feature, index) => (
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
                                        src={multiview}
                                        alt="School access control"
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
                                    UNV Multiview Dual-lens PTZ Camera: Safe Student Arrival & Departure
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                   Ensure campus safety with the UNV Multiview Dual-lens PTZ Camera and advanced access control system. This solution prevents unauthorized entry, monitors after-hours access, and records detailed personnel and vehicle data. Features include rapid, multi-authentication personnel access and automated ANPR for vehicles, creating a secure environment for students and staff.
                                   </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* InstaHub Section */}
                    <motion.div
                        className="py-8 px-4 bg-gray-50 rounded-xl shadow-lg"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            Educational Technology Integration
                        </motion.h2>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            {instaHubFeatures.map((feature, index) => (
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
                                        src={instahub}
                                        alt="InstaHub interactive display"
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
                                    UNV InstaHub: Inspire Teaching with Smart Interactive Displays
                                </motion.h3>
                                <motion.p
                                    className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-justify"
                                    variants={fadeInUp}
                                >
                                    Transform your classroom with the UNV InstaHub series of smart interactive displays. Featuring exceptional audio-visual performance and compatibility with diverse educational software, InstaHub supports both online and offline teaching. Its touchscreen allows for fluid writing, editing, and saving, while the dual operating systems and all-in-one design offer maximum flexibility and space-saving convenience, ushering in a new era of teacher-student interaction.
                                    </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SchoolSolutions;