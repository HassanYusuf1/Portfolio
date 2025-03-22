import { Project } from '@/types';

const API_URL = 'http://localhost:5147/api'; // Match your ASP.NET Core API port

// Projects API functions
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Map backend model to frontend model if needed
    return data.map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      technologies: project.technologies,
      githubUrl: project.gitHubUrl,
      liveUrl: project.liveDemoUrl,
      featured: true // You can implement logic to determine featured projects
    }));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

// Contact API functions
export const sendContactMessage = async (name: string, email: string, message: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};