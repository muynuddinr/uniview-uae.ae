'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Shield,
  Users,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Award,
  Clock,
  MapPin,
  Globe
} from 'lucide-react';
import Aboutus from '@/assets/images/banner/Aboutus.jpg';
import mobileBanner from '@/assets/images/banner/AboutMobile.jpg';
import Ourmission from '@/assets/images/remain/Ourmission.jpg';
import OurmissionMobile from '@/assets/images/remain/OurmissionMobile.jpg';

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

const AboutUsPage: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  
  const visionSections = [
    {
      title: "Customer-Centric Innovation",
      description: "Delivering cutting-edge technology solutions that prioritize client needs and drive business success.",
      icon: <Shield className="w-7 h-7" />
    },
    {
      title: "Excellence Through Collaboration",
      description: "Our expert team combines diverse skills and knowledge to deliver exceptional technology solutions.",
      icon: <Users className="w-7 h-7" />
    },
    {
      title: "Future-Ready Technology",
      description: "Implementing advanced solutions and emerging technologies to keep your business ahead of the curve.",
      icon: <Zap className="w-7 h-7" />
    },
    {
      title: "Trust & Reliability",
      description: "As your technology partner, we ensure consistent delivery and maintain the highest standards of integrity.",
      icon: <CheckCircle className="w-7 h-7" />
    }
  ];

  const stars = [0, 1, 2, 3, 4];

  const features = [
    {
      title: "UAE Based",
      description: "Located in the UAE with deep understanding of local market needs and business requirements",
      icon: <MapPin className="w-8 h-8 text-[#3b82f6]" />
    },
    {
      title: "Technology Focus",
      description: "Specialized in cutting-edge technology solutions including surveillance, security, and smart systems",
      icon: <Globe className="w-8 h-8 text-blue-600" />
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance services for all our solutions",
      icon: <Clock className="w-8 h-8 text-purple-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - With Mobile Banner Support */}
      <div className="relative h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[60vh] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 overflow-hidden hero-banner">
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-indigo-800/40 opacity-60"></div>
          {/* Desktop Image */}
          <Image
            src={Aboutus}
            alt="Solutions background"
            fill
            className="object-cover opacity-30 hidden sm:block"
            sizes="100vw"
          />
          {/* Mobile Image */}
          <Image
            src={mobileBanner}
            alt="Solutions background mobile"
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
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Uniview UAE
              </span>
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              className="text-xl sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              Innovative technology solutions for the UAE market
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="bg-gradient-to-b from-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4">
            <h2 className="text-sm font-semibold tracking-wide uppercase bg-[#3b82f6] text-white px-6 py-1.5 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300">
              Discover
            </h2>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-indigo-900">
            Our Vision & Mission
          </h1>
          <div className="max-w-xl mt-5 mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              Creating innovative technology experiences through cutting-edge solutions, excellence, and personalized service.
            </p>
            <div className="flex justify-center mt-4 space-x-2">
              <span className="w-8 h-1 bg-[#3b82f6] rounded"></span>
              <span className="w-3 h-1 bg-blue-300 rounded"></span>
              <span className="w-3 h-1 bg-blue-300 rounded"></span>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-10 max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#3b82f6] to-indigo-700 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="p-8 sm:p-10 relative">
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-300 opacity-20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-300 opacity-20 rounded-full blur-xl"></div>
                  <div className="flex items-center relative z-10">
                    <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-2xl">
                      <Star className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-white">Our Vision</h3>
                  </div>
                  <div className="mt-8 space-y-4 relative z-10">
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {stars.map((index) => (
                          <Star key={index} className="h-5 w-5 text-yellow-400 fill-current drop-shadow-md" />
                        ))}
                      </div>
                    </div>
                    <p className="text-lg text-white leading-relaxed font-light">
                      We aim to revolutionize technology solutions by combining innovative approaches with exceptional service delivery,
                      creating transformative digital experiences that empower businesses and drive success across the UAE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 relative lg:mt-0 lg:col-span-7 pl-4">
              <div className="relative lg:pl-12">
                <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
                  <div className="hidden md:block w-full h-full relative">
                    <Image
                      src={Ourmission}
                      alt="Our Mission"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Mobile Image */}
                  <div className="md:hidden w-full h-full relative">
                    <Image
                      src={OurmissionMobile}
                      alt="Our Mission Mobile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-xl p-6 w-72 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <h3 className="text-gray-900 font-bold text-lg">Trusted Technology Partner</h3>
                  <p className="text-gray-800 mt-2 font-medium text-sm">Delivering innovative solutions since 2019 with 50+ successful projects</p>
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-white rounded-full p-1 shadow-md">
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 inline-block relative">
              Our Core Values
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#3b82f6] rounded-full"></span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              As a technology company that believes in delivering innovative solutions, we work towards:
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {visionSections.map((section, index) => (
              <div key={index} className="bg-white overflow-hidden shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="h-2 bg-gradient-to-r from-[#3b82f6] to-indigo-600 group-hover:h-3 transition-all duration-300"></div>
                <div className="px-6 py-8">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {section.icon}
                    </div>
                    <h3 className="ml-4 text-lg font-bold text-gray-900 group-hover:text-[#3b82f6] transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.description}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  </div>
                  {/* <button className="text-xs font-medium text-[#3b82f6] hover:text-[#2563eb] group-hover:font-semibold transition-all duration-300 flex items-center"> */}
                    {/* Learn more */}
                    {/* <ArrowRight className="ml-1.5 w-4 h-4 group-hover:ml-2.5 transition-all duration-300" /> */}
                  {/* </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Uniview UAE?</h2>
              <p className="text-xl text-gray-600">
                Your trusted technology partner in the UAE, delivering innovative solutions with excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#3b82f6]/10 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0560f5] to-[#3b82f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let&apos;s collaborate to bring cutting-edge technology solutions to your organization. We&apos;re excited to discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/Contactus" 
              className="bg-white text-[#0560f5] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/Solutions" 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#0560f5] transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        @media only screen and (min-width: 768px) and (max-width: 1024px),
               only screen and (min-width: 834px) and (max-width: 1194px) {
          .hero-banner {
            height: 35vh !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;