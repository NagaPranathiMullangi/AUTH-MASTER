import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

function LoginBox4({id}) {
  const navigate=useNavigate();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(20);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [message, setMessage] = useState('');
  const inputsRef = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (otpSent && timer === 0) {
      setShowResend(true);
    }
  }, [otpSent, timer]);

  // Submit phone/email to get OTP
  const handlePhoneSubmit = async () => {
    try {
      const res = await axios.post('http://mytestapp.com:5000/api/send-otp', { phone, email });
      if (res.data.success) {
        setOtpSent(true);
        setOtp(['', '', '', '', '', '']); // reset OTP input
        setTimer(20);
        setShowResend(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error sending OTP');
    }
  };

  // Handle digit change
  const handleOtpChange = (value, index) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    try {
      const path = id === "6" ? 'verifyotp/jwt' : id === "7" ? 'verifyotp/express' : null;
      const res = await axios.post(`http://mytestapp.com:5000/api/${path}`, {
        phone,
        email,
        otp: otpValue,
      }, {
        withCredentials: true
      });

      if (res.data.success) {
       
        setLoginSuccess(true);
        if(id=="6"){
          localStorage.setItem('token', res.data.token);
          setMessage(res.data.message);
        }
        else{

          const userID=res.data.user.id;
          const expiry=res.data.user.expiry;
      
          const sessionData = {
              userID,
              expiry
           };
          console.log(sessionData);
          localStorage.setItem('sessionUser', JSON.stringify(sessionData));
          setMessage(res.data.message);


        }
        
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Verification failed');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] justify-center bg-gray-100 p-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Login with OTP</h2>

        {loginSuccess ? (
          <div className="flex flex-col items-center justify-center gap-2 text-green-600 font-semibold text-lg text-center">
          {message} 
          <Logout />
          <button
            onClick={() => navigate("/dashboard")}
            className="w-32 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 hover:text-amber-100 transition"
          >
            Profile
          </button>
        </div>

         
        ) : !otpSent ? (
          <>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <button
              onClick={handlePhoneSubmit}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Request OTP
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => (inputsRef.current[index] = el)}
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(e.target.value, index)}
                  className="w-12 h-12 text-center border rounded text-lg"
                />
              ))}
            </div>

            <div className="text-center text-sm text-gray-500 mb-4">
              {timer > 0 ? `⏳ Time left: ${timer}s` : '⌛ Time expired'}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={timer <= 0}
              className={`w-full text-white p-2 rounded mb-3 ${timer <= 0 ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
              Verify & Proceed
            </button>

            {showResend && (
              <button
                onClick={handlePhoneSubmit}
                className="w-full text-blue-700 border border-blue-700 p-2 rounded hover:bg-blue-50"
              >
                🔄 Resend OTP
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LoginBox4;
