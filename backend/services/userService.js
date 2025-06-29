const { getDb } = require('../db');

// Find user by email
async function findUserByEmail(email) {
  const db = getDb();
  return await db.collection('users').findOne({ email });
}

// Add user
async function addUser(user) {
  const db = getDb();
  await db.collection('users').insertOne(user);
}

// Update user by email
async function updateUser(email, updates) {
  const db = getDb();
  // Use both options for compatibility, and log the result for debugging
  const result = await db.collection('users').findOneAndUpdate(
    { email },
    { $set: updates },
    { returnDocument: 'after' }
  );
  let updatedUser = result.value;
  if (!updatedUser) {
    // Fallback for older MongoDB servers: fetch the user again
    updatedUser = await db.collection('users').findOne({ email });
  }
  if (updatedUser && updatedUser.hasOwnProperty('hashedPassword')) {
    delete updatedUser.hashedPassword;
  }
  return updatedUser || null;
}

// Get all users (excluding sensitive fields)
async function getAllUsers() {
  const db = getDb();
  return await db.collection('users').find({}, { projection: { hashedPassword: 0 } }).toArray();
}

// Change user password
async function changeUserPassword(email, newHashedPassword) {
  const db = getDb();
  await db.collection('users').updateOne(
    { email },
    { $set: { hashedPassword: newHashedPassword } }
  );
}

module.exports = {
  findUserByEmail,
  addUser,
  updateUser,
  getAllUsers,
  changeUserPassword
};
