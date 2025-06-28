// routes/login2.js
const express = require('express');
const router = express.Router();
const verifyGoogleUser = require('../utils/verifyGoogleUser');
const generateToken = require('../utils/generateToken');

router.post('/jwt', async (req, res) => {
  const { token } = req.body;
  const { error, user } = await verifyGoogleUser(token);
  if (error) return res.status(401).json({ message: error });

  console.log(user);

 

  const jwtToken = generateToken(user.id);
  res.json({
    message: 'Google JWT login successful',
    token: jwtToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    }
  });
});

router.post('/express', async (req, res) => {
  const { token } = req.body;
  const { error, user } = await verifyGoogleUser(token);
  if (error) return res.status(401).json({ message: error });

  //console.log(user.id);
  req.session.userId = user.id;
  //console.log(`came to expreess login2${user.id}`);
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
  
  
    res.json({
      message: 'Session created',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userId: user.id,
        expiry: expiry
        
      }
    });
});

module.exports = router;
