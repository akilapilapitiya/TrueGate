const { getDb } = require('../db');

// Find user by email
async function findUserByEmail(email) {
  try {
    const db = getDb();
    return await db.collection('users').findOne({ email });
  } catch (error) {
    console.log('⚠️  Database not available for user lookup:', error.message);
    return null;
  }
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
  return await db.collection('users').find({}, { projection: { hashedPassword: 0, verificationToken: 0, verificationTokenExpires: 0 } }).toArray();
}

// Change user password
async function changeUserPassword(email, newHashedPassword) {
  const db = getDb();
  await db.collection('users').updateOne(
    { email },
    { $set: { hashedPassword: newHashedPassword } }
  );
}

// Set password reset token and expiry
async function setResetToken(email, token, expires) {
  const db = getDb();
  await db.collection('users').updateOne(
    { email },
    { $set: { resetPasswordToken: token, resetPasswordExpires: expires } }
  );
}

// Find user by reset token
async function findUserByResetToken(token) {
  const db = getDb();
  return await db.collection('users').findOne({ resetPasswordToken: token });
}

// Clear password reset token and expiry
async function clearResetToken(email) {
  const db = getDb();
  await db.collection('users').updateOne(
    { email },
    { $unset: { resetPasswordToken: "", resetPasswordExpires: "" } }
  );
}

// Delete user by email
async function deleteUser(email) {
  try {
    const db = getDb();
    const result = await db.collection('users').deleteOne({ email });
    return result.deletedCount > 0;
  } catch (error) {
    console.log('⚠️  Database not available for user deletion:', error.message);
    return false;
  }
}

module.exports = {
  findUserByEmail,
  addUser,
  updateUser,
  getAllUsers,
  changeUserPassword,
  setResetToken,
  findUserByResetToken,
  clearResetToken,
  deleteUser
};
