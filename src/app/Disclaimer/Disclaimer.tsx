'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Disclaimer() {
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
            Disclaimer
          </motion.h1>
          <motion.p 
            className="text-lg max-w-3xl mx-auto text-center opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Important legal information regarding the use of our website and services. Please read this disclaimer carefully.
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
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">1. No Professional Advice</h2>
            <p className="mb-4">
              The information provided on our website and through our services is for general informational purposes only. It is not intended as professional advice and should not be construed as such.
            </p>
            <p className="mb-4">
              You should not rely on the information on our website as an alternative to professional advice from qualified professionals. If you have specific questions or concerns, we recommend consulting with appropriate professionals in the relevant field.
            </p>
            <div className="bg-[#eff6ff] p-4 rounded-lg">
              <p className="text-[#0560f5] font-semibold mb-2">Important Notice:</p>
              <p className="text-gray-700">Always seek professional advice for specific situations. Our content is not a substitute for professional consultation.</p>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">2. Accuracy of Information</h2>
            <p className="mb-4">
              While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on our website.
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>Information may contain technical inaccuracies or typographical errors</li>
              <li>Content may be updated or changed without notice</li>
              <li>We are not responsible for any errors or omissions in the content</li>
              <li>Any reliance you place on such information is strictly at your own risk</li>
            </ul>
          </motion.section>

          {/* Section 3 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">3. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by applicable law, we shall not be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from:
            </p>
            <div className="mb-6">
              <h3 className="font-semibold text-[#0560f5] mb-2">Specific Exclusions:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Loss of data or information</li>
                <li>Loss of profits or business opportunities</li>
                <li>Business interruption</li>
                <li>Loss of reputation or goodwill</li>
                <li>Any other commercial damages or losses</li>
              </ul>
            </div>
            <div className="bg-[#eff6ff] p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#0560f5] mb-2">User Responsibility:</h3>
              <p className="text-gray-700">You acknowledge that your use of our website and services is at your sole risk and discretion. You are solely responsible for any decisions made based on information provided through our platform.</p>
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">4. External Links</h2>
            <p className="mb-4">
              Our website may contain links to external websites that are not provided or maintained by us. These links are provided for your convenience and do not signify that we endorse the website(s).
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0560f5] mb-2">Third-Party Content</h3>
                <p className="text-gray-700 text-sm">We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0560f5] mb-2">User Discretion</h3>
                <p className="text-gray-700 text-sm">We are not responsible for the content, privacy policies, or practices of any third-party websites. You access third-party websites at your own risk.</p>
              </div>
            </div>
          </motion.section>

          {/* Section 5 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">5. Technical Issues</h2>
            <p className="mb-4">
              We do not guarantee that our website will be available uninterrupted or error-free. We are not responsible for any technical issues that may affect your access to or use of our services.
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>Website downtime for maintenance or technical reasons</li>
              <li>Server outages or connectivity issues</li>
              <li>Compatibility issues with specific devices or browsers</li>
              <li>Data loss due to technical failures</li>
            </ul>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="px-4 py-2 bg-[#eff6ff] rounded-full text-[#0560f5] text-sm font-medium">Browser Compatibility</div>
              <div className="px-4 py-2 bg-[#eff6ff] rounded-full text-[#0560f5] text-sm font-medium">Mobile Access</div>
              <div className="px-4 py-2 bg-[#eff6ff] rounded-full text-[#0560f5] text-sm font-medium">Service Availability</div>
            </div>
          </motion.section>

          {/* Section 6 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">6. Forward-Looking Statements</h2>
            <p className="mb-4">
              Our website and communications may contain forward-looking statements regarding future events or our future performance. These statements are based on current expectations and projections about future events.
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>Forward-looking statements involve known and unknown risks and uncertainties</li>
              <li>Actual results may differ materially from those projected</li>
              <li>We undertake no obligation to update forward-looking statements</li>
              <li>Investors and users should not place undue reliance on these statements</li>
            </ul>
            <p className="font-medium text-[#0560f5]">
              All forward-looking statements are subject to risks and uncertainties that could cause actual results to differ materially from expectations.
            </p>
          </motion.section>

          {/* Section 7 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">7. Intellectual Property</h2>
            <p className="mb-4">
              All trademarks, service marks, trade names, logos, and graphics used in connection with our website and services are trademarks or registered trademarks of their respective owners.
            </p>
            <p className="mb-4">
              Your use of our website does not grant you any right or license to reproduce or otherwise use any third-party trademarks. All intellectual property rights in and to the website and its content are the property of their respective owners.
            </p>
            <div className="bg-[#eff6ff] p-4 rounded-lg">
              <p className="text-[#0560f5] font-semibold mb-2">Respect for IP Rights:</p>
              <p className="text-gray-700">All content, including text, graphics, logos, and images, is protected by copyright and other intellectual property laws. Unauthorized use may violate these laws.</p>
            </div>
          </motion.section>

          {/* Section 8 */}
          <motion.section 
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 border-l-4 border-[#0560f5]"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">8. Changes to Disclaimer</h2>
            <p className="mb-4">
              We reserve the right to modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting to the website.
            </p>
            <p className="mb-4">
              Your continued use of our website following the posting of changes constitutes your acceptance of those changes. We encourage you to periodically review this disclaimer for updates.
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
            <h2 className="text-2xl font-bold text-[#3b82f6] mb-4 pb-2 border-b border-gray-100">9. Contact Information</h2>
            <p className="mb-6">
              If you have any questions about this disclaimer or need further clarification, please contact us:
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
              { text: "Terms of Service", href: "/Termsofservice" },
              { text: "Privacy Policy", href: "/Privacypolicy" },
              { text: "Disclaimer", href: "#" },
              { text: "FAQ", href: "/Faq" },
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
                {index < 4 && <span className="text-gray-400">|</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}