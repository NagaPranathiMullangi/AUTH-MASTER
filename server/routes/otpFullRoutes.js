const express = require('express');
const router = express.Router();
const User = require('../models/User');
const client = require('../twilioClient');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 🔹 Send OTP
router.post('/send-otp', async (req, res) => {
  const { phone, email } = req.body;

  try {
    const user = await User.findOne({ phone, email });

    if (!user) {
      return res.json({ success: false, message: 'Enter correct email & phone number' });
    }

    const fullPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({ to: fullPhone, channel: 'sms' });

    res.json({ success: true, message: 'OTP sent successfully' });

  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// 🔹 Common Verification Function
const verifyOtpAndFetchUser = async (phone, email, otp) => {
  const fullPhone = phone.startsWith('+') ? phone : `+91${phone}`;
  const user = await User.findOne({ phone, email });
  if (!user) return { error: 'Invalid user' };

  const result = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks
    .create({ to: fullPhone, code: otp });

  if (result.status !== 'approved') return { error: 'Incorrect OTP or expired' };


  console.log(user);
  return { user };
};

// 🔹 Verify OTP and Return JWT
router.post('/verifyotp/jwt', async (req, res) => {
  const { phone, email, otp } = req.body;

  try {
    const { user, error } = await verifyOtpAndFetchUser(phone, email, otp);
    if (error) return res.json({ success: false, message: error });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, message: 'OTP verified, token generated', token });
  } catch (err) {
    console.error('JWT OTP error:', err.message);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
});

// 🔹 Verify OTP and Create Session
router.post('/verifyotp/express', async (req, res) => {
  const { phone, email, otp } = req.body;

  try {
    const { user, error } = await verifyOtpAndFetchUser(phone, email, otp);
    if (error) return res.json({ success: false, message: error });

    console.log(user);
    req.session.userId = user._id;
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    res.json({ success: true, message: 'OTP verified, session created' ,user: {
      id: user._id,
      name: user.name,
      email: user.email,
      userId: user._id,
      expiry: expiry
      
    }});
  } catch (err) {
    console.error('Session OTP error:', err.message);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
});

module.exports = router;
