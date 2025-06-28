// utils/verifyUser.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const verifyUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return { error: 'Invalid email' };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: 'Invalid password' };

  return { user };
};

module.exports = verifyUser;
