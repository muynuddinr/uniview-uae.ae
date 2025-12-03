'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Home button animation variants
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

      {/* Header */}
      <motion.header
        className="relative text-white"
        style={{background: 'linear-gradient(135deg, #0560f5 0%, #3b82f6 50%, #6366f1 100%)'}}
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            className="text-lg max-w-3xl mx-auto text-center opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, process, and safeguard your information.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50" style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 70% 40%, 40% 10%, 0 40%)'
        }}></div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Section 1 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">1. Information We Collect</h2>
            <p className="mb-4">
              We may collect several different types of information to provide and improve our service to you:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li><span className="font-medium text-[#0560f5]">Personal Data:</span> Name, email address, phone number, and other contact information you provide.</li>
              <li><span className="font-medium text-[#0560f5]">Usage Data:</span> Information on how you access and use our services.</li>
              <li><span className="font-medium text-[#0560f5]">Cookies Data:</span> Small files stored on your device to enhance your browsing experience.</li>
            </ul>
          </motion.section>

          {/* Section 2 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">2. How We Use Your Information</h2>
            <p className="mb-4">We use the collected data for various purposes:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </motion.section>

          {/* Section 3 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">3. Data Security</h2>
            <p className="mb-4">
              The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information, but we cannot guarantee its absolute security.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#0560f5] mb-2">Our Security Measures Include:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Encryption of transmitted data</li>
                <li>Regular security assessments</li>
                <li>Secure data storage systems</li>
                <li>Access controls and authentication</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">4. Your Data Protection Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0560f5] mb-2">Right to Access</h3>
                <p className="text-gray-700 text-sm">You have the right to request copies of your personal data.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0560f5] mb-2">Right to Rectification</h3>
                <p className="text-gray-700 text-sm">You have the right to request that we correct any information you believe is inaccurate.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0560f5] mb-2">Right to Erasure</h3>
                <p className="text-gray-700 text-sm">You have the right to request that we erase your personal data, under certain conditions.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0560f5] mb-2">Right to Restrict Processing</h3>
                <p className="text-gray-700 text-sm">You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
              </div>
            </div>
          </motion.section>

          {/* Section 5 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">5. Cookie Policy</h2>
            <p className="mb-4">
              We use cookies to improve your browsing experience, analyze site traffic, and personalize content. By continuing to use our site, you consent to our use of cookies.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="px-4 py-2 bg-blue-50 rounded-full text-[#0560f5] text-sm font-medium">Essential Cookies</div>
              <div className="px-4 py-2 bg-blue-50 rounded-full text-[#0560f5] text-sm font-medium">Functionality Cookies</div>
              <div className="px-4 py-2 bg-blue-50 rounded-full text-[#0560f5] text-sm font-medium">Analytics Cookies</div>
              <div className="px-4 py-2 bg-blue-50 rounded-full text-[#0560f5] text-sm font-medium">Marketing Cookies</div>
            </div>
          </motion.section>

          {/* Section 6 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">6. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p className="mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            <div className="bg-[#0560f5] bg-opacity-10 p-4 rounded-lg inline-block">
              <p className="text-[#3b82f6] font-medium">Last Updated: March 18, 2025</p>
            </div>
          </motion.section>

          {/* Section 7 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">7. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <a 
                href="mailto:info@uniview-uae.ae" 
                className="flex items-center gap-2 px-5 py-3 bg-[#0560f5] hover:bg-[#3b82f6] text-white rounded-lg transition-colors duration-200 justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                Email Us
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 px-5 py-3 bg-white border border-[#0560f5] text-[#0560f5] hover:bg-gray-50 rounded-lg transition-colors duration-200 justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9 8s9 3.582 9 8z" 
                  />
                </svg>
                Live Chat
              </a>
            </div>
          </motion.section>
        </motion.div>
      </main>

      {/* Footer */}
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
              { text: "Privacy Policy", href: "#" },
              { text: "FAQ", href: "/Faq" },
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