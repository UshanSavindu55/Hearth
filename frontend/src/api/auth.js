// Authentication API functions
import { apiRequest } from './index'

export const authAPI = {
  // Login user
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  // Register user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  // Logout user
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    })
  },

  // Get current user profile
  getProfile: async () => {
    return apiRequest('/auth/profile', {
      method: 'GET',
    })
  },

  // Refresh token
  refreshToken: async () => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
    })
  },

  // Reset password
  resetPassword: async (email) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  // Change password
  changePassword: async (passwordData) => {
    return apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    })
  },
}

export default authAPI
