"use client";

import { useState, useRef, useEffect } from 'react';
import { ContactFormData } from '@/types';
import { sendContactMessage } from '@/services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      const response = await sendContactMessage(formData);
      
      setSubmitStatus({
        success: true,
        message: response.message || 'Takk for din melding! Vi kontakter deg snart.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus({
        success: false,
        message: 'Beklager, det oppstod en feil ved sending av meldingen. Vennligst prøv igjen senere.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-200 dark:bg-primary-800 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-200 dark:bg-secondary-800 rounded-full -translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transform transition duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
            Ta Kontakt
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"></div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Har du et prosjekt i tankene eller ønsker å slå av en prat? Ikke nøl med å ta kontakt.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact information */}
          <div 
            className={`transform transition duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          >
            {/* Contact info cards */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800 dark:text-white">E-post</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">kontakt@hassanyusuf.com</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800 dark:text-white">Lokasjon</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">Oslo, Norge</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connect with me */}
            <div className="mt-10">
              <h4 className="font-medium text-neutral-800 dark:text-white text-lg mb-4">Følg meg på</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/hassanyusuf1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-neutral-800 p-3 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-neutral-800 p-3 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-neutral-800 p-3 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div 
            className={`transform transition duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-6">Send meg en melding</h3>
              
              {/* Form status message */}
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.success 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Navn
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    E-post
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Melding
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white resize-none"
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sender...
                    </>
                  ) : 'Send Melding'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}