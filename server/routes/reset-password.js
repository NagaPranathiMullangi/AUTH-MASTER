const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // ✅ import the model
require('dotenv').config();

router.post('/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET); // ✅ check token
    const hashed = await bcrypt.hash(newPassword, 10); // ✅ hash password
    const result = await User.updateOne({ email }, { password: hashed }); // ✅ update DB
    res.json({ message: 'Password updated' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
