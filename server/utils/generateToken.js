const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
  console.log(userId);
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
