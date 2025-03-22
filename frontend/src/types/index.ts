// Centrale TypeScript-definisjoner for prosjektet

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    demoUrl: string;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }
  
  export interface Skill {
    name: string;
    level: number;
  }
  
  export interface SocialMedia {
    platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'facebook';
    url: string;
    icon: React.ReactNode;
  }
  
  export interface NavLink {
    title: string;
    href: string;
  }
  
  export interface FooterSection {
    title: string;
    links: {
      text: string;
      url: string;
    }[];
  }