'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" aria-label="Hassan Yusuf">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <svg 
          width="48" 
          height="32" 
          viewBox="0 0 48 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-600 dark:text-primary-400"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          
          {/* H letter */}
          <path 
            d="M2 2h6v12h10V2h6v28h-6V20H8v10H2V2z" 
            fill="url(#logo-gradient)" 
            fillRule="evenodd"
          />
          
          {/* Y letter stylized as arrow/code bracket */}
          <path 
            d="M28 2h5l6 10 6-10h5l-8.5 14V30h-5V16L28 2z" 
            fill="url(#logo-gradient)" 
            fillRule="evenodd"
          />
          
          {/* Connecting line between H and Y */}
          <path 
            d="M18 16h10" 
            stroke="url(#logo-gradient)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
        </svg>
      </motion.div>
    </Link>
  );
}