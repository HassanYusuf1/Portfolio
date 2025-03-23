// src/types/index.ts

export interface NavLink {
    title: string;
    href: string;
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    featured?: boolean;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }
  
  export interface Skill {
    name: string;
    level: number; // 0-100
  }
  
  export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
  }
  
  export interface Experience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
    technologies?: string[];
  }
  
  export interface Education {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | null;
    description?: string;
  }