const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Admin role verification middleware
function verifyAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    // Check if user has admin role
    if (!req.user.role || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Admin audit logging middleware
function logAdminAction(req, res, next) {
  const originalSend = res.send;
  
  res.send = function(data) {
    try {
      const response = JSON.parse(data);
      
      // Log admin actions for audit purposes
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const { securityLogger } = require('../utils/logger');
        securityLogger.logAuditEvent('ADMIN_ACTION', {
          adminId: req.user?.email || 'unknown',
          action: `${req.method} ${req.path}`,
          ip: req.ip || req.connection.remoteAddress,
          userAgent: req.headers['user-agent'],
          requestBody: req.body,
          responseStatus: res.statusCode,
          timestamp: new Date().toISOString()
        });
      }
    } catch (e) {
      // Ignore parsing errors
    }
    
    return originalSend.call(this, data);
  };
  
  next();
}

module.exports = { verifyAdmin, logAdminAction }; 