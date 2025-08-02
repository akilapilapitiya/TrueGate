const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { securityLogger } = require('../utils/logger');

// Middleware to ensure admin access
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// GET /api/security/events - Get recent security events
router.get('/events', verifyToken, requireAdmin, (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const events = securityLogger.getRecentSecurityEvents(hours);
    
    res.json({
      success: true,
      data: {
        events,
        count: events.length,
        timeRange: `${hours} hours`
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve security events' });
  }
});

// GET /api/security/stats - Get security statistics
router.get('/stats', verifyToken, requireAdmin, (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const stats = securityLogger.getSecurityStats(hours);
    
    res.json({
      success: true,
      data: {
        ...stats,
        timeRange: `${hours} hours`,
        riskDistribution: {
          high: stats.highRiskEvents,
          medium: stats.mediumRiskEvents,
          low: stats.lowRiskEvents
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve security statistics' });
  }
});

// GET /api/security/events/high-risk - Get only high-risk events
router.get('/events/high-risk', verifyToken, requireAdmin, (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const events = securityLogger.getRecentSecurityEvents(hours);
    const highRiskEvents = events.filter(event => 
      event.details.riskLevel === 'HIGH'
    );
    
    res.json({
      success: true,
      data: {
        events: highRiskEvents,
        count: highRiskEvents.length,
        timeRange: `${hours} hours`
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve high-risk events' });
  }
});

// GET /api/security/events/csrf - Get CSRF violation events
router.get('/events/csrf', verifyToken, requireAdmin, (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const events = securityLogger.getRecentSecurityEvents(hours);
    const csrfEvents = events.filter(event => 
      event.event === 'CSRF_TOKEN_INVALID' || 
      event.event === 'CSRF_TOKEN_MISSING' ||
      event.event === 'CSRF_TOKEN_EXPIRED'
    );
    
    res.json({
      success: true,
      data: {
        events: csrfEvents,
        count: csrfEvents.length,
        timeRange: `${hours} hours`
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve CSRF events' });
  }
});

// GET /api/security/events/auth - Get authentication events
router.get('/events/auth', verifyToken, requireAdmin, (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const events = securityLogger.getRecentSecurityEvents(hours);
    const authEvents = events.filter(event => 
      event.event === 'LOGIN_SUCCESS' || 
      event.event === 'LOGIN_FAILED' ||
      event.event === 'LOGIN_LOCKED' ||
      event.event === 'UNAUTHORIZED_ACCESS'
    );
    
    res.json({
      success: true,
      data: {
        events: authEvents,
        count: authEvents.length,
        timeRange: `${hours} hours`
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve authentication events' });
  }
});

// GET /api/security/events/ip/:ip - Get events from specific IP
router.get('/events/ip/:ip', verifyToken, requireAdmin, (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const targetIP = req.params.ip;
    const events = securityLogger.getRecentSecurityEvents(hours);
    const ipEvents = events.filter(event => 
      event.details.ip === targetIP
    );
    
    res.json({
      success: true,
      data: {
        events: ipEvents,
        count: ipEvents.length,
        ip: targetIP,
        timeRange: `${hours} hours`
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve IP events' });
  }
});

// GET /api/security/events/user/:email - Get events for specific user
router.get('/events/user/:email', verifyToken, requireAdmin, (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const targetEmail = req.params.email;
    const events = securityLogger.getRecentSecurityEvents(hours);
    const userEvents = events.filter(event => 
      event.details.email === targetEmail || 
      event.details.userId === targetEmail
    );
    
    res.json({
      success: true,
      data: {
        events: userEvents,
        count: userEvents.length,
        user: targetEmail,
        timeRange: `${hours} hours`
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user events' });
  }
});

// POST /api/security/log - Manually log a security event (for testing)
router.post('/log', verifyToken, requireAdmin, (req, res) => {
  try {
    const { event, details } = req.body;
    
    if (!event || !details) {
      return res.status(400).json({ error: 'Event and details are required' });
    }
    
    securityLogger.logSecurityEvent(event, details);
    
    res.json({
      success: true,
      message: 'Security event logged successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log security event' });
  }
});

module.exports = router; 