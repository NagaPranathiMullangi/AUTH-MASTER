const express = require('express');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const User = require('../models/User'); // your Mongoose model
const router = express.Router();
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

// 🔹 VERIFY JWT Token
router.get('/jwt', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.json({ success: false, message: 'JWT token missing' });
  }

  const token = authHeader.split(' ')[1];
  
  let decoded; // ✅ Declare outside

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
   // console.log('✅ Verified ID:', decoded);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  }

 // console.log(decoded.userId)

  try {
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

   // console.log('✅ User:', user);
    return res.json({ success: true, user });

  } catch (err) {
    console.error('❌ DB Error:', err);
    return res.status(500).json({ success: false, message: 'Database error' });
  }
});


// 🔹 VERIFY EXPRESS SESSION
router.get('/express', async (req, res) => {

   
    console.log('after came back to profile');
    const userID = req.query.userID;
    console.log('came to express');
   //if (!req.sesssion.userId){
  if (!userID) {

    return res.json({ success: false, message: 'Session not found' });
  }

  //const user = await User.findById(req.session.userId).select('-password');
  const user = await User.findById(userID).select('-password');
  console.log(user);
  if (!user) return res.json({ success: false, message: 'User not found' });

  res.json({ success: true, user });
});

// 🔹 VERIFY FIREBASE AUTH TOKEN
//we verified the firebase profile in frontend only
/*router.post('/firebase', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.json({ success: false, message: 'Firebase ID token missing' });
  }

  const idToken = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    // Optionally, find user in your DB
    let user = await User.findOne({ email });
    
    
if(user){
    res.json({ success: true, user });}

  } catch (err) {
    console.error('Firebase token error:', err);
    res.json({ success: false, message: 'Invalid Firebase token' });
  }
});*/

module.exports = router;
