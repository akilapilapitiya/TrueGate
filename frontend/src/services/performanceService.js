import axiosInstance from './axiosInstance';

class PerformanceService {
  /**
   * Get comprehensive performance metrics
   * @returns {Promise<Object>} Performance metrics data
   */
  async getPerformanceMetrics() {
    try {
      const response = await axiosInstance.get('/performance/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      throw error;
    }
  }

  /**
   * Get recent API calls
   * @param {number} limit - Number of calls to retrieve (default: 20)
   * @returns {Promise<Object>} Recent API calls data
   */
  async getRecentApiCalls(limit = 20) {
    try {
      const response = await axiosInstance.get(`/performance/recent-calls?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent API calls:', error);
      throw error;
    }
  }

  /**
   * Get system health status
   * @returns {Promise<Object>} System health data
   */
  async getSystemHealth() {
    try {
      const response = await axiosInstance.get('/performance/health');
      return response.data;
    } catch (error) {
      console.error('Error fetching system health:', error);
      throw error;
    }
  }

  /**
   * Get performance history
   * @param {number} hours - Number of hours to look back (default: 24)
   * @returns {Promise<Object>} Performance history data
   */
  async getPerformanceHistory(hours = 24) {
    try {
      const response = await axiosInstance.get(`/performance/history?hours=${hours}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching performance history:', error);
      throw error;
    }
  }

  /**
   * Refresh all performance data
   * @returns {Promise<Object>} All performance data
   */
  async refreshAllData() {
    try {
      const [metrics, recentCalls, health] = await Promise.all([
        this.getPerformanceMetrics(),
        this.getRecentApiCalls(),
        this.getSystemHealth()
      ]);

      return {
        metrics: metrics.data,
        recentCalls: recentCalls.data,
        health: health.data
      };
    } catch (error) {
      console.error('Error refreshing performance data:', error);
      throw error;
    }
  }
}

export default new PerformanceService(); 