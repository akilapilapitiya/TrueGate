const { doubleCsrf } = require('csrf-csrf');

// CSRF protection configuration
const csrfConfig = {
  getSecret: (req) => process.env.CSRF_SECRET,
  getSessionIdentifier: (req) => req.ip || 'anon',
  cookieName: 'csrf-token',
  cookieOptions: {
    sameSite: 'lax', // Use lax for development
    secure: false, // Use false for development
    httpOnly: false, // CSRF cookie must be readable by JS for double submit
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/' // Ensure cookie is available for all paths
  },
  getCsrfTokenFromRequest: (req) => {
    try {
      // Require token in both header and cookie
      const headerToken = req.headers['x-csrf-token'];
      const cookieToken = req.cookies && req.cookies['csrf-token'] ? req.cookies['csrf-token'] : null;
      
      if (!headerToken || !cookieToken || headerToken !== cookieToken) {
        console.warn(
          `CSRF token validation failed for request from IP ${req.ip || 'unknown'} to ${req.originalUrl || req.url}. ` +
          `Header token: ${headerToken ? '[present]' : '[missing]'}, Cookie token: ${cookieToken ? '[present]' : '[missing]'}`
        );
        return null;
      }
      return headerToken;
    } catch (error) {
      console.error('CSRF token validation error:', error);
      return null;
    }
  },
  size: 64
};

// Create CSRF protection middleware
const { doubleCsrfProtection: csrfProtection, generateCsrfToken, invalidCsrfTokenError } = doubleCsrf(csrfConfig);

// Middleware to skip CSRF for certain routes
const skipCsrfForRoutes = (req, res, next) => {
  const skipRoutes = [
    '/api/verify-email', // GET request for email verification
    '/api/csrf-token',   // CSRF token generation endpoint
    '/api/reset-password' // Public password reset endpoint
  ];
  
  if (skipRoutes.includes(req.path)) {
    return next();
  }
  
  // Apply CSRF protection to all other routes
  csrfProtection(req, res, next);
};

// Middleware to require CSRF for state-changing operations
const requireCsrf = (req, res, next) => {
  const csrfRequiredRoutes = [
    '/api/register',
    '/api/login', 
    '/api/forgot-password',
    '/api/resend-verification',
    '/api/users/:email',
    '/api/users/change-password'
  ];
  
  const isCsrfRequired = csrfRequiredRoutes.some(route => {
    // Simple pattern matching for route parameters
    const routePattern = route.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(req.path) && req.method !== 'GET';
  });
  
  if (isCsrfRequired) {
    return csrfProtection(req, res, next);
  }
  
  next();
};

module.exports = {
  csrfProtection,
  generateCsrfToken,
  invalidCsrfTokenError,
  skipCsrfForRoutes,
  requireCsrf
}; 