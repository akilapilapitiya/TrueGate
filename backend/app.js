const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { doubleCsrf } = require('csrf-csrf');

const { connectDb } = require('./db');


const app = express();
const port = process.env.PORT || 4000;

// Security middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5174',
   credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
 })); 
 
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// CSRF protection (Double Submit Cookie Pattern)
const {
  doubleCsrfProtection,
  generateCsrfToken,
  invalidCsrfTokenError
} = doubleCsrf({
  getSecret: (req) => process.env.CSRF_SECRET,
  getSessionIdentifier: (req) => req.ip || 'anon',
  cookieName: 'csrf-token',
  getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'] || req.body._csrf || req.query._csrf
});
app.use(doubleCsrfProtection);

// Expose CSRF token for frontend
app.get('/api/csrf-token', (req, res) => {
  const csrfToken = generateCsrfToken(req, res);
  res.json({ csrfToken });
});

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

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

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN' || err.code === 'EBADCSRF' || err === invalidCsrfTokenError) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next(err);
});

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Auth server running at localhost:${port}`);
  });
});
