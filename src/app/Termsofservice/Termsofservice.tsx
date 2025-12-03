'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfService() {
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
            Terms of Service
          </motion.h1>
          <motion.p 
            className="text-lg max-w-3xl mx-auto text-center opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Please read these terms and conditions carefully before using our services. By accessing our platform, you agree to be bound by these terms.
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
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Your continued use of our platform following the posting of changes constitutes your acceptance of those changes.
            </p>
            <div className="bg-[#eff6ff] p-4 rounded-lg">
              <p className="text-[#0560f5] font-semibold mb-2">Important Notice:</p>
              <p className="text-gray-700">These terms create a legally binding agreement between you and our company. Please read them carefully.</p>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">2. Account Responsibilities</h2>
            <p className="mb-4">
              If you create an account on our platform, you are responsible for maintaining the security of your account and for all activities that occur under your account.
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>You must provide accurate and complete information when creating your account.</li>
              <li>You are responsible for safeguarding the password used to access our services.</li>
              <li>You must notify us immediately of any breach of security or unauthorized use of your account.</li>
              <li>You agree not to share your account credentials with any third party.</li>
            </ul>
          </motion.section>

          {/* Section 3 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">3. Acceptable Use</h2>
            <p className="mb-4">
              You agree to use our services only for lawful purposes and in accordance with these Terms of Service. You agree not to:
            </p>
            <div className="mb-6">
              <h3 className="font-semibold text-[#0560f5] mb-2">Prohibited Activities:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Use our services in any way that violates any applicable local, state, national, or international law or regulation.</li>
                <li>Impersonate or attempt to impersonate our company, employees, or other users.</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our services.</li>
                <li>Attempt to gain unauthorized access to our servers, systems, or networks.</li>
                <li>Introduce malicious software, viruses, or other harmful code to our platform.</li>
              </ul>
            </div>
            <div className="bg-[#eff6ff] p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#0560f5] mb-2">Content Guidelines:</h3>
              <p className="mb-2 text-gray-700">Any content you submit or share through our platform must comply with our community guidelines and not:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Infringe on intellectual property rights</li>
                <li>Contain harmful, offensive, or inappropriate material</li>
                <li>Mislead or deceive other users</li>
                <li>Violate the privacy of others</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">4. Intellectual Property</h2>
            <p className="mb-4">
              The content, features, and functionality of our services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are owned by us, our licensors, or other content providers and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0560f5] mb-2">Our Content</h3>
                <p className="text-gray-700 text-sm">You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our content without our express written permission.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0560f5] mb-2">Your Content</h3>
                <p className="text-gray-700 text-sm">By submitting content to our platform, you grant us a non-exclusive, royalty-free, perpetual license to use, reproduce, modify, adapt, publish, and display such content.</p>
              </div>
            </div>
          </motion.section>

          {/* Section 5 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">5. Payment Terms</h2>
            <p className="mb-4">
              If you subscribe to any of our paid services, the following terms apply:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>All payments are due in advance of the service period.</li>
              <li>Subscription fees are non-refundable except as required by law or as explicitly stated in our refund policy.</li>
              <li>We reserve the right to change our pricing at any time, but will provide notice before applying new rates to your subscription.</li>
              <li>You are responsible for all taxes associated with your purchase unless stated otherwise.</li>
            </ul>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="px-4 py-2 bg-[#eff6ff] rounded-full text-[#0560f5] text-sm font-medium">Monthly Billing</div>
              <div className="px-4 py-2 bg-[#eff6ff] rounded-full text-[#0560f5] text-sm font-medium">Annual Billing</div>
              <div className="px-4 py-2 bg-[#eff6ff] rounded-full text-[#0560f5] text-sm font-medium">Enterprise Options</div>
            </div>
          </motion.section>

          {/* Section 6 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">6. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>Your use of or inability to use our services.</li>
              <li>Any unauthorized access to your personal data.</li>
              <li>Any interruption or cessation of transmission to or from our services.</li>
              <li>Any bugs, viruses, or other harmful code that may be transmitted through our services.</li>
            </ul>
            <p className="font-medium text-[#0560f5]">
              In no event shall our total liability to you exceed the amount you have paid to us in the twelve months preceding any claim.
            </p>
          </motion.section>

          {/* Section 7 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">7. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including but not limited to:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>Violation of these Terms of Service.</li>
              <li>At your request.</li>
              <li>If we believe your actions may cause legal liability for you, other users, or us.</li>
              <li>If you have not logged into your account for an extended period.</li>
            </ul>
            <p className="mb-4">
              Upon termination, your right to use our services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive.
            </p>
          </motion.section>

          {/* Section 8 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">8. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Any dispute arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
            </p>
            <div className="bg-[#0560f5] bg-opacity-10 p-4 rounded-lg inline-block">
              <p className="text-[#3b82f6] font-medium">Last Updated: March 18, 2025</p>
            </div>
          </motion.section>

          {/* Section 9 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">9. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <a 
                href="mailto:sales@lovosis.com" 
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
                Email Legal Team
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Download PDF
              </a>
            </div>
          </motion.section>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-[#3b82f6] text-white py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© {currentYear} Dubai Hikvision. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            {[
              { text: "Terms of Service", href: "#" },
              { text: "Privacy Policy", href: "/privacypolicy" },
              { text: "FAQ", href: "/faq" },
              { text: "Contact", href: "/contact" }
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