
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/mailer');
const { signJwt, JWT_EXPIRY } = require('../utils/auth');
const {
  findUserByEmail,
  addUser,
  updateUser,
  getAllUsers,
  changeUserPassword
} = require('../services/userService');

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
  const registrationIp = req.ip || req.connection.remoteAddress;
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
    verified: false,
    locked: false,
    verificationToken,
    verificationTokenExpires
  };
  await addUser(newUser);
  // Send verification email
  const baseUrl = process.env.BASE_URL || `http://${req.headers.host}`;
  const verificationUrl = `${baseUrl}/api/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
  try {
    await sendVerificationEmail(email, verificationUrl);
  } catch (e) {}
  return res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
}

// GET /verify-email
async function verifyEmail(req, res) {
  const { token, email } = req.query;
  if (!token || !email) {
    return res.status(400).json({ error: 'Invalid verification link' });
  }
  const user = await findUserByEmail(email);
  if (!user || user.verified) {
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
    verified: true,
    verificationToken: null,
    verificationTokenExpires: null
  });
  return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
}



// POST /login
async function login(req, res) {
  const { email, password } = req.body;
  const loginIp = req.ip || req.connection.remoteAddress;
  const user = await findUserByEmail(email);
  if (!user) {
    console.warn(`[Login] Failed attempt: email not found`, { email, ip: loginIp });
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  if (user.locked) {
    console.warn(`[Login] Account locked`, { email, ip: loginIp });
    return res.status(403).json({ error: 'Account is locked due to too many failed login attempts.' });
  }
  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!validPassword) {
    const attempts = (user.loginAttempts || 0) + 1;
    let updates = { loginAttempts: attempts };
    let locked = false;
    if (attempts >= 5) {
      updates.locked = true;
      locked = true;
    }
    await updateUser(email, updates);
    console.warn(`[Login] Failed attempt: wrong password`, { email, ip: loginIp, attempts, locked });
    if (locked) {
      return res.status(403).json({ error: 'Account is locked due to too many failed login attempts.' });
    }
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  // Save last login time
  const lastLogin = new Date().toISOString();
  // Add login IP to allowedIps if not present
  const allowedIps = user.allowedIps || [];
  if (!allowedIps.includes(loginIp)) allowedIps.push(loginIp);
  await updateUser(email, {
    loginAttempts: 0,
    lastLogin,
    allowedIps
  });
  console.log(`[Login] Success`, { email, ip: loginIp });
  const token = signJwt({
    email: user.email,
    name: user.firstName + ' ' + user.lastName,
    role: user.role
  });
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
  return res.status(200).json({ message: 'Login successful', token });
}

// GET /users
async function getUsers(req, res) {
  // Only allow authenticated admin users
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  const users = await getAllUsers();
  return res.status(200).json(users);
}

// PUT /users/:email
async function modifyUser(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const { email } = req.params;
    if (req.user.email !== email) {
      return res.status(403).json({ error: 'You can only modify your own details' });
    }
    // Debug: check if user exists before update
    const user = await findUserByEmail(email);
    console.log('[modifyUser] User lookup:', user);
    const { firstName, lastName, birthDate, gender, contactNumber } = req.body;
    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (birthDate) updates.birthDate = birthDate;
    if (gender) updates.gender = gender;
    if (contactNumber) updates.contactNumber = contactNumber;
    const updated = await updateUser(email, updates);
    if (!updated) {
      console.error(`[modifyUser] User not found or update failed`, { email, updates, userFound: !!user });
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User updated' });
  } catch (err) {
    console.error(`[modifyUser] Error updating user`, { error: err, body: req.body, params: req.params, user: req.user });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// POST /users/:email/change-password
async function changePassword(req, res) {

  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const { oldPassword, newPassword } = req.body;
  const email = req.user.email;

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
  try {
    const payload = require('../utils/auth').verifyJwt(token);
    const user = await findUserByEmail(payload.email);
    if (!user) {
      return res.status(403).json({ error: 'Invalid session' });
    }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// POST /resend-verification 
async function resendVerification(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  const email = req.user.email;
  try {
    if (!email || !validator.isEmail(email)) {
      return res.status(200).json({ message: 'If your account exists and is unverified, a verification email will be sent.' });
    }
    const user = await findUserByEmail(email);
    if (!user || user.verified) {
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
    } catch (e) {}
    return res.status(200).json({ message: 'If your account exists and is unverified, a verification email will be sent.' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { register, login, getUsers, modifyUser, changePassword, verifyToken, verifyEmail, resendVerification };
