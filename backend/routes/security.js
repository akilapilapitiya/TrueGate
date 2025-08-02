const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { securityLogger } = require('../utils/logger');

/**
 * @swagger
 * tags:
 *   name: Security
 *   description: Security monitoring and logging endpoints (admin only)
 */

// Middleware to ensure admin access
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

/**
 * @swagger
 * /api/security/events:
 *   get:
 *     summary: Get recent security events
 *     tags: [Security]
 *     description: Retrieve recent security events (admin only)
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           default: 24
 *         description: Number of hours to look back
 *         example: 24
 *     responses:
 *       200:
 *         description: Security events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     events:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/SecurityLog'
 *                     count:
 *                       type: integer
 *                       example: 15
 *                     timeRange:
 *                       type: string
 *                       example: "24 hours"
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/security/stats:
 *   get:
 *     summary: Get security statistics
 *     tags: [Security]
 *     description: Retrieve security statistics and metrics (admin only)
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           default: 24
 *         description: Number of hours to look back
 *         example: 24
 *     responses:
 *       200:
 *         description: Security statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalEvents:
 *                       type: integer
 *                       example: 150
 *                     highRiskEvents:
 *                       type: integer
 *                       example: 5
 *                     mediumRiskEvents:
 *                       type: integer
 *                       example: 25
 *                     lowRiskEvents:
 *                       type: integer
 *                       example: 120
 *                     timeRange:
 *                       type: string
 *                       example: "24 hours"
 *                     riskDistribution:
 *                       type: object
 *                       properties:
 *                         high:
 *                           type: integer
 *                           example: 5
 *                         medium:
 *                           type: integer
 *                           example: 25
 *                         low:
 *                           type: integer
 *                           example: 120
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
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