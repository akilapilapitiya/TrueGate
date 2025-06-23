const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, addUser } = require('../models/userStore');

const JWT_SECRET = process.env.JWT_SECRET;

// POST /register
async function register(req, res) {
  const { email, password, name } = req.body;

  if (findUserByEmail(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, name, password: hashedPassword };

  addUser(newUser);

  return res.status(201).json({ message: 'User registered successfully' });
}

// POST /login
async function login(req, res) {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return res.status(200).json({ message: 'Login successful', token });
}

module.exports = { register, login };
