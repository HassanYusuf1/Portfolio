import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base API URL
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5147/api';

// Create an Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // You can add authentication tokens here if needed
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle specific error codes
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401 && !originalRequest._retry) {
        // Handle token refresh or redirect to login if needed
      }
      
      // Handle 404 Not Found
      if (error.response.status === 404) {
        console.error('Resource not found:', originalRequest.url);
      }
      
      // Handle 500 Internal Server Error
      if (error.response.status >= 500) {
        console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      // Handle network errors
      console.error('Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;