// src/services/api.ts
import { Project, ContactFormData } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5147/api';

/**
 * Fetches all projects from the backend API
 */
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Map backend model to frontend model
    return data.map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      technologies: project.technologies || [],
      githubUrl: project.gitHubUrl,
      liveUrl: project.liveDemoUrl,
      featured: project.featured || false
    }));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

/**
 * Fetches a single project by ID
 */
export const getProjectById = async (id: number): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const project = await response.json();
    
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      technologies: project.technologies || [],
      githubUrl: project.gitHubUrl,
      liveUrl: project.liveDemoUrl,
      featured: project.featured || false
    };
  } catch (error) {
    console.error(`Failed to fetch project with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Sends a contact message to the backend API
 */
export const sendContactMessage = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return {
      success: true,
      message: data.message || 'Takk for din melding! Vi kontakter deg snart.'
    };
  } catch (error) {
    console.error('Failed to send contact message:', error);
    throw error;
  }
};