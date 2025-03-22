"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Type for particle
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    // Create particles
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#4338ca', '#6366f1', '#14b8a6', '#0ea5e9', '#f0fdfa'];
      
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();

    // Track mouse position for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Animation logic for particles
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
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
      if (!canvasRef.current || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      const updatedParticles = particles.map(particle => {
        // Distance from mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply mouse force
        let vx = particle.speedX;
        let vy = particle.speedY;
        
        if (distance < 120) {
          const force = 0.2 / Math.max(distance, 1);
          vx -= dx * force;
          vy -= dy * force;
        }
        
        // Update position
        let newX = particle.x + vx;
        let newY = particle.y + vy;
        
        // Boundary check
        if (newX < 0 || newX > window.innerWidth) {
          vx = -vx;
          newX += vx;
        }
        
        if (newY < 0 || newY > window.innerHeight) {
          vy = -vy;
          newY += vy;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Draw connecting lines for network effect
        particles.forEach(p2 => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
        
        return {
          ...particle,
          x: newX,
          y: newY,
          speedX: vx,
          speedY: vy
        };
      });
      
      setParticles(updatedParticles);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [particles]);

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 text-white">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Additional visual elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 via-primary-800/30 to-transparent z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl animate-pulse-slow"
        ></div>
        <div 
          className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-primary-400/10 blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="container h-full mx-auto px-4 sm:px-6 relative z-10 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Animated badge */}
          <div 
            className={`transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-secondary-400 animate-pulse"></span>
                <span className="text-sm font-medium tracking-wider text-white">Programvareutvikler & Profesjonell Idrettsutøver</span>
              </div>
            </div>
          </div>
          
          {/* Main heading */}
          <div 
            className={`transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span className="block">Hei, jeg er</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary-300 to-white">
                Hassan Yusuf
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl mb-8 text-primary-100 font-light">
              Skaper digitale løsninger med lidenskap og presisjon
            </h2>
          </div>
          
          {/* Description */}
          <div 
            className={`transform transition-all duration-700 mb-8 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className="text-lg text-primary-100 leading-relaxed">
              Kombinerer teknisk ekspertise med lagånd fra profesjonell idrett.<br />
              Dedikert til å skape elegante løsninger på komplekse problemer.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <Link href="#projects" className="btn-primary">
              <span className="relative z-10 flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
                Se Mine Prosjekter
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            
            <Link href="#contact" className="btn-secondary">
              <span className="relative z-10 flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300">
                Kontakt Meg
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Tech Stack */}
          <div 
            className={`mt-16 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent animate-pulse-slow"></div>
              <div className="flex flex-wrap gap-6 items-center py-4 px-1">
                <div className="text-xs uppercase tracking-wider text-primary-200 font-semibold">Tech Stack:</div>
                
                {/* Tech logos */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: 'React', color: '#61DAFB', letter: 'R' },
                    { name: 'Next.js', color: '#FFFFFF', letter: 'N' },
                    { name: 'TypeScript', color: '#3178C6', letter: 'TS' },
                    { name: 'Tailwind', color: '#38B2AC', letter: 'TW' },
                    { name: 'ASP.NET', color: '#512BD4', letter: '.NET' }
                  ].map((tech, index) => (
                    <div 
                      key={index}
                      className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-md hover:scale-110 transition-all duration-300 cursor-pointer group"
                      title={tech.name}
                    >
                      <div 
                        className="font-mono font-bold text-sm group-hover:scale-110 transition-all"
                        style={{ color: tech.color }}
                      >
                        {tech.letter}
                      </div>
                      <span className="absolute -bottom-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 px-2 py-1 rounded z-20">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}