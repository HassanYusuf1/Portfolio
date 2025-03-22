"use client"

import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-primary-gradient flex items-center text-white">
      {/* Background particles/decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-white opacity-30" style={{ animationDelay: '100ms' }}></div>
        <div className="animate-float absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-white opacity-20" style={{ animationDelay: '200ms' }}></div>
        <div className="animate-float absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-white opacity-20" style={{ animationDelay: '300ms' }}></div>
        <div className="animate-float absolute bottom-1/3 right-1/3 w-5 h-5 rounded-full bg-white opacity-10" style={{ animationDelay: '400ms' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <div className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Hi, I'm Hassan Yusuf</h1>
            <h2 className="text-xl md:text-2xl mb-8 text-primary-100">Software Engineer & Professional Athlete</h2>
          </div>
          
          <div className="animate-fadeIn mb-10" style={{ animationDelay: '200ms' }}>
            <p className="text-lg text-primary-100">
              Creating digital solutions with passion and precision.<br />
              Combining technical expertise with team spirit from professional sports.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <Link href="#projects" className="btn btn-primary">
              View My Work
            </Link>
            <Link href="#contact" className="btn btn-outline">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}