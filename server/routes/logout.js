// routes/logoutRoute.js
const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("❌ Session destroy error:", err);
      return res.status(500).send("Logout failed");
    }
    res.clearCookie('connect.sid'); // 🧽 Clear session cookie
    res.send("✅ Logged out");
  });
});

module.exports = router;
