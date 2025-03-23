"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  // Type for particle
  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
  }
  
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Create particles
    const colors = ['#9855FF', '#7C3AED', '#20BBA1', '#38D9B9'];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1
      });
    }
    
    setParticles(newParticles);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Animation function
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      const updatedParticles = particles.map(particle => {
        // Update position
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;
        
        // Bounce off edges
        if (newX > canvas.width || newX < 0) {
          particle.speedX *= -1;
          newX += particle.speedX;
        }
        
        if (newY > canvas.height || newY < 0) {
          particle.speedY *= -1;
          newY += particle.speedY;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Draw connections
        particles.forEach(p2 => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(152, 85, 255, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
        
        return {
          ...particle,
          x: newX,
          y: newY
        };
      });
      
      setParticles(updatedParticles);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [particles]);

  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Particle animation canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/30 to-neutral-900/70 z-0"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 mix-blend-lighten bg-noise z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            className="mb-8"
          >
            <div className="inline-flex items-center backdrop-blur-sm px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/10">
              <span className="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-white">Programvareutvikler & Profesjonell Idrettsutøver</span>
            </div>
          </motion.div>
          
          {/* Heading */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="block text-white mb-2">Hei, jeg er</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500">
                Hassan Yusuf
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-neutral-300">
              Skaper digitale løsninger med lidenskap og presisjon
            </h2>
          </motion.div>
          
          {/* Description */}
          <motion.div
            custom={0.4}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            className="mb-10"
          >
            <p className="text-lg text-neutral-400">
              Kombinerer teknisk ekspertise med lagånd fra profesjonell idrett.<br />
              Dedikert til å skape elegante løsninger på komplekse problemer.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            custom={0.6}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="#projects" 
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Se Mine Prosjekter
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <Link 
              href="#contact" 
              className="btn border-2 border-white/30 text-white hover:bg-white/10"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Kontakt Meg
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </Link>
          </motion.div>
          
          {/* Tech stack */}
          <motion.div
            custom={0.8}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
            className="mt-16"
          >
            <div className="relative overflow-hidden py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-neutral-900 px-4 text-sm text-neutral-400 font-medium">Tech Stack</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {[
                { name: 'React', color: '#61DAFB', letter: 'R' },
                { name: 'Next.js', color: '#FFFFFF', letter: 'N' },
                { name: 'TypeScript', color: '#3178C6', letter: 'TS' },
                { name: 'Tailwind', color: '#38B2AC', letter: 'TW' },
                { name: 'ASP.NET', color: '#512BD4', letter: '.NET' }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  custom={0.9 + (index * 0.1)}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeIn}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="tech-icon-container"
                >
                  <div className="w-14 h-14 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group relative overflow-hidden">
                    <span className="font-mono font-bold text-sm group-hover:scale-110 transition-