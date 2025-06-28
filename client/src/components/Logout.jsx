import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('came to logout frontend');
      localStorage.removeItem('token');
      console.log('deleted token in local storage')
      localStorage.removeItem('sessionUser');
      console.log('deleted session user in local storage')
      const auth = getAuth();
      await signOut(auth); // Firebase logout

      navigate('/');
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
