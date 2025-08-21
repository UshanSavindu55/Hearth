// Main API configuration and shared functions
// API base URL - adjust this to match your backend
const API_BASE_URL = 'http://localhost:8080/api'

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Add authorization token if available
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, config)
    
    // Handle different response types
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    // Return JSON if response has content
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }
    
    return response
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// Generic CRUD operations
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
}

// Export all API modules
export { authAPI } from './auth'
export { chatAPI } from './chat'

// Default export
export default api
