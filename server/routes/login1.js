// routes/login1.js
const express = require('express');
const router = express.Router();

const verifyUser = require('../utils/verifyUser');
const generateToken = require('../utils/generateToken');

// 🔸 /login1/jwt → JWT Login
router.post('/jwt', async (req, res) => {
  const { email, password } = req.body;

  const { error, user } = await verifyUser(email, password);
  if (error) return res.status(400).json({ message: error });

  const token = generateToken(user._id);
  res.json({
    message: 'JWT Login successful',
    token,
    sucess:true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

// 🔸 /login1/express → Session Login
router.post('/express', async (req, res) => {
  const { email, password } = req.body;

  const { error, user } = await verifyUser(email, password);
  
  if (error) return res.status(400).json({ message: error });

  req.session.userId = user._id;
console.log(`came to expreess login${user}`);
  const expiry = Date.now() + 24 * 60 * 60 * 1000;


  res.json({
    sucess:true,
    message: 'Session created',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      userId: user._id,
      expiry: expiry
      
    }
  });
});

module.exports = router;
