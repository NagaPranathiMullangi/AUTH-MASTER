// As
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const sendMail = require('../utils/sendMail'); 
require('dotenv').config(); // Loads environment variables from .env


router.post('/', async (req, res) => {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  
    const resetLink = `http://mytestapp.com:5174/reset-password/${token}`;

  
    await sendMail({
      to: email,
      subject: 'Reset Your Password',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });
  
    res.json({ success: true });
  });
  module.exports = router;