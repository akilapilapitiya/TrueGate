const { 
  findUserByEmail, 
  getAllUsers, 
  updateUser, 
  changeUserPassword,
  deleteUser
} = require('../services/userService');
const { securityLogger } = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Get all users with pagination and filtering
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '', status = '' } = req.query;
    const users = await getAllUsers();
    
    // Apply filters
    let filteredUsers = users;
    
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    if (status) {
      if (status === 'verified') {
        filteredUsers = filteredUsers.filter(user => user.verified === true);
      } else if (status === 'unverified') {
        filteredUsers = filteredUsers.filter(user => user.verified === false);
      }
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
      users: paginatedUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalUsers: filteredUsers.length,
        usersPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove sensitive data
    const { password, hashedPassword, ...userData } = user;
    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update user by email
const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updates = req.body;
    
    // Prevent updating sensitive fields
    delete updates.password;
    delete updates.hashedPassword;
    delete updates.id;
    delete updates.email; // Email should not be changed via admin
    
    const updatedUser = await updateUser(email, updates);
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove sensitive data from response
    const { password, hashedPassword, ...userData } = updatedUser;
    
    res.json({ 
      message: 'User updated successfully',
      user: userData 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user by email
const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await findUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const success = await deleteUser(email);
    
    if (success) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Reset user password
const resetUserPassword = async (req, res) => {
  try {
    const { email } = req.params;
    const { newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await changeUserPassword(email, hashedPassword);
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// Get security logs with filtering
const getSecurityLogs = async (req, res) => {
  try {
    const { 
      hours = 24, 
      level = '', 
      event = '', 
      ip = '', 
      riskLevel = '',
      page = 1,
      limit = 50
    } = req.query;
    
    const events = securityLogger.getRecentSecurityEvents(parseInt(hours));
    
    // Apply filters
    let filteredEvents = events;
    
    if (level) {
      filteredEvents = filteredEvents.filter(event => event.level === level);
    }
    
    if (event) {
      filteredEvents = filteredEvents.filter(event => 
        event.event.toLowerCase().includes(event.toLowerCase())
      );
    }
    
    if (ip) {
      filteredEvents = filteredEvents.filter(event => 
        event.details.ip.includes(ip)
      );
    }
    
    if (riskLevel) {
      filteredEvents = filteredEvents.filter(event => 
        event.details.riskLevel === riskLevel
      );
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
    
    res.json({
      logs: paginatedEvents,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredEvents.length / limit),
        totalLogs: filteredEvents.length,
        logsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security logs' });
  }
};

// Get security statistics
const getSecurityStats = async (req, res) => {
  try {
    const { hours = 24 } = req.query;
    const stats = securityLogger.getSecurityStats(parseInt(hours));
    
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security statistics' });
  }
};

// Get system health information
const getSystemHealth = async (req, res) => {
  try {
    const health = {
      timestamp: new Date().toISOString(),
      system: {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        uptime: process.uptime(),
        memory: {
          total: os.totalmem(),
          free: os.freemem(),
          used: os.totalmem() - os.freemem(),
          usage: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2)
        },
        cpu: {
          cores: os.cpus().length,
          loadAverage: os.loadavg()
        }
      },
      process: {
        pid: process.pid,
        memory: process.memoryUsage(),
        uptime: process.uptime()
      },
      logs: {
        securityLogs: securityLogger.getRecentSecurityEvents(1).length,
        totalLogs: securityLogger.getSecurityStats(1).totalEvents
      }
    };
    
    res.json({ health });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch system health' });
  }
};

// Get API request statistics
const getApiStats = async (req, res) => {
  try {
    const { hours = 24 } = req.query;
    const events = securityLogger.getRecentSecurityEvents(parseInt(hours));
    
    const apiStats = {
      totalRequests: events.length,
      requestsByMethod: {},
      requestsByPath: {},
      requestsByStatus: {},
      topIPs: {},
      topUserAgents: {},
      errorRate: 0,
      successRate: 0
    };
    
    let errorCount = 0;
    let successCount = 0;
    
    events.forEach(event => {
      // Count by method and path
      const method = event.details.method || 'UNKNOWN';
      const path = event.details.path || 'UNKNOWN';
      
      apiStats.requestsByMethod[method] = (apiStats.requestsByMethod[method] || 0) + 1;
      apiStats.requestsByPath[path] = (apiStats.requestsByPath[path] || 0) + 1;
      
      // Count by IP and User Agent
      const ip = event.details.ip || 'UNKNOWN';
      const userAgent = event.details.userAgent || 'UNKNOWN';
      
      apiStats.topIPs[ip] = (apiStats.topIPs[ip] || 0) + 1;
      apiStats.topUserAgents[userAgent] = (apiStats.topUserAgents[userAgent] || 0) + 1;
      
      // Count success/error rates
      if (event.event.includes('FAILED') || event.event.includes('ERROR')) {
        errorCount++;
      } else {
        successCount++;
      }
    });
    
    apiStats.errorRate = events.length > 0 ? (errorCount / events.length * 100).toFixed(2) : 0;
    apiStats.successRate = events.length > 0 ? (successCount / events.length * 100).toFixed(2) : 0;
    
    res.json({ apiStats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch API statistics' });
  }
};

// Export logs
const exportLogs = async (req, res) => {
  try {
    const { hours = 24, format = 'json' } = req.query;
    const events = securityLogger.getRecentSecurityEvents(parseInt(hours));
    
    if (format === 'csv') {
      const csvHeader = 'Timestamp,Level,Event,IP,UserAgent,RiskLevel\n';
      const csvData = events.map(event => 
        `${event.timestamp},${event.level},${event.event},${event.details.ip},${event.details.userAgent},${event.details.riskLevel}`
      ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=security-logs-${new Date().toISOString().split('T')[0]}.csv`);
      res.send(csvHeader + csvData);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=security-logs-${new Date().toISOString().split('T')[0]}.json`);
      res.json({ logs: events });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to export logs' });
  }
};

// Get admin dashboard summary
const getDashboardSummary = async (req, res) => {
  try {
    const stats = securityLogger.getSecurityStats(24);
    const recentEvents = securityLogger.getRecentSecurityEvents(1);
    const users = await getAllUsers();
    
    const summary = {
      users: {
        total: users.length,
        verified: users.filter(u => u.verified).length,
        unverified: users.filter(u => !u.verified).length,
        admins: users.filter(u => u.role === 'admin').length
      },
      security: {
        totalEvents: stats.totalEvents,
        highRiskEvents: stats.highRiskEvents,
        mediumRiskEvents: stats.mediumRiskEvents,
        lowRiskEvents: stats.lowRiskEvents,
        recentEvents: recentEvents.length
      },
      system: {
        uptime: process.uptime(),
        memoryUsage: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2),
        timestamp: new Date().toISOString()
      }
    };
    
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard summary' });
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
  resetUserPassword,
  getSecurityLogs,
  getSecurityStats,
  getSystemHealth,
  getApiStats,
  exportLogs,
  getDashboardSummary
}; 