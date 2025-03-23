"use client";

import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Show cursor after component mounts
    setTimeout(() => setHidden(false), 500);
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <>
      <div 
        className={`hidden md:block fixed rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-200 ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          width: clicking ? '30px' : '40px',
          height: clicking ? '30px' : '40px',
          border: '2px solid white',
          transform: `translate(${position.x - (clicking ? 15 : 20)}px, ${position.y - (clicking ? 15 : 20)}px)`,
          transition: 'width 0.2s, height 0.2s, transform 0.1s ease-out'
        }}
      />
      <div 
        className={`hidden md:block fixed bg-white rounded-full pointer-events-none z-50 mix-blend-difference ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          width: '6px',
          height: '6px',
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`
        }}
      />
    </>
  );
}