'use client';
import React, { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';

const SnowfallEffect: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState<HTMLCanvasElement[]>([]);

  useEffect(() => {
    // Create custom snowflake images only on client-side
    // Snowflake 1: Star-like with detailed branches
    const snowflake1 = document.createElement('canvas');
    const ctx1 = snowflake1.getContext('2d');
    snowflake1.width = 24;
    snowflake1.height = 24;
    
    if (ctx1) {
      ctx1.strokeStyle = '#ffffff';
      ctx1.lineWidth = 2;
      ctx1.lineCap = 'round';
      
      // Draw 6 main branches
      for (let i = 0; i < 6; i++) {
        ctx1.save();
        ctx1.translate(12, 12);
        ctx1.rotate((Math.PI / 3) * i);
        
        // Main branch
        ctx1.beginPath();
        ctx1.moveTo(0, 0);
        ctx1.lineTo(0, -10);
        ctx1.stroke();
        
        // Side branches
        ctx1.beginPath();
        ctx1.moveTo(0, -3);
        ctx1.lineTo(-2, -5);
        ctx1.moveTo(0, -3);
        ctx1.lineTo(2, -5);
        ctx1.stroke();
        
        ctx1.beginPath();
        ctx1.moveTo(0, -7);
        ctx1.lineTo(-2, -9);
        ctx1.moveTo(0, -7);
        ctx1.lineTo(2, -9);
        ctx1.stroke();
        
        ctx1.restore();
      }
      
      // Center circle
      ctx1.beginPath();
      ctx1.arc(12, 12, 2, 0, Math.PI * 2);
      ctx1.fillStyle = '#ffffff';
      ctx1.fill();
    }
    
    // Snowflake 2: Crystal-like hexagonal shape
    const snowflake2 = document.createElement('canvas');
    const ctx2 = snowflake2.getContext('2d');
    snowflake2.width = 20;
    snowflake2.height = 20;
    
    if (ctx2) {
      ctx2.strokeStyle = '#e3f2fd';
      ctx2.lineWidth = 1.8;
      ctx2.lineCap = 'round';
      
      // Draw hexagon outline
      ctx2.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = 10 + Math.cos(angle) * 6;
        const y = 10 + Math.sin(angle) * 6;
        if (i === 0) {
          ctx2.moveTo(x, y);
        } else {
          ctx2.lineTo(x, y);
        }
      }
      ctx2.closePath();
      ctx2.stroke();
      
      // Inner details
      for (let i = 0; i < 6; i++) {
        ctx2.save();
        ctx2.translate(10, 10);
        ctx2.rotate((Math.PI / 3) * i);
        
        ctx2.beginPath();
        ctx2.moveTo(0, -6);
        ctx2.lineTo(0, -8);
        ctx2.stroke();
        
        ctx2.restore();
      }
      
      // Center star
      ctx2.beginPath();
      for (let i = 0; i < 6; i++) {
        ctx2.save();
        ctx2.translate(10, 10);
        ctx2.rotate((Math.PI / 3) * i);
        ctx2.moveTo(0, 0);
        ctx2.lineTo(0, -3);
        ctx2.stroke();
        ctx2.restore();
      }
    }
    
    // Snowflake 3: Delicate cross pattern
    const snowflake3 = document.createElement('canvas');
    const ctx3 = snowflake3.getContext('2d');
    snowflake3.width = 18;
    snowflake3.height = 18;
    
    if (ctx3) {
      ctx3.strokeStyle = '#f0f9ff';
      ctx3.lineWidth = 1.5;
      ctx3.lineCap = 'round';
      
      // 8 branches
      for (let i = 0; i < 8; i++) {
        ctx3.save();
        ctx3.translate(9, 9);
        ctx3.rotate((Math.PI / 4) * i);
        
        // Main line
        ctx3.beginPath();
        ctx3.moveTo(0, 0);
        ctx3.lineTo(0, -7);
        ctx3.stroke();
        
        // Small decorative lines
        ctx3.beginPath();
        ctx3.moveTo(0, -5);
        ctx3.lineTo(-1.5, -6);
        ctx3.moveTo(0, -5);
        ctx3.lineTo(1.5, -6);
        ctx3.stroke();
        
        ctx3.restore();
      }
    }
    
    setImages([snowflake1, snowflake2, snowflake3]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 20000); // 20 seconds = 20000 milliseconds
    
    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

  if (!isActive || images.length === 0) {
    return null; // Don't render anything when snowfall is inactive or images not ready
  }

  return (
    <Snowfall
      color="#fff"
      snowflakeCount={100}
      images={images}
      radius={[5, 15]}
      speed={[0.5, 2]}
      wind={[-0.5, 1]}
      rotationSpeed={[-1, 1]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default SnowfallEffect;