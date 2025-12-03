'use client';

import { useState } from 'react';
import { Globe, Shield, Zap, Eye, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UniviewCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cardData = [
    {
      id: 1,
      icon: Globe,
      title: "CCTV Solutions",
      description: "Professional surveillance systems with crystal clear video quality and reliable monitoring.",
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      icon: Shield,
      title: "SIRA Approved",
      description: "All products are certified and approved by SIRA for complete legal compliance.",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      icon: Zap,
      title: "Quick Response",
      description: "Fast installation and 24/7 technical support for all your security needs.",
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 4,
      icon: Eye,
      title: "Cloud Storage",
      description: "Secure cloud backup with easy access to your footage from anywhere.",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-blue-50",
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-gray-100 py-16 px-4 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="inline-block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent"
          >
            UNIVIEW-UAE
          </motion.span>
          <br />
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="inline-block text-2xl md:text-4xl text-gray-700 font-semibold"
          >
            is the largest Sira Approved CCTV
          </motion.span>
          <br />
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="inline-block text-2xl md:text-4xl text-gray-700 font-semibold"
          >
            Company In Dubai UAE
          </motion.span>
        </h1>
        
        {/* Animated underline */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 192, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="mx-auto h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
          style={{ maxWidth: '12rem' }}
        />
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card, index) => {
            const IconComponent = card.icon;
            const isHovered = hoveredCard === card.id;
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Main Card */}
                <div className={`${card.bgColor} rounded-3xl p-8 shadow-lg border border-white/50 h-full transition-all duration-500 ease-out hover:shadow-xl relative overflow-hidden`}>
                  
                  {/* Background decoration */}
                  <div 
                    className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-r ${card.color} opacity-0 transition-opacity duration-500 ease-out ${
                      isHovered ? 'opacity-10' : 'opacity-0'
                    }`}
                  />
                  
                  {/* Icon Section */}
                  <div className="mb-6">
                    <div 
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 
                      className={`text-xl font-bold text-gray-800 mb-4 transform transition-all duration-500 ease-out ${
                        isHovered ? 'translate-x-1' : 'translate-x-0'
                      }`}
                    >
                      {card.title}
                    </h3>
                    
                    <p 
                      className={`text-gray-600 leading-relaxed transform transition-all duration-500 ease-out ${
                        isHovered ? 'translate-x-1' : 'translate-x-0'
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Border Animation */}
                  <div 
                    className={`mt-6 h-1 bg-gradient-to-r ${card.color} transform origin-left transition-all duration-500 ease-out rounded-full ${
                      isHovered ? 'scale-x-100' : 'scale-x-0'
                    }`} 
                  />
                  
                  {/* Corner decoration */}
                  <div 
                    className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-3xl transition-all duration-500 ease-out ${
                      isHovered ? 'border-blue-500 scale-125' : 'border-transparent scale-100'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-center mt-16"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full transform transition-all duration-500 ease-out shadow-xl hover:shadow-2xl relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              <Eye className="w-5 h-5 transform transition-transform duration-500 ease-out group-hover:scale-125" />
              Explore Solutions
            </span>
            {/* Button shine effect */}
            <div className="absolute inset-0 w-full h-full bg-white opacity-0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          </button>
          
          <button className="group px-8 py-4 border-2 border-blue-600 text-blue-700 font-bold rounded-full transform transition-all duration-500 ease-out shadow-lg hover:shadow-xl relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              <Clock className="w-5 h-5 transform transition-transform duration-500 ease-out group-hover:rotate-12" />
              Contact Us
            </span>
            {/* Button background fill effect */}
            <div className="absolute inset-0 w-0 h-full bg-blue-50 transition-all duration-500 ease-out group-hover:w-full" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}