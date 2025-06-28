import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

import Logout from './Logout';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // ❌ Don’t show any buttons on the profile/dashboard page
  if (path === '/dashboard') return (
    <header style={{ backgroundColor: "#efefd0" }} className="px-8 py-2.5 flex justify-between items-center shadow-md z-10">
      <h1 className="text-2xl font-black">AuthExplorer</h1>
      <Logout />
    </header>
  );

  return (
    <header style={{ backgroundColor: "#efefd0" }} className="px-8 py-2.5 flex justify-between items-center shadow-md z-10">
      <h1 className="text-2xl font-black">AuthExplorer</h1>
      <div className="space-x-4">
        {/* Show Register button on all pages except /register */}
        {path !== '/register' && (
          <button onClick={() => navigate("/register")} className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 hover:text-amber-100 transition">
            Register
          </button>
        )}

        {/* Show Login button on all pages except /login */}
        {path !== '/login' && (
          <button onClick={() => navigate("/login")} className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 hover:text-amber-100 transition">
            Login
          </button>
        )}

        {/* Always show Profile button except on /dashboard */}
        {path !== '/dashboard' && (
          <button onClick={() => navigate("/dashboard")} className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 hover:text-amber-100 transition">
            Profile
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
