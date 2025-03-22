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