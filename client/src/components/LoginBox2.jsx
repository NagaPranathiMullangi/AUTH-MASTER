import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

function LoginBox2({id}) {
  const navigate=useNavigate();
  const [message, setMessage] = useState(null);
  const [success,setSuccess]=useState(false);
  
  const loginPath = id === "3"? '/login2/jwt' : '/login2/express';
 // console.log(loginPath);
  // ✅ Google Login success callback


  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('✅ Google login success:', credentialResponse);
    setMessage(null);

    try {
      const res = await axios.post(`http://mytestapp.com:5000${loginPath}`, {
        token: credentialResponse.credential,
      }, {
        withCredentials: true
      });

      //console.log('🔐 Backend response:', res.data);
      setSuccess(true);

     if( id === "3" ){
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));}
    else{


      //console.log(res.data.user);
      const userID=res.data.user.id;
      const expiry=res.data.user.expiry;
      
      const sessionData = {
        userID,
        expiry
      };
      console.log(sessionData);
      localStorage.setItem('sessionUser', JSON.stringify(sessionData));
    }

      // ✅ Show success message
      setMessage(res.data.message);
      
    } catch (err) {
      console.error('❌ Backend error:', err);

      const errorMessage =
        err.response?.data?.message || 'Google login failed. Please try again.';
      setMessage(errorMessage);
     
    }
  };

  const handleGoogleFailure = () => {
    setMessage('Google login was cancelled or failed.');
    
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] justify-center bg-gray-100 p-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">


        <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Login {id}</h2>

        {/* Google Login Button */}
        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
          />
        </div>

        <br/><br/>

        {/* ✅ Message Display */}
        {(success)?(
           <div className=" flex fle-col gap-4  items-center justify-center ">
           <p className="text-center mt-3 text-green-600">
             {message}
           </p>
           <Logout />
           <button
            onClick={() => navigate("/dashboard")}
            className="w-32 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 hover:text-amber-100 transition"
          >profile</button></div>
        ):(<p className="text-center mt-3 text-red-700-600"></p>)}


      </div>
    </div>
  );
}

export default LoginBox2;
