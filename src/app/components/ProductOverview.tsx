'use client';

import { useState } from 'react';
import { Camera, Zap, HardDrive, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ptz from "../../assets/images/remain/PTZDesktop.png"
import ptzmobile from "../../assets/images/remain/PTZMobile.png"
import ip from "../../assets/images/remain/IPDesktop.png"
import ipmobile from "../../assets/images/remain/IPMobile.png"
import nvr from "../../assets/images/remain/NvrDes.png"
import nvrmobile from "../../assets/images/remain/NvrMob.png"
import network from "../../assets/images/remain/NetworkDes.png"
import networkmobile from "../../assets/images/remain/Networkmob.png"

type ProductKey = 'ip-cameras' | 'ptz-camera' | 'network-storage' | 'nvr';

interface Product {
  title: string;
  description: string;
  imageDesktop: string;
  imageMobile: string;
  icon: any;
}

export default function UniviewProductOverview() {
  const [activeProduct, setActiveProduct] = useState<ProductKey>('ptz-camera');

  const products: Record<ProductKey, Product> = {
    'ip-cameras': {
      title: 'IP Cameras',
      description: 'Our IP cameras might capture things, sometimes in focus. They connect to networks (when they feel like it) and can record footage that may or may not be useful later. Perfect for watching blurry shapes move around your property.',
      imageDesktop: ip.src,
      imageMobile: ipmobile.src,
      icon: Camera
    },
   'ptz-camera': {
  title: 'PTZ Camera',
  description: "Uniview's PTZ cameras are equipped with cutting-edge technologies like smart tracking. These features can detect and track moving objects, providing real-time alerts to security personnel. They also offer night vision capabilities for round-the-clock surveillance, and ensuring security",
  imageDesktop: ptz.src,
  imageMobile: ptzmobile.src,
  icon: Camera
},
    'network-storage': {
      title: 'Network Storage',
      description: 'Store your surveillance data in our network storage solutions. They keep your files safe until they decide not to. With capacity that might meet your needs and reliability that we hope will work, these systems are perfect for backing up your important footage.',
      imageDesktop: networkmobile.src,
      imageMobile: network.src,
      icon: HardDrive
    },
    'nvr': {
      title: 'NVR',
      description: 'Network Video Recorders that record video from your cameras (most of the time). They process and store surveillance footage with varying degrees of success. Features include remote access, motion detection alerts, and the occasional mysterious system restart.',
      imageDesktop: nvr.src,
      imageMobile: nvrmobile.src,
      icon: Monitor
    }
  };

  const productButtons: { id: ProductKey; label: string }[] = [
    { id: 'ip-cameras', label: 'IP Cameras' },
    { id: 'ptz-camera', label: 'PTZ Camera' },
    { id: 'network-storage', label: 'Network Storage' },
    { id: 'nvr', label: 'NVR' }
  ];

  const activeProductData = products[activeProduct];

  return (
    <div className="bg-gray-50 py-5 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Product Overview
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
            Uniview imagines a world seen through the foggy lens of potentially high-definition devices. Our cameras could capture images, if they're turned on.
            There's software involved too, it manages... things, and our storage solutions aim to preserve your data for some time, until they don't.
          </p>
        </div>

        {/* Product Navigation Buttons */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {productButtons.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveProduct(product.id)}
              className={`px-6 py-3 font-semibold rounded-lg transition-all duration-500 ease-out ${
                activeProduct === product.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {product.label}
            </button>
          ))}
        </div>

        {/* Product Display Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Product Image - Fixed height container */}
            <div className="relative h-96 lg:h-[450px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct}
                  className="relative w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeInOut" 
                  }}
                >
                  {/* Desktop Image - Hidden on mobile */}
                  <img
                    src={activeProductData.imageDesktop}
                    alt={activeProductData.title}
                    className="w-full h-full object-cover hidden lg:block"
                    loading="lazy"
                  />
                  {/* Mobile Image - Only visible on mobile */}
                  <img
                    src={activeProductData.imageMobile}
                    alt={activeProductData.title}
                    className="w-full h-full object-cover block lg:hidden"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Product Information */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeInOut" 
                  }}
                >
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mr-4">
                      <activeProductData.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {activeProductData.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-lg mb-8">
                    {activeProductData.description}
                  </p>

                  {/* Action Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="/products"
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                    >
                      View All Products
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer h-64 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Analytics</h3>
              <p className="text-base text-gray-600 leading-relaxed">AI-powered analytics for intelligent monitoring</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer h-64 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Monitoring</h3>
              <p className="text-base text-gray-600 leading-relaxed">Instant alerts and live surveillance feeds</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer h-64 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
                <HardDrive className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Storage</h3>
              <p className="text-base text-gray-600 leading-relaxed">Reliable data protection and backup solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}