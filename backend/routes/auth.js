const express = require('express');
const router = express.Router();
const { register, login, getUsers, modifyUser, changePassword, verifyEmail, resendVerification } = require('../controllers/authController');
// Resend verification email (public, should be rate limited in production)
router.post('/resend-verification', resendVerification);
// Email verification route (public)
router.get('/verify-email', verifyEmail);
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

// Protect all routes below
router.use(verifyToken);

router.get('/users', getUsers);
router.put('/users/:email', modifyUser);
router.post('/users/:email/change-password', changePassword);

module.exports = router;
