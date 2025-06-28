import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fbhelper'; // adjust the path as needed
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';


function LoginBox3({id}) {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('error'); // 'success' or 'error'

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in user:", userCredential.user);

      // Firebase session is already maintained internally
      setMsg("Login successful!");
      setMsgType("success");

      // Clear form
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("❌ Firebase login error:", error.message);
      setMsg(error.message);
      setMsgType("error");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] justify-center bg-gray-100 p-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Firebase Login</h2>
        {(msgType === 'error')?(<>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>

        <br/>

        <p className={"text-sm mb-4 text-center  text-red-600"}>
            {msg}
          </p>


        </>):(<div className="flex flex-col gap-4 justify-center items-center"> 


          <p className={"text-lg mb-4 text-center  text-green-600"}>
            {msg}
          </p>
          <Logout />
          <button
            onClick={() => navigate("/dashboard")}
            className="w-32 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 hover:text-amber-100 transition"
          >profile</button>
        </div>)}




       
          
       

      </div>
    </div>
  );
}

export default LoginBox3;
