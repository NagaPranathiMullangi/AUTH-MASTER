const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, default: '' }, // 👈 Added for Google profile pic
});

module.exports = mongoose.model('User', UserSchema);
