import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import loginOptions from "../data/loginOptions.json";
import LoginCard from "../components/LoginCard";
import PopupWindow from "../components/PopupWindow";

export default function Login() {
  const [popupData, setPopupData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (title, id) => {
    navigate(`/page1`, { state: { message: `exploring Login using ${title}`, id } });
  };

  const handleShowPopup = ({ type, title, data }) => {
    setPopupData({
      title: `${type === 'pros' ? '✅ Pros' : '❌ Cons'} of ${title}`,
      list: data,
    });
  };

  const handleClosePopup = () => setPopupData(null);

  // 🔒 Freeze background scroll when popup is open
  useEffect(() => {
    if (popupData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // cleanup
    };
  }, [popupData]);

  return (
    <div className="relative bg-gray-100 min-h-screen py-8 px-4 overflow-y-auto">
      <h1 className="text-3xl text-center font-bold text-blue-900 mb-6">Select Login Method</h1>

      {loginOptions.map((option) => (
        <LoginCard
          key={option.id}
          {...option}
          onLogin={() => handleLogin(option.title, option.id)}
          onShowPopup={handleShowPopup}
        />
      ))}

      {/* Global Popup */}
      {popupData && (
  <div className=" bg-gray-100 absolute top-10 left-0 right-0 mx-auto z-50 flex justify-center">
    <PopupWindow
      title={popupData.title}
      list={popupData.list}
      onClose={handleClosePopup}
    />
  </div>
)}
    </div>
  );
}
