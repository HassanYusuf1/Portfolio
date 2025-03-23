// src/utils/helpers.ts
import { Project } from '@/services/portfolioService';

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sort projects by date
export function sortProjectsByDate(
  projects: Project[],
  ascending: boolean = false
): Project[] {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.createdDate).getTime();
    const dateB = new Date(b.createdDate).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

// Filter projects by technology
export function filterProjectsByTechnology(
  projects: Project[],
  technology: string
): Project[] {
  if (!technology) return projects;
  
  return projects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
}