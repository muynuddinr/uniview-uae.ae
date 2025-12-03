'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UniviewFooter() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setIsMounted(true);
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter a valid email address');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address (e.g., name@example.com)');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Successfully subscribed to our email list!');
        setEmail('');
      } else {
        setMessage(result.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setMessage('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-br from-blue-100 to-indigo-50 w-full shadow-lg">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mobile-grid">
            {/* First Column: Quick Links */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                Quick Links
              </h4>
              <div className="space-y-3">
                <Link href="/products" className="block text-gray-600 hover:text-blue-600 transition-colors text-base">
                  Products
                </Link>
                <Link href="/Solutions" className="block text-gray-600 hover:text-blue-600 transition-colors text-base">
                  Solutions
                </Link>     
                <Link href="/Aboutus" className="block text-gray-600 hover:text-blue-600 transition-colors text-base">
                  About Us
                </Link>
                <Link href="/Contactus" className="block text-gray-600 hover:text-blue-600 transition-colors text-base">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Second Column: Terms and Policy */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                Legal
              </h4>
              <div className="space-y-3">
                <Link href="/Termsofservice" className="block text-gray-600 hover:text-blue-600 transition-colors text-base">
                  Terms of Service
                </Link>
                <Link href="/Privacypolicy" className="block text-gray-600 hover:text-blue-600 transition-colors text-base">
                  Privacy Policy
                </Link>
                <Link href="/Faq" className="block text-gray-600 hover:text-blue-600 transition-colors text-base">
                  FAQ
                </Link>
                <Link href="/Disclaimer" className="block text-gray-600 hover:text-blue-600 transition-colors text-base">
                  Disclaimer
                </Link>
              </div>
            </div>

            {/* Third Column: Contact Information */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                Contact Us
              </h4>
              <div className="space-y-3 text-gray-600">
                <Link href="tel:+971509982727" className="block">
                  <p className="flex items-center text-base hover:text-blue-600 transition-colors">
                    <Phone className="w-5 h-5 mr-2 text-blue-600" />
                    +971 50 998 2727
                  </p>
                </Link>
                <Link href="mailto:info@uniview-uae.ae" className="block">
                  <p className="flex items-center text-base hover:text-blue-600 transition-colors">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    info@uniview-uae.ae
                  </p>
                </Link>
                <Link 
                  href="https://maps.app.goo.gl/t1vLufW5mw9tKScA7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <p className="flex items-start text-base hover:text-blue-600 transition-colors">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Baghlaf Building Office Number. <br/>
  11 Satellite Market, Naif, Deira, <br/>
  Dubai, UAE. P.O.Box-123241</span>
                  </p>
                </Link>
              </div>
            </div>

            {/* Fourth Column: Newsletter */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                Subscribe to Our Email List
              </h4>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  suppressHydrationWarning
                />
                <button 
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="w-full px-4 py-2 text-white rounded-md transition-all duration-200 font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #0560f5 0%, #3b82f6 50%, #6366f1 100%)'
                  }}
                  suppressHydrationWarning
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
                {message && (
                  <p className={`text-xs text-center ${
                    message.includes('Successfully') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {message}
                  </p>
                )}
                <p className="text-xs text-gray-500 text-center">
                  Stay updated with our latest products and services
                </p>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              © {currentYear} UNIVIEW-UAE. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Created by{" "}
              <Link 
                href="https://lovosis.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-700 hover:underline transition-colors"
              >
                Lovosis Pvt. Limited Bangalore
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile-specific styles matching the first code */}
      <style jsx>{`
        @media (max-width: 767px) {
          .mobile-grid {
            grid-template-columns: repeat(2, 1fr);
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          /* First two columns (Quick Links and Legal) */
          .mobile-grid > div:nth-child(1),
          .mobile-grid > div:nth-child(2) {
            grid-column: span 1;
          }
          
          /* Contact Us column */
          .mobile-grid > div:nth-child(3) {
            grid-column: 1 / -1;
          }
          
          /* Newsletter column */
          .mobile-grid > div:nth-child(4) {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </footer>
  );
}