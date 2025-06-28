import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://mytestapp.com:5000/reset-password/${token}`, { newPassword });
      setMsg('✅ Password updated! Try login again.');
    } catch (err){
        console.log(err);
      setMsg('❌ Invalid or expired link.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Reset</button>
        </form>
        {msg && <p className="text-center text-blue-600 mt-4">{msg} </p>}
      </div>
    </div>
  );
}

export default ResetPassword;
