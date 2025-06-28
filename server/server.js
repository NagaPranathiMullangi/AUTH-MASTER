const express = require('express');
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const https = require('https');
const session = require('express-session');

const registerRoute = require('./routes/register');
const forgotPassword = require('./routes/forgot-password');
const resetPassword = require('./routes/reset-password');


dotenv.config(); // 👈 Load .env


const app = express();
app.use(express.json());
connectDB();


app.use(cors({
  origin:['http://mytestapp.com:5174','http://192.168.170.206:5174','http://localhost:5174'],

  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
}));



app.use(
  session({
    secret: process.env.SESSION_SECRET, // should be in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly:true,
      secure:'false',
      sameSite:'lax',
      domain:'mytestapp.com',
      maxAge: 1000 * 60 * 60// 1 hour
    },
  })
);






app.use('/api/register', registerRoute);
app.use('/forgot-password', forgotPassword);
app.use('/reset-password', resetPassword);

app.use('/login1', require('./routes/login1'));
app.use('/login2', require('./routes/login2'));


app.use('/api', require('./routes/otpFullRoutes'));

app.use('/api/verify', require('./routes/profile'));

 // replaces old otpRoutes





const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
