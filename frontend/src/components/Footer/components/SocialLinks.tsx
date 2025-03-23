'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import styles from '../Footer.module.css';

const SocialLinks = () => {
  const socialLinks = [
    { name: 'Github', icon: Github, url: 'https://github.com/hassanyusuf1' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/hassanyusuf/' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/hassanyusuf' },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors ${styles.socialIcon}`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label={link.name}
          >
            <Icon size={18} />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;