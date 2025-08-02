const { securityLogger, SECURITY_EVENTS } = require('../utils/logger');

// Middleware to extract client information
const extractClientInfo = (req) => {
  return {
    ip: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown',
    path: req.path,
    method: req.method,
    userId: req.user?.email || 'anonymous',
    sessionId: req.session?.id || 'none'
  };
};

// Middleware to log all requests for security monitoring
const logSecurityEvents = (req, res, next) => {
  const clientInfo = extractClientInfo(req);
  
  // Log suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /union\s+select/i,
    /drop\s+table/i,
    /exec\s*\(/i,
    /eval\s*\(/i
  ];

  const requestBody = JSON.stringify(req.body);
  const requestQuery = JSON.stringify(req.query);
  const requestHeaders = JSON.stringify(req.headers);

  // Check for malicious input
  const allInput = `${requestBody} ${requestQuery} ${requestHeaders}`;
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allInput)) {
      securityLogger.logMaliciousInput(
        clientInfo.ip,
        clientInfo.userAgent,
        clientInfo.path,
        clientInfo.method,
        allInput,
        `Pattern detected: ${pattern.source}`
      );
      break;
    }
  }

  // Log rate limiting events
  if (req.rateLimit && req.rateLimit.remaining === 0) {
    securityLogger.logRateLimitExceeded(
      clientInfo.ip,
      clientInfo.userAgent,
      clientInfo.path,
      clientInfo.method
    );
  }

  next();
};

// Middleware to log CSRF violations
const logCsrfViolations = (err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN' || err.code === 'EBADCSRF') {
    const clientInfo = extractClientInfo(req);
    
    let tokenStatus = 'unknown';
    if (!req.headers['x-csrf-token']) {
      tokenStatus = 'missing_header';
    } else if (!req.cookies || !req.cookies['csrf-token']) {
      tokenStatus = 'missing_cookie';
    } else if (req.headers['x-csrf-token'] !== req.cookies['csrf-token']) {
      tokenStatus = 'mismatch';
    } else {
      tokenStatus = 'invalid';
    }

    securityLogger.logCsrfViolation(
      clientInfo.ip,
      clientInfo.userAgent,
      clientInfo.path,
      clientInfo.method,
      tokenStatus
    );
  }
  next(err);
};

// Middleware to log authentication events
const logAuthEvents = (req, res, next) => {
  const clientInfo = extractClientInfo(req);
  
  // Log successful logins
  if (req.path === '/api/login' && req.method === 'POST') {
    const originalSend = res.send;
    res.send = function(data) {
      try {
        const response = JSON.parse(data);
        if (response.message === 'Login successful') {
          securityLogger.logLoginSuccess(
            req.body.email,
            clientInfo.ip,
            clientInfo.userAgent
          );
        } else if (response.error && response.error.includes('Invalid email or password')) {
          securityLogger.logLoginFailed(
            req.body.email,
            clientInfo.ip,
            clientInfo.userAgent,
            'invalid_credentials'
          );
        } else if (response.error && response.error.includes('locked')) {
          securityLogger.logLoginLocked(
            req.body.email,
            clientInfo.ip,
            clientInfo.userAgent
          );
        }
      } catch (e) {
        securityLogger.error(`Failed to parse login response JSON: ${e.message}`, {
          error: e,
          data: data
        });
      }
      return originalSend.call(this, data);
    };
  }

  // Log unauthorized access attempts
  if (res.statusCode === 401 || res.statusCode === 403) {
    securityLogger.logUnauthorizedAccess(
      clientInfo.ip,
      clientInfo.userAgent,
      clientInfo.path,
      clientInfo.method,
      clientInfo.userId
    );
  }

  next();
};

// Middleware to log registration events
const logRegistrationEvents = (req, res, next) => {
  if (req.path === '/api/register' && req.method === 'POST') {
    const clientInfo = extractClientInfo(req);
    
    const originalSend = res.send;
    res.send = function(data) {
      try {
        const response = JSON.parse(data);
        if (response.message && response.message.includes('registered successfully')) {
          securityLogger.logSecurityEvent(SECURITY_EVENTS.REGISTRATION_SUCCESS, {
            email: req.body.email,
            ip: clientInfo.ip,
            userAgent: clientInfo.userAgent,
            riskLevel: 'LOW'
          });
        } else if (response.error) {
          securityLogger.logSecurityEvent(SECURITY_EVENTS.REGISTRATION_FAILED, {
            email: req.body.email,
            ip: clientInfo.ip,
            userAgent: clientInfo.userAgent,
            error: response.error,
            riskLevel: 'MEDIUM'
          });
        }
      } catch (e) {
        // Ignore parsing errors
      }
      return originalSend.call(this, data);
    };
  }
  next();
};

// Middleware to log email verification events
const logEmailVerificationEvents = (req, res, next) => {
  if (req.path === '/api/verify-email' && req.method === 'GET') {
    const clientInfo = extractClientInfo(req);
    
    const originalSend = res.send;
    res.send = function(data) {
      try {
        const response = JSON.parse(data);
        if (response.message && response.message.includes('verified successfully')) {
          securityLogger.logSecurityEvent(SECURITY_EVENTS.EMAIL_VERIFIED, {
            email: req.query.email,
            ip: clientInfo.ip,
            userAgent: clientInfo.userAgent,
            riskLevel: 'LOW'
          });
        } else if (response.error) {
          securityLogger.logSecurityEvent(SECURITY_EVENTS.EMAIL_VERIFICATION_FAILED, {
            email: req.query.email,
            ip: clientInfo.ip,
            userAgent: clientInfo.userAgent,
            error: response.error,
            riskLevel: 'MEDIUM'
          });
        }
      } catch (e) {
        // Ignore parsing errors
      }
      return originalSend.call(this, data);
    };
  }
  next();
};

// Middleware to log password reset events
const logPasswordResetEvents = (req, res, next) => {
  if ((req.path === '/api/forgot-password' || req.path === '/api/reset-password') && req.method === 'POST') {
    const clientInfo = extractClientInfo(req);
    
    const originalSend = res.send;
    res.send = function(data) {
      try {
        const response = JSON.parse(data);
        if (req.path === '/api/forgot-password') {
          if (response.message && response.message.includes('reset email sent')) {
            securityLogger.logSecurityEvent(SECURITY_EVENTS.PASSWORD_RESET_REQUESTED, {
              email: req.body.email,
              ip: clientInfo.ip,
              userAgent: clientInfo.userAgent,
              riskLevel: 'MEDIUM'
            });
          }
        } else if (req.path === '/api/reset-password') {
          if (response.message && response.message.includes('password reset successfully')) {
            securityLogger.logSecurityEvent(SECURITY_EVENTS.PASSWORD_RESET_COMPLETED, {
              email: req.body.email,
              ip: clientInfo.ip,
              userAgent: clientInfo.userAgent,
              riskLevel: 'HIGH'
            });
          } else if (response.error) {
            securityLogger.logSecurityEvent(SECURITY_EVENTS.PASSWORD_RESET_FAILED, {
              email: req.body.email,
              ip: clientInfo.ip,
              userAgent: clientInfo.userAgent,
              error: response.error,
              riskLevel: 'HIGH'
            });
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
      return originalSend.call(this, data);
    };
  }
  next();
};

// Middleware to log password change events
const logPasswordChangeEvents = (req, res, next) => {
  if (req.path === '/api/users/change-password' && req.method === 'POST') {
    const clientInfo = extractClientInfo(req);
    
    const originalSend = res.send;
    res.send = function(data) {
      try {
        const response = JSON.parse(data);
        if (response.message && response.message.includes('password changed')) {
          securityLogger.logSecurityEvent(SECURITY_EVENTS.PASSWORD_CHANGED, {
            email: req.user?.email,
            ip: clientInfo.ip,
            userAgent: clientInfo.userAgent,
            riskLevel: 'HIGH'
          });
        }
      } catch (e) {
        // Ignore parsing errors
      }
      return originalSend.call(this, data);
    };
  }
  next();
};

module.exports = {
  logSecurityEvents,
  logCsrfViolations,
  logAuthEvents,
  logRegistrationEvents,
  logEmailVerificationEvents,
  logPasswordResetEvents,
  logPasswordChangeEvents,
  extractClientInfo
}; 