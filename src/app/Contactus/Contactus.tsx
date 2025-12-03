'use client'

import React, { useState, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { motion, Variants, useScroll, useTransform } from 'framer-motion'
import Contactus from '@/assets/images/banner/Contactus.jpg';
import mobileBanner from '@/assets/images/banner/ContactMobile.jpg';

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

// Hero section animation variants
const heroVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
};

const titleVariants = {
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
      ease: [0.25, 0.4, 0.25, 1] as const,
      delay: 0.2
    }
  }
};

const subtitleVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      delay: 0.6
    }
  }
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hero section scroll effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.'
    }

    // Email validation - stricter check
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please provide a valid email address (e.g., name@example.com).'
      }
    }

    // Phone validation - only numbers and basic phone characters
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your mobile number.'
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,20}$/
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please provide a valid phone number (numbers, spaces, hyphens, parentheses only).'
      } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
        newErrors.phone = 'Phone number must be at least 8 digits.'
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject.'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long.'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Special handling for phone number - only allow numbers and basic phone characters
    if (name === 'phone') {
      // Allow only numbers, spaces, hyphens, parentheses, and plus sign
      const filteredValue = value.replace(/[^\d\s\-\(\)\+]/g, '')
      setFormData(prev => ({
        ...prev,
        [name]: filteredValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('Sending...')
    setSubmitStatus('')

    try {
      // Save to our database
      const response = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage('Message sent successfully! We will get back to you soon.')
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitMessage(result.error || 'Failed to send message. Please try again.')
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitMessage('Network error. Please try again later.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitMessage('')
        setSubmitStatus('')
      }, 5000)
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Banner - With Mobile Banner Support */}
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
          {/* Desktop Image */}
          <Image
            src={Contactus}
            alt="Solutions background"
            fill
            className="object-cover opacity-30 hidden sm:block"
            sizes="100vw"
          />
          {/* Mobile Image */}
          <Image
            src={mobileBanner}
            alt="Building background"
            fill
            className="object-cover opacity-30 block sm:hidden"
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
            <motion.h1
              variants={titleVariants}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight pt-8 sm:pt-0"
            >
              Contact{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Us
              </span>
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Reach out to Uniview UAE for all your product inquiries,
              assistance, and support. Contact us via email, phone, or visit our
              office in Dubai.
            </motion.p>
          </motion.div>
        </div>
        
        <style jsx>{`
          @media only screen and (min-width: 768px) and (max-width: 1024px),
                only screen and (min-width: 834px) and (max-width: 1194px) {
            .hero-banner {
              height: 35vh !important;
            }
          }
        `}</style>
      </div>

      {/* Enhanced Contact Info Section */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0560f5] to-blue-400">
                Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0560f5] to-blue-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Let&apos;s Talk Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full overflow-hidden relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0560f5] to-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Let&apos;s Talk</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0560f5]/10 to-blue-400/10 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-[#0560f5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:info@uniview-uae.ae" className="text-gray-700 font-medium">
                  info@uniview-uae.ae
                  </a>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0560f5]/10 to-blue-400/10 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-[#0560f5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">+971 50 998 2727</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full overflow-hidden relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Location</h3>
              </div>

              <div className="space-y-2">
               <p className="text-gray-700 font-medium text-base leading-relaxed">
  Baghlaf Building Office Number. <br/>
  11 Satellite Market, Naif, Deira, <br/>
  Dubai, UAE. P.O.Box-123241
</p>
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#0560f5]/10 to-blue-400/10 rounded-full text-sm text-[#0560f5] font-medium mt-3">
                  <span className="w-2 h-2 bg-[#0560f5] rounded-full mr-2"></span>
                  Prime Location
                </div>
              </div>
            </div>

            {/* Visit Us Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full overflow-hidden relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Visit Us</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 font-medium text-sm uppercase tracking-wider mb-2">Working Hours</p>
                  <p className="text-gray-700 font-semibold text-lg">Monday - Saturday</p>
                  <p className="text-[#0560f5] font-bold text-xl">
                    9:00 AM - 9:00 PM
                  </p>
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-100 to-green-50 rounded-full text-sm text-green-600 font-medium mt-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Currently Open
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Map and Contact Form Section */}
      <div className="pb-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 animate-fade-in-left">
              <div className="bg-gradient-to-r from-[#0560f5] via-blue-500 to-[#0560f5] p-4 flex justify-center animate-pulse">
                <h2 className="text-2xl font-bold text-white mb-0 flex items-center animate-bounce-subtle">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Find Us
                </h2>
              </div>
              <div className="flex-grow relative" style={{ minHeight: '450px' }}>
                
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14431.653239199726!2d55.29168023955078!3d25.2735015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f432649d77a05%3A0x329bece680652a9d!2sDigital%20Link%20Technology%20LLC%20-%20UNV%20National%20Distributor%20in%20Dubai%2C%20UAE!5e0!3m2!1sen!2sin!4v1764743717152!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="bg-[#0560f5]/10 p-4 border-t border-[#0560f5]/20 text-center">
                <div className="flex items-center justify-center text-[#0560f5]">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-medium">
                    Visit Us, Dubai, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-[#0560f5] mb-6 text-center">
                Get In Touch
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Your email address will not be published. Required fields are marked{' '}
                <span className="text-[#0560f5]">*</span>
              </p>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium block">
                    Name <span className="text-[#0560f5]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., John Smith"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-200 shadow-sm outline-none focus:border-[#0560f5] ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && (
                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium block">
                    Email <span className="text-[#0560f5]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-200 shadow-sm outline-none focus:border-[#0560f5] ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium block">
                    Mobile <span className="text-[#0560f5]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+971 50 123 4567"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-200 shadow-sm outline-none focus:border-[#0560f5] ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.phone && (
                    <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium block">
                    Subject <span className="text-[#0560f5]">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What is this regarding?"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-200 shadow-sm outline-none focus:border-[#0560f5] ${
                      errors.subject ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.subject && (
                    <div className="text-red-500 text-sm mt-1">{errors.subject}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 font-medium block">
                    Message <span className="text-[#0560f5]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Please describe your inquiry in detail..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg transition duration-200 shadow-sm resize-none outline-none focus:border-[#0560f5] ${
                      errors.message ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.message && (
                    <div className="text-red-500 text-sm mt-1">{errors.message}</div>
                  )}
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#0560f5] to-blue-600 text-white px-10 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {submitMessage && (
                  <div
                    className={`mt-3 text-center ${
                      submitStatus === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage