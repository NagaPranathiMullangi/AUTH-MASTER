const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.post('/', async (req, res) => {
  const { name, email, phone, password } = req.body;

  const errors = {};
  if (!name) errors.name = 'Name is required';
  if (!email) errors.email = 'Email is required';
  if (!phone) errors.phone = 'Phone number is required';
  if (!password || password.length < 6)
    errors.password = 'Password must be at least 6 characters';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors ,message:"invalid"});
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ errors: { email: 'Email already registered' },message:"invalid" });





    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ name, email, phone, password:hashedPassword });
    await newUser.save();
    
    return res.status(200).json({ status: "saved", message: "saved successful!" });

  } catch (err) {
    console.error("Database error:", err.message);
    return res.status(400).json({
      status: "validated", // Validation ok
      error: "Database error: " + err.message,
      message: "just validated but not  successful!"
  });}
});

module.exports = router;
