const fs = require('fs');
const path = require('path');

// Log levels for different types of events
const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN', 
  ERROR: 'ERROR',
  SECURITY: 'SECURITY',
  AUDIT: 'AUDIT'
};

// Security event types
const SECURITY_EVENTS = {
  // Authentication events
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_LOCKED: 'LOGIN_LOCKED',
  LOGOUT: 'LOGOUT',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  
  // Registration events
  REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
  REGISTRATION_FAILED: 'REGISTRATION_FAILED',
  EMAIL_VERIFIED: 'EMAIL_VERIFIED',
  EMAIL_VERIFICATION_FAILED: 'EMAIL_VERIFICATION_FAILED',
  
  // Password events
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
  PASSWORD_RESET_REQUESTED: 'PASSWORD_RESET_REQUESTED',
  PASSWORD_RESET_COMPLETED: 'PASSWORD_RESET_COMPLETED',
  PASSWORD_RESET_FAILED: 'PASSWORD_RESET_FAILED',
  
  // CSRF events
  CSRF_TOKEN_MISSING: 'CSRF_TOKEN_MISSING',
  CSRF_TOKEN_INVALID: 'CSRF_TOKEN_INVALID',
  CSRF_TOKEN_EXPIRED: 'CSRF_TOKEN_EXPIRED',
  
  // Rate limiting events
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Authorization events
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  
  // Input validation events
  INVALID_INPUT: 'INVALID_INPUT',
  MALICIOUS_INPUT: 'MALICIOUS_INPUT',
  
  // System events
  DATABASE_ERROR: 'DATABASE_ERROR',
  EMAIL_SEND_FAILED: 'EMAIL_SEND_FAILED',
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR'
};

class SecurityLogger {
  constructor() {
    this.logDir = path.join(__dirname, '../logs');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getLogFileName(level) {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `${level.toLowerCase()}-${date}.log`);
  }

  formatLogEntry(level, event, details) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      event,
      details: {
        ...details,
        userAgent: details.userAgent || 'unknown',
        ip: details.ip || 'unknown',
        userId: details.userId || 'anonymous',
        sessionId: details.sessionId || 'none'
      }
    };

    return JSON.stringify(logEntry) + '\n';
  }

  writeLog(level, event, details) {
    try {
      const logEntry = this.formatLogEntry(level, event, details);
      const logFile = this.getLogFileName(level);
      
      fs.appendFileSync(logFile, logEntry);
      
      // Also log to console in development
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[${level}] ${event}:`, details);
      }
    } catch (error) {
      console.error('Logging failed:', error);
    }
  }

  // High-risk security events (immediate attention required)
  logSecurityEvent(event, details) {
    this.writeLog(LOG_LEVELS.SECURITY, event, details);
  }

  // Authentication events
  logLoginSuccess(email, ip, userAgent) {
    this.logSecurityEvent(SECURITY_EVENTS.LOGIN_SUCCESS, {
      email,
      ip,
      userAgent,
      riskLevel: 'LOW'
    });
  }

  logLoginFailed(email, ip, userAgent, reason) {
    this.logSecurityEvent(SECURITY_EVENTS.LOGIN_FAILED, {
      email,
      ip,
      userAgent,
      reason,
      riskLevel: 'MEDIUM'
    });
  }

  logLoginLocked(email, ip, userAgent) {
    this.logSecurityEvent(SECURITY_EVENTS.LOGIN_LOCKED, {
      email,
      ip,
      userAgent,
      riskLevel: 'HIGH'
    });
  }

  // CSRF events
  logCsrfViolation(ip, userAgent, path, method, tokenStatus) {
    this.logSecurityEvent(SECURITY_EVENTS.CSRF_TOKEN_INVALID, {
      ip,
      userAgent,
      path,
      method,
      tokenStatus,
      riskLevel: 'HIGH'
    });
  }

  // Rate limiting events
  logRateLimitExceeded(ip, userAgent, path, method) {
    this.logSecurityEvent(SECURITY_EVENTS.RATE_LIMIT_EXCEEDED, {
      ip,
      userAgent,
      path,
      method,
      riskLevel: 'MEDIUM'
    });
  }

  // Authorization events
  logUnauthorizedAccess(ip, userAgent, path, method, userId) {
    this.logSecurityEvent(SECURITY_EVENTS.UNAUTHORIZED_ACCESS, {
      ip,
      userAgent,
      path,
      method,
      userId,
      riskLevel: 'HIGH'
    });
  }

  // Input validation events
  logMaliciousInput(ip, userAgent, path, method, input, reason) {
    this.logSecurityEvent(SECURITY_EVENTS.MALICIOUS_INPUT, {
      ip,
      userAgent,
      path,
      method,
      input: this.sanitizeInput(input),
      reason,
      riskLevel: 'HIGH'
    });
  }

  // Sanitize sensitive input for logging
  sanitizeInput(input) {
    if (typeof input === 'string') {
      // Remove sensitive data patterns
      return input
        .replace(/password["']?\s*[:=]\s*["']?[^"',}\]]+/gi, 'password":"***"')
        .replace(/token["']?\s*[:=]\s*["']?[^"',}\]]+/gi, 'token":"***"')
        .replace(/secret["']?\s*[:=]\s*["']?[^"',}\]]+/gi, 'secret":"***"')
        .substring(0, 500); // Limit length
    }
    return '***';
  }

  // Audit events (for compliance)
  logAuditEvent(event, details) {
    this.writeLog(LOG_LEVELS.AUDIT, event, details);
  }

  // Regular application events
  logInfo(event, details) {
    this.writeLog(LOG_LEVELS.INFO, event, details);
  }

  logWarn(event, details) {
    this.writeLog(LOG_LEVELS.WARN, event, details);
  }

  logError(event, details) {
    this.writeLog(LOG_LEVELS.ERROR, event, details);
  }

  // Get recent security events for monitoring
  getRecentSecurityEvents(hours = 24) {
    try {
      const events = [];
      const date = new Date();
      date.setHours(date.getHours() - hours);
      
      const logFile = this.getLogFileName(LOG_LEVELS.SECURITY);
      if (fs.existsSync(logFile)) {
        const content = fs.readFileSync(logFile, 'utf8');
        const lines = content.trim().split('\n');
        
        for (const line of lines) {
          if (line) {
            const entry = JSON.parse(line);
            if (new Date(entry.timestamp) >= date) {
              events.push(entry);
            }
          }
        }
      }
      
      return events;
    } catch (error) {
      console.error('Error reading security events:', error);
      return [];
    }
  }

  // Get security statistics
  getSecurityStats(hours = 24) {
    const events = this.getRecentSecurityEvents(hours);
    const stats = {
      totalEvents: events.length,
      highRiskEvents: 0,
      mediumRiskEvents: 0,
      lowRiskEvents: 0,
      eventTypes: {},
      topIPs: {},
      topUserAgents: {}
    };

    events.forEach(event => {
      const riskLevel = event.details.riskLevel || 'UNKNOWN';
      if (riskLevel === 'HIGH') stats.highRiskEvents++;
      else if (riskLevel === 'MEDIUM') stats.mediumRiskEvents++;
      else if (riskLevel === 'LOW') stats.lowRiskEvents++;

      stats.eventTypes[event.event] = (stats.eventTypes[event.event] || 0) + 1;
      stats.topIPs[event.details.ip] = (stats.topIPs[event.details.ip] || 0) + 1;
      stats.topUserAgents[event.details.userAgent] = (stats.topUserAgents[event.details.userAgent] || 0) + 1;
    });

    return stats;
  }
}

// Create singleton instance
const securityLogger = new SecurityLogger();

module.exports = {
  securityLogger,
  LOG_LEVELS,
  SECURITY_EVENTS
}; 