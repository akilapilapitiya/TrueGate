const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { requireCsrf, generateCsrfToken, invalidCsrfTokenError } = require('./middleware/csrfMiddleware');
const { 
  logSecurityEvents, 
  logCsrfViolations, 
  logAuthEvents, 
  logRegistrationEvents, 
  logEmailVerificationEvents, 
  logPasswordResetEvents, 
  logPasswordChangeEvents 
} = require('./middleware/securityMiddleware');

const { connectDb } = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();
const port = process.env.PORT || 4000;

// Security middlewares
app.use(helmet());
app.use(cors({ 
  origin: ['http://localhost:5174', 'http://localhost:5175', 'https://localhost', 'https://truegate.live'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
})); 
 
app.use(express.json());
app.use(cookieParser());

// Rate limiting - disabled for development
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });
// app.use(limiter);

// Health check endpoint (must be before CSRF protection)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'TrueGate Backend'
  });
});

// Security logging middleware (must be before CSRF protection)
app.use(logSecurityEvents);

// Expose CSRF token for frontend (must be before CSRF protection)
app.get('/api/csrf-token', (req, res) => {
  try {
    const csrfToken = generateCsrfToken(req, res);
    console.log('CSRF Token Generated:', csrfToken ? 'Success' : 'Failed');
    console.log('CSRF Cookie Set:', res.getHeader('Set-Cookie') ? 'Yes' : 'No');
    res.json({ csrfToken });
  } catch (error) {
    console.error('CSRF Token Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate CSRF token' });
  }
});

// Apply CSRF protection to state-changing operations
app.use(requireCsrf);

// Import routes
const authRoutes = require('./routes/auth');
const securityRoutes = require('./routes/security');
const performanceRoutes = require('./routes/performance');
const adminRoutes = require('./routes/admin');

// Import performance monitoring middleware
const { monitorApiCall } = require('./controllers/performanceController');

// Apply security logging to specific routes
app.use('/api', logAuthEvents);
app.use('/api', logRegistrationEvents);
app.use('/api', logEmailVerificationEvents);
app.use('/api', logPasswordResetEvents);
app.use('/api', logPasswordChangeEvents);

// Apply performance monitoring to all API routes
app.use('/api', monitorApiCall);

// Use routes
app.use('/api', authRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/admin', adminRoutes);

// Debug endpoint for testing filtering (no auth required)
app.get('/debug/recent-calls', (req, res) => {
  const { getRecentApiCalls } = require('./controllers/performanceController');
  getRecentApiCalls(req, res);
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'TrueGate API Documentation',
  customFavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    deepLinking: true
  }
}));

// Enforce HTTPS except on localhost
app.use((req, res, next) => {
  if (
    req.headers['x-forwarded-proto'] !== 'https' &&
    req.hostname !== 'localhost' &&
    req.hostname !== '127.0.0.1'
  ) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// Error handling middleware
app.use(logCsrfViolations);
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN' || err.code === 'EBADCSRF' || err === invalidCsrfTokenError) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server with or without database
const startServer = async () => {
  try {
    await connectDb();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.log('⚠️  Database connection failed, running without database');
    console.log('Performance monitoring will work with in-memory storage');
  }
  
  app.listen(port, () => {
    console.log(`🚀 Auth server running at localhost:${port}`);
    console.log(`🔒 Security monitoring enabled`);
    console.log(`📊 Performance monitoring enabled`);
  });
};

startServer();
