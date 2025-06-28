const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleUser = async (token) => {
  try {
    console.log("came to verify google user");

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    console.log(`payload ${payload}`);

    const { name, email, picture } = payload;

    console.log(`searching for thi email ${email} `);
    let user = await User.findOne({ email });

    console.log(`user got   ${user}`);
    if (!user) return { error: 'Email not registered. Please sign up first.' };

   

    if (!user.photo) {
      user.photo = picture;
      await user.save();
    }

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
      },
      fullUser: user,
    };
  } catch (err) {
    console.error('❌ Google token verification failed:', err);
    return { error: 'Invalid Google token' };
  }
};

module.exports = verifyGoogleUser;
