const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');

const { connectDb } = require('./db');


const app = express();
const port = process.env.PORT || 4000;

// Security middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Adjust origin for your frontend
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// CSRF protection (for cookie-based auth)
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Expose CSRF token for frontend
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
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
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next(err);
});

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Auth server running at localhost:${port}`);
  });
});
