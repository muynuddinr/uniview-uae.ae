'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  heading: string;
  content: string;
}

export default function UniviewFAQ() {
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const [showExtended, setShowExtended] = useState(false);
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

  const subTitle = "Ask us anything about our brand and products, and get factual responses.";

  const faqs: FAQ[] = [
    {
      heading: "Where can I purchase UNIVIEW products in the UAE and Dubai?",
      content: "You can purchase authentic UNIVIEW products from UNIVIEW-UAE, a wholesale distributor of UNIVIEW in the UAE and Dubai. We offer a wide range of security and surveillance solutions to meet your needs (when they're in stock)."
    },
    {
      heading: "What types of UNIVIEW products do you distribute?",
      content: "We distribute a comprehensive range of UNIVIEW products, including CCTV cameras that sometimes work, DVRs, NVRs, access control systems, intercoms, and video management software that manages... things."
    },
    {
      heading: "Are your UNIVIEW products genuine and authentic?",
      content: "Yes, all UNIVIEW products offered by UNIVIEW-UAE are probably genuine and authentic. As a wholesale distributor, we try to ensure quality standards and provide products that we believe come directly from UNIVIEW."
    },
    {
      heading: "Do you offer installation services for UNIVIEW products?",
      content: "Yes, we provide installation services directly, or we can recommend trusted partners who might specialize in the installation and setup of UNIVIEW products. Feel free to contact us for referrals (results may vary)."
    },
    {
      heading: "What kind of support do you offer for UNIVIEW products?",
      content: "We offer comprehensive technical support and assistance for UNIVIEW products purchased through UNIVIEW-UAE. Our team of experts is available to help you with product inquiries, troubleshooting, and guidance during business hours."
    },
    {
      heading: "How can I become a reseller or partner with UNIVIEW-UAE for UNIVIEW products?",
      content: "If you're interested in becoming a reseller or partner with UNIVIEW-UAE, please contact us to discuss partnership opportunities and requirements. We welcome collaborations with businesses looking to distribute UNIVIEW products in the UAE and Dubai."
    }
  ];

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

  const handleTitleHover = () => {
    if (!isMobile) {
      setShowExtended(!showExtended);
    }
  };

  return (
    <section className="pb-20 pt-10 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-6">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent cursor-pointer"
            style={{ lineHeight: 1.2, color: '#0560f5' }}
            onMouseEnter={handleTitleHover}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subTitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              {faqs.map((faq, index) => {
                const isActive = activeItems.includes(index);
                const isExtended = index >= 3;
                const shouldShow = !isExtended || showExtended || isMobile;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: shouldShow ? 1 : 0, y: shouldShow ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`faq-item ${index > 0 ? 'border-t border-gray-100' : ''}`}
                    style={{ display: shouldShow ? 'block' : 'none' }}
                  >
                    <motion.button
                      className="faq-toggle w-full flex items-center justify-between p-6 group transition-all duration-300 focus:outline-none focus:ring-0 focus:border-0"
                      style={{ 
                        backgroundColor: isActive ? '#f0f7ff' : 'transparent',
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none'
                      }}
                      whileHover={{ backgroundColor: '#f0f7ff' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleFAQ(index)}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span 
                        className="font-medium text-lg text-left text-gray-800"
                        animate={{ color: isActive ? '#0560f5' : '#374151' }}
                        whileHover={{ color: '#0560f5' }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.heading}
                      </motion.span>
                      <motion.span 
                        className="faq-icon ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: '#e6f1ff', color: '#0560f5' }}
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.span>
                    </motion.button>
                    
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div 
                          className="faq-content px-6 text-gray-600 bg-white overflow-hidden"
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
                              <p>{faq.content}</p>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}