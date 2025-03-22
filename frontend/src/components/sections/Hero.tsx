"use client"

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Type for particle positions
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

  // Initialize particles on component mount
  useEffect(() => {
    setIsLoaded(true);
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#5a84ff', '#3149c5', '#28a99a', '#1d6f68', '#ffffff'];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();

    // Track mouse position for interactive particle effects
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Animation loop for particles
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match window
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation function to update and draw particles
    const animate = () => {
      if (!canvasRef.current || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update each particle
      const updatedParticles = particles.map(particle => {
        // Calculate distance from mouse for interactive effect
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply force based on mouse position
        let vx = particle.speedX;
        let vy = particle.speedY;
        
        if (distance < 100) {
          const force = 0.5 / distance;
          vx -= dx * force;
          vy -= dy * force;
        }
        
        // Update position
        let newX = particle.x + vx;
        let newY = particle.y + vy;
        
        // Bouncing off edges
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
        
        // Draw connecting lines between nearby particles
        particles.forEach(p2 => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.1 * (1 - distance / 100)})`;
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
    <section id="home" className="relative min-h-screen bg-primary-gradient flex items-center text-white overflow-hidden">
      {/* Interactive particle background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 via-primary-800/30 to-transparent z-0"></div>
      
      {/* Modern 3D floating shapes */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-secondary-500/20 blur-3xl animate-float"
          style={{ animationDuration: '15s' }}
        ></div>
        <div 
          className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-primary-400/15 blur-3xl animate-float"
          style={{ animationDuration: '20s', animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute -bottom-32 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-float"
          style={{ animationDuration: '25s', animationDelay: '1s' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <div 
            className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-secondary-400 animate-pulse"></span>
                <span className="text-sm font-medium tracking-wider text-white">Programvareutvikler & Profesjonell Idrettsutøver</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              <span className="block">Hei, jeg er</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary-300 to-white animate-pulse-slow">Hassan Yusuf</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl mb-8 text-primary-100 font-light">
              Skaper digitale løsninger med lidenskap og presisjon
            </h2>
          </div>
          
          <div 
            className={`transform transition-all duration-1000 mb-10 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className="text-lg text-primary-100 leading-relaxed">
              Kombinerer teknisk ekspertise med lagånd fra profesjonell idrett.<br />
              Dedikert til å skape elegante løsninger på komplekse problemer.
            </p>
          </div>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <Link href="#projects" className="btn btn-primary group relative overflow-hidden">
              <span className="relative z-10">Se Mine Prosjekter</span>
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="absolute right-6 group-hover:right-4 transition-all duration-300">
                →
              </span>
            </Link>
            
            <Link href="#contact" className="btn btn-outline group relative overflow-hidden">
              <span className="relative z-10">Kontakt Meg</span>
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="absolute right-6 group-hover:right-4 transition-all duration-300">
                →
              </span>
            </Link>
          </div>
          
          {/* Modern Tech stack display */}
          <div 
            className={`mt-16 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent animate-pulse-slow"></div>
              <div className="flex flex-wrap gap-6 items-center py-4 px-1">
                <div className="text-xs uppercase tracking-wider text-primary-200 font-semibold">Tech Stack:</div>
                
                {/* Tech Icons - Using div elements with custom styling instead of SVG */}
                <div className="flex space-x-4">
                  {[
                    { name: 'React', color: '#61DAFB', letter: 'R' },
                    { name: 'TypeScript', color: '#3178C6', letter: 'TS' },
                    { name: 'Next.js', color: '#FFFFFF', letter: 'N' },
                    { name: 'Tailwind', color: '#38B2AC', letter: 'TW' },
                    { name: 'Node.js', color: '#339933', letter: 'N' }
                  ].map((tech, index) => (
                    <div 
                      key={index}
                      className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer group"
                      title={tech.name}
                    >
                      <div 
                        className="font-mono font-bold text-sm group-hover:scale-110 transition-all"
                        style={{ color: tech.color }}
                      >
                        {tech.letter}
                      </div>
                      <span className="absolute -bottom-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 px-2 py-1 rounded">
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