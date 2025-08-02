const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { register, login, getUsers, modifyUser, changePassword, verifyEmail, resendVerification, forgotPassword, resetPassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Rate limiting for resend-verification (1 request per minute per IP)
const resendVerificationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // 1 request per minute
  message: { error: 'Too many resend verification requests. Please wait 1 minute before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {

    const userEmail = req.user?.email || 'anonymous';
    return `${req.ip}-${userEmail}`;
  }
});

// Public routes (no authentication required)
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/verify-email', verifyEmail);

// Protected routes (authentication required)
router.use(verifyToken);

router.post('/resend-verification', resendVerificationLimiter, resendVerification);
router.get('/users', getUsers);
router.put('/users/:email', modifyUser);
router.post('/users/change-password', changePassword);

module.exports = router;
