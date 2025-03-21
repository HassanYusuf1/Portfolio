// In api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5147/api';

export async function fetchProjects() {
  const response = await fetch(`${API_URL}/projects`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  return response.json();
}

export async function fetchProject(id: number) {
  const response = await fetch(`${API_URL}/projects/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  
  return response.json();
}

export async function sendContactForm(data: { name: string; email: string; message: string }) {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return response.json();
}