import apiClient from './apiClient';

// Define TypeScript interfaces for your API responses
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

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Portfolio service methods
const portfolioService = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
  },
  
  // Get a single project by ID
  async getProject(id: number): Promise<Project> {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  },
  
  // Send a contact message
  async sendContactMessage(contactData: ContactMessage): Promise<ApiResponse<void>> {
    const response = await apiClient.post<ApiResponse<void>>('/contact', contactData);
    return response.data;
  },
  
  // Search projects by technology (example of extending the API)
  async searchProjectsByTechnology(technology: string): Promise<Project[]> {
    const allProjects = await this.getProjects();
    return allProjects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  },
};

export default portfolioService;