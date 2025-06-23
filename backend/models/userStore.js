//temporary

const users = [];

function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function addUser(user) {
  users.push(user);
}

module.exports = { findUserByEmail, addUser };
