const express = require('express');
const router = express.Router();
const { verifyAdmin, logAdminAction } = require('../middleware/adminMiddleware');
const { 
  getUsers, 
  getUserByEmail, 
  updateUserByEmail, 
  deleteUserByEmail, 
  resetUserPassword,
  toggleUserLock,
  resetLoginAttempts,
  getSecurityLogs,
  getSecurityStats,
  getSystemHealth,
  getApiStats,
  exportLogs,
  getDashboardSummary
} = require('../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin dashboard and management endpoints
 */

// Apply admin middleware to all routes
router.use(verifyAdmin);
router.use(logAdminAction);

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard summary
 *     tags: [Admin]
 *     description: Get overview statistics for admin dashboard
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         verified:
 *                           type: integer
 *                         unverified:
 *                           type: integer
 *                         admins:
 *                           type: integer
 *                     security:
 *                       type: object
 *                       properties:
 *                         totalEvents:
 *                           type: integer
 *                         highRiskEvents:
 *                           type: integer
 *                         mediumRiskEvents:
 *                           type: integer
 *                         lowRiskEvents:
 *                           type: integer
 *                         recentEvents:
 *                           type: integer
 *                     system:
 *                       type: object
 *                       properties:
 *                         uptime:
 *                           type: number
 *                         memoryUsage:
 *                           type: string
 *                         timestamp:
 *                           type: string
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/dashboard', getDashboardSummary);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users with pagination and filtering
 *     tags: [Admin]
 *     description: Retrieve paginated list of users with filtering options
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for email, first name, or last name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by user role
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [verified, unverified]
 *         description: Filter by verification status
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalUsers:
 *                       type: integer
 *                     usersPerPage:
 *                       type: integer
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /api/admin/users/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Admin]
 *     description: Retrieve specific user information
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: User email
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/users/:email', getUserByEmail);

/**
 * @swagger
 * /api/admin/users/{email}:
 *   put:
 *     summary: Update user by email
 *     tags: [Admin]
 *     description: Update user information (admin only)
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: User email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *               gender:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               role:
 *                 type: string
 *               verified:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.put('/users/:email', updateUserByEmail);

/**
 * @swagger
 * /api/admin/users/{email}:
 *   delete:
 *     summary: Delete user by email
 *     tags: [Admin]
 *     description: Delete user account (admin only)
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: User email
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.delete('/users/:email', deleteUserByEmail);

/**
 * @swagger
 * /api/admin/users/{email}/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Admin]
 *     description: Reset user password to new value (admin only)
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: User email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/users/:email/reset-password', resetUserPassword);

/**
 * @swagger
 * /api/admin/users/{email}/toggle-lock:
 *   post:
 *     summary: Lock or unlock user
 *     tags: [Admin]
 *     description: Lock or unlock a user account
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: User email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               locked:
 *                 type: boolean
 *                 description: Whether to lock or unlock the user
 *     responses:
 *       200:
 *         description: User locked/unlocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/users/:email/toggle-lock', toggleUserLock);

/**
 * @swagger
 * /api/admin/users/{email}/reset-login-attempts:
 *   post:
 *     summary: Reset user login attempts
 *     tags: [Admin]
 *     description: Reset user login attempts and unblock account
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: User email
 *     responses:
 *       200:
 *         description: Login attempts reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/users/:email/reset-login-attempts', resetLoginAttempts);

/**
 * @swagger
 * /api/admin/logs:
 *   get:
 *     summary: Get security logs with filtering
 *     tags: [Admin]
 *     description: Retrieve security logs with pagination and filtering options
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           default: 24
 *         description: Hours to look back for logs
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Filter by log level
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Filter by event type
 *       - in: query
 *         name: ip
 *         schema:
 *           type: string
 *         description: Filter by IP address
 *       - in: query
 *         name: riskLevel
 *         schema:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *         description: Filter by risk level
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of logs per page
 *     responses:
 *       200:
 *         description: Security logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       level:
 *                         type: string
 *                       event:
 *                         type: string
 *                       details:
 *                         type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalLogs:
 *                       type: integer
 *                     logsPerPage:
 *                       type: integer
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/logs', getSecurityLogs);

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get security statistics
 *     tags: [Admin]
 *     description: Retrieve security statistics for the specified time period
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           default: 24
 *         description: Hours to look back for statistics
 *     responses:
 *       200:
 *         description: Security statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalEvents:
 *                       type: integer
 *                     highRiskEvents:
 *                       type: integer
 *                     mediumRiskEvents:
 *                       type: integer
 *                     lowRiskEvents:
 *                       type: integer
 *                     eventTypes:
 *                       type: object
 *                     topIPs:
 *                       type: object
 *                     topUserAgents:
 *                       type: object
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/stats', getSecurityStats);

/**
 * @swagger
 * /api/admin/health:
 *   get:
 *     summary: Get system health information
 *     tags: [Admin]
 *     description: Retrieve detailed system health and performance metrics
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     responses:
 *       200:
 *         description: System health information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 health:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       type: string
 *                     system:
 *                       type: object
 *                       properties:
 *                         platform:
 *                           type: string
 *                         arch:
 *                           type: string
 *                         nodeVersion:
 *                           type: string
 *                         uptime:
 *                           type: number
 *                         memory:
 *                           type: object
 *                           properties:
 *                             total:
 *                               type: number
 *                             free:
 *                               type: number
 *                             used:
 *                               type: number
 *                             usage:
 *                               type: string
 *                         cpu:
 *                           type: object
 *                           properties:
 *                             cores:
 *                               type: integer
 *                             loadAverage:
 *                               type: array
 *                               items:
 *                                 type: number
 *                     process:
 *                       type: object
 *                       properties:
 *                         pid:
 *                           type: integer
 *                         memory:
 *                           type: object
 *                         uptime:
 *                           type: number
 *                     logs:
 *                       type: object
 *                       properties:
 *                         securityLogs:
 *                           type: integer
 *                         totalLogs:
 *                           type: integer
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/health', getSystemHealth);

/**
 * @swagger
 * /api/admin/api-stats:
 *   get:
 *     summary: Get API request statistics
 *     tags: [Admin]
 *     description: Retrieve API request statistics and analytics
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           default: 24
 *         description: Hours to look back for API statistics
 *     responses:
 *       200:
 *         description: API statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiStats:
 *                   type: object
 *                   properties:
 *                     totalRequests:
 *                       type: integer
 *                     requestsByMethod:
 *                       type: object
 *                     requestsByPath:
 *                       type: object
 *                     requestsByStatus:
 *                       type: object
 *                     topIPs:
 *                       type: object
 *                     topUserAgents:
 *                       type: object
 *                     errorRate:
 *                       type: string
 *                     successRate:
 *                       type: string
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/api-stats', getApiStats);

/**
 * @swagger
 * /api/admin/export-logs:
 *   get:
 *     summary: Export security logs
 *     tags: [Admin]
 *     description: Export security logs in JSON or CSV format
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: query
 *         name: hours
 *         schema:
 *           type: integer
 *           default: 24
 *         description: Hours to look back for logs
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *           default: json
 *         description: Export format
 *     responses:
 *       200:
 *         description: Logs exported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logs:
 *                   type: array
 *           text/csv:
 *             schema:
 *               type: string
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/export-logs', exportLogs);

module.exports = router; 