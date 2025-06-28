import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../fbhelper'; // Your Firebase config helper

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const firebaseAuth = getAuth();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  useEffect(() => {
    let unsubscribe;

    const checkAllLogins = async () => {
      try {
        // 1️⃣ JWT Check
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
          const res = await axios.get('http://mytestapp.com:5000/api/verify/jwt', {
            headers: { Authorization: `Bearer ${jwtToken}` },
            withCredentials: true
          });

          if (res.data.success) {
            setUser(res.data.user);
            setLoading(false);
            return;
          }
        }

        // 2️⃣ Express Session Check
        const session = JSON.parse(localStorage.getItem('sessionUser'));
        const userID = session?.userID;
        if (userID) {
          const sessionRes = await axios.get(`http://mytestapp.com:5000/api/verify/express?userID=${userID}`, {
            withCredentials: true
          });

          if (sessionRes.data.success) {
            setUser(sessionRes.data.user);
            setLoading(false);
            return;
          }
        }

        // 3️⃣ Firebase Auth + Firestore Check
        unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser) => {
          console.log("🔥 Firebase User:", fbUser);

          if (fbUser) {
            try {
              const db = getFirestore(); // initialize Firestore
              const docRef = doc(db, "users", fbUser.uid); // point to users/{uid}
              const docSnap = await getDoc(docRef);

              let extraData = {};
              if (docSnap.exists()) {
                extraData = docSnap.data(); // fetch phone, full name, etc.
              }
              console.log(fbUser.photoURL);

              setUser({
                name: fbUser.displayName || extraData.name || null,
                email: fbUser.email,
                photo: fbUser.photoURL || extraData.photo || null,
                uid: fbUser.uid,
                phone: extraData.phone || null, // from Firestore
              });

            } catch (error) {
              console.error("⚠️ Error fetching Firestore data:", error);
              setUser({
                name: fbUser.displayName || null,
                email: fbUser.email,
                photo: fbUser.photoURL || null,
                uid: fbUser.uid,
              });
            }
          } else {
            setUser(null);
          }

          setLoading(false);
        });

      } catch (err) {
        console.error("Login check failed:", err);
        setUser(null);
        setLoading(false);
      }
    };

    checkAllLogins();

    // 🔁 Cleanup listener on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="p-5 text-center text-gray-500">🔄 Checking login...</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-100px)] justify-center bg-gray-100 p-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        {user ? (
          <>
            <img
              src={user.photo ||"https://www.kindpng.com/picc/m/22-223965_no-profile-picture-icon-circle-member-icon-png.png"}
              alt="User"
              className="mx-auto rounded-full w-20 h-20 object-cover mb-3"
            />
            <h2 className="text-xl font-bold text-blue-800">👋 Welcome</h2>

            {user.name && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="text-lg font-bold">Name:</span> {user.name}
              </p>
            )}
            <p className="text-sm text-gray-600 mt-2">
              <span className="text-lg font-bold">Email:</span> {user.email}
            </p>

            {user.phone && (
              <p className="text-sm text-gray-600 mt-2">
                <span className="text-lg font-bold">Phone:</span> {user.phone}
              </p>
            )}
          </>
        ) : (
          <div>
            <p className="text-red-600 font-semibold mb-4">❌ Please log in to continue.</p>
            <button
              className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
              onClick={handleLoginRedirect}
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
