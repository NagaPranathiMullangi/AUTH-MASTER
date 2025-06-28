import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import axios from 'axios';

function LoginBox1({ id }) {
  const navigate = useNavigate();
  const loginPath = id === "1" ? '/login1/jwt' : '/login1/express';
  const [success, setSuccess] = useState(false);
console.log(id);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [mailSent, setMailSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    
      console.log(loginPath);
      const res = await axios.post(
        `http://mytestapp.com:5000${loginPath}`,
        { email, password },
        { withCredentials: true }
      );

      setSuccess(true);

      if (id === "1") {
        localStorage.setItem('token', res.data.token);
        setMessage('✅ Token successfully generated for login');
      } else if (id === "2") {
        const userID = res.data.user.id;
        const expiry = res.data.user.expiry;
        const sessionData = { userID, expiry };
        localStorage.setItem('sessionUser', JSON.stringify(sessionData));
        setMessage('✅ Session is created for you');
      }
    } catch (err) {
      setSuccess(false);
      setMessage('❌ Invalid credentials');
      setEmail('');
      setPassword('');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://mytestapp.com:5000/forgot-password', { email });
      setMailSent(true);
    } catch (err) {
      setMessage('Error sending email');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] justify-center bg-gray-100 p-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Login {id}</h2>

        {mailSent ? (
          <div>
            <p className="text-green-600 font-semibold text-center mb-4">
              ✅ Mail sent! Please check your inbox.
            </p>
            <br />
            <button
              onClick={() => navigate('/Page1')}
              className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900"
            >
              Login
            </button>
          </div>
        ) : (
          <>
            {!success && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-600">Email</label>
                  <input
                    type="email"
                    className="w-full border px-3 py-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-600">Password</label>
                  <input
                    type="password"
                    className="w-full border px-3 py-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    className="text-sm text-blue-600 hover:underline cursor-pointer mt-1"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900"
                >
                  Login
                </button>


                <p className="text-center mt-3 text-red-600">
                {message}
              </p>
              </form>
            )}

            {success && (
              <div className=" flex  flex-col gap-4 justify-center items-center ">
              <p className="text-center mt-3 text-green-600">
                {message}
              </p>
              <Logout />
              <button
            onClick={() => navigate("/dashboard")}
            className="w-32 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 hover:text-amber-100 transition"
          >
            profile</button></div>
            )}

            
          </>
        )}
      </div>
    </div>
  );
}

export default LoginBox1;
