// src/services/portfolioService.ts
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
    try {
      const response = await apiClient.get<Project[]>('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },
  
  // Get a single project by ID
  async getProject(id: number): Promise<Project | null> {
    try {
      const response = await apiClient.get<Project>(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      return null;
    }
  },
  
  // Send a contact message
  async sendContactMessage(contactData: ContactMessage): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<ApiResponse<void>>('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error sending contact message:', error);
      return {
        success: false,
        message: 'Failed to send message. Please try again later.'
      };
    }
  }
};

export default portfolioService;