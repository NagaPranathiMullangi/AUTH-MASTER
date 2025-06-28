import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('came to logout frontend');
      localStorage.removeItem('token');
      console.log('deleted token in local storage');
      localStorage.removeItem('sessionUser');
      console.log('deleted session user in local storage');
  
      let auth;
      try {
        auth = getAuth(); // try to get Firebase auth instance
      } catch (firebaseInitError) {
        console.warn("⚠️ Firebase not initialized:", firebaseInitError);
      }
  
      if (auth && auth.currentUser) {
        console.log("🔐 Firebase user found, signing out...");
        await signOut(auth);
        console.log("✅ Firebase sign-out successful");
      } else {
        console.log("ℹ️ No Firebase user logged in or Firebase not ready");
      }
    } catch (err) {
      console.error("❌ Logout failed:", err);
    } finally {
      // This ensures navigation happens regardless of Firebase state
      navigate('/page1');
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
