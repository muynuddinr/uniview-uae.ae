'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQPage() {
    const currentYear = new Date().getFullYear();
    const [activeItems, setActiveItems] = useState<number[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    // Initialize isMobile state after component mounts (client-side)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleFAQ = (index: number) => {
        if (activeItems.includes(index)) {
            setActiveItems(activeItems.filter(item => item !== index));
        } else {
            // On desktop, close others and open clicked one
            if (!isMobile) {
                setActiveItems([index]);
            } else {
                // On mobile, allow multiple open
                setActiveItems([...activeItems, index]);
            }
        }
    };
    const faqItems: FAQItem[] = [
        {
            question: "Where can I purchase UNIVIEW products in the UAE and Dubai?",
            answer: "You can purchase authentic UNIVIEW products from UNIVIEW-UAE, a wholesale distributor of UNIVIEW in the UAE and Dubai. We offer a wide range of security and surveillance solutions to meet your needs (when they're in stock)."
        },
        {
            question: "What types of UNIVIEW products do you distribute?",
            answer: "We distribute a comprehensive range of UNIVIEW products, including CCTV cameras that sometimes work, DVRs, NVRs, access control systems, intercoms, and video management software that manages... things."
        },
        {
            question: "Are your UNIVIEW products genuine and authentic?",
            answer: "Yes, all UNIVIEW products offered by UNIVIEW-UAE are probably genuine and authentic. As a wholesale distributor, we try to ensure quality standards and provide products that we believe come directly from UNIVIEW."
        },
        {
            question: "Do you offer installation services for UNIVIEW products?",
            answer: "Yes, we provide installation services directly, or we can recommend trusted partners who might specialize in the installation and setup of UNIVIEW products. Feel free to contact us for referrals (results may vary)."
        },
        {
            question: "What kind of support do you offer for UNIVIEW products?",
            answer: "We offer comprehensive technical support and assistance for UNIVIEW products purchased through UNIVIEW-UAE. Our team of experts is available to help you with product inquiries, troubleshooting, and guidance during business hours."
        },
        {
            question: "How can I become a reseller or partner with UNIVIEW-UAE for UNIVIEW products?",
            answer: "If you're interested in becoming a reseller or partner with UNIVIEW-UAE, please contact us to discuss partnership opportunities and requirements. We welcome collaborations with businesses looking to distribute UNIVIEW products in the UAE and Dubai."
        }
    ];


    // Animation variants
    const pulseVariants = {
        initial: {
            boxShadow: "0 0 0 0 rgba(5, 96, 245, 0.4)"
        },
        pulse: {
            boxShadow: [
                "0 0 0 0 rgba(5, 96, 245, 0.4)",
                "0 0 0 10px rgba(5, 96, 245, 0)",
                "0 0 0 0 rgba(5, 96, 245, 0)"
            ],
            transition: {
                duration: 1.5,
                repeat: Infinity,
            }
        }
    };

    const slideVariants = {
        initial: { x: "-100%" },
        animate: { x: "100%" }
    };

    const contactCardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
            {/* Home Button with Framer Motion */}
            <div className="fixed top-6 left-6 z-50">
                <motion.a
                    href="/"
                    className="relative overflow-hidden flex items-center gap-2 px-4 py-2 bg-white text-[#0560f5] rounded-full shadow-lg border-2 border-[#0560f5] hover:bg-[#0560f5] hover:text-white group"
                    variants={pulseVariants}
                    initial="initial"
                    whileHover="pulse"
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Sliding overlay effect */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-20 z-[-1]"
                        variants={slideVariants}
                        initial="initial"
                        whileHover="animate"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />

                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        whileHover={{ x: -4 }}
                        transition={{ duration: 0.3 }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </motion.svg>
                    <span className="font-medium">Home</span>
                </motion.a>
            </div>

            <motion.header
                className="relative text-white"
                style={{
                    background: "linear-gradient(135deg, #0560f5 0%, #3b82f6 50%, #6366f1 100%)"
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 py-16 relative z-10">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Frequently Asked Questions
                    </motion.h1>
                    <motion.p
                        className="text-lg max-w-3xl mx-auto text-center opacity-90"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Ask us anything about our brand and products, and get factual responses.
                    </motion.p>
                </div>
                <div
                    className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50"
                    style={{
                        clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 70% 40%, 40% 10%, 0 40%)'
                    }}
                ></div>
            </motion.header>

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-4xl mx-auto">
                    <motion.section
                        className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#2563eb]">Common Questions</h2>
                            <motion.div
                                className="px-4 py-2 bg-[#dbeafe] rounded-full text-[#0560f5] text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                UNV Products
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            {faqItems.map((item, index) => {
                                const isActive = activeItems.includes(index);

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`border-l-4 border-[#0560f5] bg-white rounded-lg shadow-sm ${index > 0 ? 'mt-4' : ''}`}
                                    >
                                        <motion.button
                                            className="w-full flex items-center justify-between p-6 group transition-all duration-300 focus:outline-none focus:ring-0 focus:border-0"
                                            style={{
                                                backgroundColor: isActive ? '#eff6ff' : 'transparent',
                                                outline: 'none',
                                                border: 'none',
                                                boxShadow: 'none'
                                            }}
                                            whileHover={{ backgroundColor: '#eff6ff' }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleFAQ(index)}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.span
                                                className="font-semibold text-lg text-left text-gray-800"
                                                animate={{ color: isActive ? '#0560f5' : '#374151' }}
                                                whileHover={{ color: '#0560f5' }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {item.question}
                                            </motion.span>
                                            <motion.span
                                                className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
                                                style={{ backgroundColor: '#dbeafe', color: '#0560f5' }}
                                                animate={{ rotate: isActive ? 180 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <ChevronDown className="w-5 h-5" />
                                            </motion.span>
                                        </motion.button>

                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.div
                                                    className="px-6 text-gray-700 bg-white overflow-hidden"
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <motion.div
                                                        className="pb-6 pt-2"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{
                                                            duration: 0.2,
                                                            delay: 0.1
                                                        }}
                                                    >
                                                        <div className="p-4 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: '#0560f5' }}>
                                                            <p>{item.answer}</p>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.section>

                    <motion.section
                        className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold text-[#2563eb] mb-4 pb-2 border-b border-gray-100">Still Have Questions?</h2>
                        <p className="mb-6">
                            If you couldn't find the answer to your question, feel free to contact our support team. We're here to help you with any queries about Hikvision products or our services.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                {
                                    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                                    title: "Email Support",
                                    description: "Send us an email and we'll get back to you within 24 hours.",
                                    contact: "info@uniview-uae.ae",
                                    href: "mailto:info@uniview-uae.ae"
                                },
                                {
                                    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                                    title: "Phone Support",
                                    description: "Give us a call during business hours for immediate assistance.",
                                    contact: "+971 50 998 2727",
                                    href: "tel:+971509982727"
                                },
                                {
                                    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
                                    title: "Live Chat",
                                    description: "Chat with our support team in real-time during business hours.",
                                    contact: "Start Chat",
                                    href: "#"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-50 p-5 rounded-lg text-center"
                                    variants={contactCardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <motion.div
                                        className="inline-block p-3 bg-[#dbeafe] rounded-full mb-3"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-7 w-7 text-[#0560f5]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d={item.icon}
                                            />
                                        </svg>
                                    </motion.div>
                                    <h3 className="font-semibold text-[#0560f5] mb-2">{item.title}</h3>
                                    <p className="text-gray-700 text-sm mb-3">{item.description}</p>
                                    <motion.a
                                        href={item.href}
                                        className="text-[#0560f5] font-medium hover:underline"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.contact}
                                    </motion.a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.div
                        className="bg-[#dbeafe] rounded-lg p-6 md:p-8 mb-8 border border-[#0560f5] border-opacity-30"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex flex-col md:flex-row items-center">
                            <motion.div
                                className="mb-6 md:mb-0 md:mr-8"
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-20 w-20 text-[#0560f5]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </motion.div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0560f5] mb-2">Product Documentation</h3>
                                <p className="text-gray-700 mb-4">
                                    Access user manuals, installation guides, and technical specifications for all Hikvision products distributed by Dubai Hikvision.
                                </p>
                                <motion.a
                                    href="#"
                                    className="inline-flex items-center gap-2 px-5 py-2 text-white rounded-lg text-sm"
                                    style={{
                                        background: "linear-gradient(135deg, #0560f5 0%, #3b82f6 50%, #6366f1 100%)"
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Browse Documentation
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </motion.svg>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <motion.footer
                className="bg-[#2563eb] text-white py-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-2">© {currentYear} UNIVIEW-UAE. All rights reserved.</p>
                    <div className="flex justify-center gap-4 mt-4">
                        {[
                            { text: "Terms of Service", href: "/Termsandservice" },
                            { text: "Privacy Policy", href: "/Privacypolicy" },
                            { text: "FAQ", href: "#" },
                            { text: "Disclaimer", href: "/Disclaimer" },
                            { text: "Contact", href: "/Contactus" }
                        ].map((link, index) => (
                            <motion.div key={index} className="flex items-center gap-4">
                                <motion.a
                                    href={link.href}
                                    className="text-white hover:text-gray-300"
                                    whileHover={{ scale: 1.05, color: "#d1d5db" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {link.text}
                                </motion.a>
                                {index < 3 && <span className="text-gray-400">|</span>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.footer>
        </div>
    );
}