const express = require('express');
const router = express.Router();
const { 
  getPerformanceMetrics, 
  getRecentApiCalls, 
  getSystemHealth, 
  getPerformanceHistory 
} = require('../controllers/performanceController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/performance/metrics:
 *   get:
 *     summary: Get API performance metrics
 *     description: Retrieve comprehensive API performance metrics including response times, error rates, and system stats
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Performance metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     mainMetrics:
 *                       type: object
 *                       properties:
 *                         apiResponseTime:
 *                           type: string
 *                         uptime:
 *                           type: string
 *                         totalRequests:
 *                           type: string
 *                         errorRate:
 *                           type: string
 *                     systemMetrics:
 *                       type: object
 *                       properties:
 *                         cpu:
 *                           type: number
 *                         memory:
 *                           type: number
 *                         storage:
 *                           type: number
 *                         network:
 *                           type: number
 *                     summary:
 *                       type: object
 *                       properties:
 *                         dataTransferred:
 *                           type: string
 *                         slaCompliance:
 *                           type: string
 *                         securityEvents:
 *                           type: number
 *                         avgResponseTime:
 *                           type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/metrics', verifyToken, verifyAdmin, getPerformanceMetrics);

// Temporary test endpoint (no auth required)
router.get('/test-recent-calls', getRecentApiCalls);

/**
 * @swagger
 * /api/performance/recent-calls:
 *   get:
 *     summary: Get recent API calls
 *     description: Retrieve recent API calls with response times and status codes
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of recent calls to retrieve
 *     responses:
 *       200:
 *         description: Recent API calls retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       endpoint:
 *                         type: string
 *                       method:
 *                         type: string
 *                       status:
 *                         type: number
 *                       responseTime:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/recent-calls', verifyToken, verifyAdmin, getRecentApiCalls);

/**
 * @swagger
 * /api/performance/health:
 *   get:
 *     summary: Get system health status
 *     description: Retrieve overall system health status and any issues
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System health status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [healthy, warning, critical]
 *                     issues:
 *                       type: array
 *                       items:
 *                         type: string
 *                     metrics:
 *                       type: object
 *                       properties:
 *                         system:
 *                           type: object
 *                         api:
 *                           type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/health', verifyToken, verifyAdmin, getSystemHealth);

/**
 * @swagger
 * /api/performance/history:
 *   get:
 *     summary: Get performance history
 *     description: Retrieve historical performance data grouped by hour
 *     tags: [Performance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           default: 24
 *         description: Number of hours to look back
 *     responses:
 *       200:
 *         description: Performance history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       requests:
 *                         type: number
 *                       errors:
 *                         type: number
 *                       avgResponseTime:
 *                         type: number
 *                       errorRate:
 *                         type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/history', verifyToken, verifyAdmin, getPerformanceHistory);

module.exports = router; 