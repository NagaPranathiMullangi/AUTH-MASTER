import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // 1️⃣ Remove JWT
    localStorage.removeItem('token');

    // 2️⃣ Destroy Express session
    try {
      await axios.post('http://192.168.170.206:5000/logout', {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Session logout error:', err);
    }

    // 3️⃣ Sign out Firebase
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      console.error('Firebase signOut error:', err);
    }

    // 4️⃣ Redirect to home
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 hover:text-amber-100 transition">
      Logout
    </button>
  );
}

export default LogoutButton;
