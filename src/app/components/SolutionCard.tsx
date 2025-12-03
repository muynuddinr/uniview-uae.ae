import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SolutionCardProps {
  solution: {
    id: string;
    title: string;
    description: string;
    image: string;
    features: string[];
    url: string;
  };
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white group hover:shadow-xl transition-shadow">
      <Link href={`/Solutions/${solution.url}`} className="absolute inset-0 z-10" aria-label={`View details for ${solution.title}`} />
      
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        <Image src={solution.image} alt={solution.title} fill className="object-cover" />
      </div>
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-900">{solution.title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{solution.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-1 justify-center">
          {solution.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <div className="relative p-4 text-center border-t border-gray-200 overflow-hidden">
        <Link
          href={`/Solutions/${solution.url}`}
          className="relative z-10 font-semibold flex items-center justify-center gap-2 transition-all duration-300"
          style={{ color: '#0560f5' }}
        >
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SolutionCard;