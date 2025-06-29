const { v4: uuidv4 } = require('uuid');

const users = [];

function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function addUser(user) {
  user.id = user.id || uuidv4();
  user.allowedIps = user.allowedIps || [];
  user.loginAttempts = user.loginAttempts || 0;
  users.push(user);
}

function findUserById(id) {
  return users.find((user) => user.id === id);
}

function getAllUsers() {
  return users.map(({ password, hashedPassword, ...rest }) => rest);
}

function updateUser(email, updates) {
  const user = findUserByEmail(email);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
}

function changeUserPassword(email, newPassword) {
  const user = findUserByEmail(email);
  if (!user) return false;
  user.hashedPassword = newPassword;
  return true;
}

function updateUserById(id, updates) {
  const user = findUserById(id);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
}

function changeUserPasswordById(id, newPassword) {
  const user = findUserById(id);
  if (!user) return false;
  user.hashedPassword = newPassword;
  return true;
}

module.exports = { findUserByEmail, addUser, getAllUsers, updateUserById, changeUserPasswordById, findUserById, updateUser, changeUserPassword };
