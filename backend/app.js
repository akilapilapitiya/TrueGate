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

const app = express();
const port = process.env.PORT || 4000;

// Security middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Adjust origin for your frontend
app.use(express.json());
app.use(cookieParser());

// Rate limiting - disabled for development
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });
// app.use(limiter);

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

// Apply security logging to specific routes
app.use('/api', logAuthEvents);
app.use('/api', logRegistrationEvents);
app.use('/api', logEmailVerificationEvents);
app.use('/api', logPasswordResetEvents);
app.use('/api', logPasswordChangeEvents);

// Use routes
app.use('/api', authRoutes);
app.use('/api/security', securityRoutes);

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

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Auth server running at localhost:${port}`);
    console.log(`Security monitoring enabled`);
  });
});
