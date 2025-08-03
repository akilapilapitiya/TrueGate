import axiosInstance from './axiosInstance';

const userManagementService = {
  // Get all users with pagination and filtering
  async getUsers(params = {}) {
    try {
      const response = await axiosInstance.get('/admin/users', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user by email
  async getUserByEmail(email) {
    try {
      const response = await axiosInstance.get(`/admin/users/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  async updateUser(email, updates) {
    try {
      const response = await axiosInstance.put(`/admin/users/${email}`, updates);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  async deleteUser(email) {
    try {
      const response = await axiosInstance.delete(`/admin/users/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset user password
  async resetUserPassword(email, newPassword) {
    try {
      const response = await axiosInstance.post(`/admin/users/${email}/reset-password`, {
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lock/Unlock user
  async toggleUserLock(email, locked) {
    try {
      const response = await axiosInstance.post(`/admin/users/${email}/toggle-lock`, {
        locked
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset user login attempts
  async resetLoginAttempts(email) {
    try {
      const response = await axiosInstance.post(`/admin/users/${email}/reset-login-attempts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get dashboard summary
  async getDashboardSummary() {
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userManagementService; 