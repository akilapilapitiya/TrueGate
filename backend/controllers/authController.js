
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { getDb } = require('../db');
const { sendVerificationEmail } = require('../utils/mailer');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '15m';

// Helper: find user by email
async function findUserByEmail(email) {
  const db = getDb();
  return await db.collection('users').findOne({ email });
}

// Helper: add user
async function addUser(user) {
  const db = getDb();
  await db.collection('users').insertOne(user);
}

// Helper: update user by email
async function updateUser(email, updates) {
  const db = getDb();
  const result = await db.collection('users').findOneAndUpdate(
    { email },
    { $set: updates },
    { returnDocument: 'after' }
  );
  return result.value;
}

// Helper: get all users (excluding sensitive fields)
async function getAllUsers() {
  const db = getDb();
  return await db.collection('users').find({}, { projection: { hashedPassword: 0 } }).toArray();
}

// Helper: change user password
async function changeUserPassword(email, newHashedPassword) {
  const db = getDb();
  await db.collection('users').updateOne(
    { email },
    { $set: { hashedPassword: newHashedPassword } }
  );
}

// POST /register
async function register(req, res) {
  const { email, password, firstName, lastName, birthDate, gender, role, contactNumber } = req.body;
  // Input validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Weak password' });
  }
  if (!firstName || !lastName || !birthDate || !gender || !contactNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (await findUserByEmail(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  // Get registration IP
  const registrationIp = req.ip || req.connection.remoteAddress;
  // Generate email verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
  const newUser = {
    email,
    hashedPassword,
    firstName,
    lastName,
    birthDate,
    gender,
    role: role || 'user',
    contactNumber,
    loginAttempts: 0,
    lastLogin: null,
    allowedIps: [registrationIp],
    status: 'unverified',
    verificationToken,
    verificationTokenExpires
  };
  await addUser(newUser);
  // Send verification email
  const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;
  const verificationUrl = `${baseUrl}/api/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
  try {
    await sendVerificationEmail(email, verificationUrl);
  } catch (e) {
  }
  return res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
}

// GET /verify-email
async function verifyEmail(req, res) {
  const { token, email } = req.query;
  if (!token || !email) {
    return res.status(400).json({ error: 'Invalid verification link' });
  }
  const user = await findUserByEmail(email);
  if (!user || user.status === 'verified') {
    return res.status(400).json({ error: 'Invalid or already verified' });
  }
  if (
    user.verificationToken !== token ||
    !user.verificationTokenExpires ||
    Date.now() > user.verificationTokenExpires
  ) {
    return res.status(400).json({ error: 'Verification link expired or invalid' });
  }
  await updateUser(email, {
    status: 'verified',
    verificationToken: null,
    verificationTokenExpires: null
  });
  return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
}



// POST /login
async function login(req, res) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!validPassword) {
    await updateUser(email, { loginAttempts: (user.loginAttempts || 0) + 1 });
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  // Save last login time
  const lastLogin = new Date().toISOString();
  // Add login IP to allowedIps if not present
  const loginIp = req.ip || req.connection.remoteAddress;
  const allowedIps = user.allowedIps || [];
  if (!allowedIps.includes(loginIp)) allowedIps.push(loginIp);
  await updateUser(email, {
    loginAttempts: 0,
    lastLogin,
    allowedIps
  });
  const token = jwt.sign(
    { email: user.email, name: user.firstName + ' ' + user.lastName, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
  return res.status(200).json({ message: 'Login successful', token });
}

// GET /users
async function getUsers(req, res) {
  const users = await getAllUsers();
  return res.status(200).json(users);
}

// PUT /users/:email
async function modifyUser(req, res) {
  const { email } = req.params;
  const { firstName, lastName, birthDate, gender, role, contactNumber } = req.body;
  const updates = {};
  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;
  if (birthDate) updates.birthDate = birthDate;
  if (gender) updates.gender = gender;
  if (role) updates.role = role;
  if (contactNumber) updates.contactNumber = contactNumber;
  const updated = await updateUser(email, updates);
  if (!updated) return res.status(404).json({ error: 'User not found' });
  return res.status(200).json({ message: 'User updated', user: updated });
}

// POST /users/:email/change-password
async function changePassword(req, res) {
  const { email } = req.params;
  const { oldPassword, newPassword } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const valid = await bcrypt.compare(oldPassword, user.hashedPassword);
  if (!valid) return res.status(400).json({ error: 'Old password incorrect' });
  const hashed = await bcrypt.hash(newPassword, 12);
  await changeUserPassword(email, hashed);
  return res.status(200).json({ message: 'Password changed successfully' });
}

// JWT verification middleware
async function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    const user = await findUserByEmail(payload.email);
    if (!user) {
      return res.status(403).json({ error: 'Invalid session' });
    }
    req.user = payload;
    next();
  });
}

// POST /resend-verification
// Accepts { email } in body. Does not reveal if email exists. Rate limit this endpoint in production.
async function resendVerification(req, res) {
  const { email } = req.body;
  try {
    if (!email || !validator.isEmail(email)) {
      return res.status(200).json({ message: 'If your account exists and is unverified, a verification email will be sent.' });
    }
    const user = await findUserByEmail(email);
    if (!user || user.status === 'verified') {
      return res.status(200).json({ message: 'If your account exists and is unverified, a verification email will be sent.' });
    }
    // Generate new token and expiry
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
    await updateUser(email, { verificationToken, verificationTokenExpires });
    // Send email
    const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;
    const verificationUrl = `${baseUrl}/api/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
    try {
      await sendVerificationEmail(email, verificationUrl);
    } catch (e) {
    }
    return res.status(200).json({ message: 'If your account exists and is unverified, a verification email will be sent.' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { register, login, getUsers, modifyUser, changePassword, verifyToken, verifyEmail, resendVerification };
