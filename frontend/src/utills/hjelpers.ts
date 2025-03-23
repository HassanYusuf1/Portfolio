// Generate a random ID
export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };
  
  // Filter projects by technology
  export const filterProjectsByTechnology = (
    projects: Project[], 
    technology: string
  ): Project[] => {
    if (!technology) return projects;
    
    return projects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  };
  
  // Sort projects by date
  export const sortProjectsByDate = (
    projects: Project[], 
    ascending: boolean = false
  ): Project[] => {
    return [...projects].sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
  };
  
  // Create URL-friendly slug from text
  export const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
      .trim();                   // Trim leading/trailing spaces
  };
  
  // Parse a URL to get query parameters
  export const getQueryParams = (url: string): Record<string, string> => {
    const params = {};
    const queryString = url.split('?')[1];
    if (!queryString) return params;
    
    const paramPairs = queryString.split('&');
    paramPairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    
    return params;
  };