// Common types used across the application

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
  }
  
  export interface NavItem {
    name: string;
    path: string;
  }
  
  export interface Technology {
    name: string;
    icon?: string;
    color?: string;
  }
  
  // This extends the Project type from the service layer if needed
  export interface ProjectWithDetails extends Project {
    longDescription?: string;
    challenges?: string;
    solutions?: string;
    learnings?: string;
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    gitHubUrl: string;
    liveDemoUrl: string;
    createdDate: string;
    technologies: string[];
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }