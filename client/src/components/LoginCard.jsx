import React, { useState } from "react";
import PopupWindow from "./PopupWindow";

export default function LoginCard({
    title,
    image1,
    image2,
    Auth,
    Session,
    pros,
    cons,
    onLogin,
    onShowPopup // 👈 receive from parent
  }) {
    return (
<div className="bg-white shadow-xl rounded-xl p-6 mb-8 max-w-4xl w-full mx-auto transition duration-600 ease-in-out hover:scale-105 hover:shadow-2xl">

        <div className="flex flex-col md:flex-row items-center gap-6">
        
        <div className="flex w-1/4 gap-2 justify-center">
        <img
  src={image1}
  alt="img2"
  className="w-[140px] aspect-square object-cover rounded-xl"
/>
</div>

          
  
          <div className="flex-1 w-3/4">
            <h2 className="text-xl font-bold text-shadow-cyan-700 text-shadow-2xs text-blue-950 mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">
  <span className="text-xl font-bold italic font-serif mr-2">Auth:</span>
  {Auth}
</p>
<p className="text-gray-700 mb-4">
  <span className="text-xl font-semibold italic font-serif mr-2">Session:</span>
  {Session}
</p>
            <div className="flex justify-between gap-4 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => onShowPopup({ type: 'pros', title, data: pros })}
                className="flex-1 bg-green-100 text-green-800 py-2 rounded-md font-semibold hover:bg-green-200"
              >
                ✅ Pros
              </button>
              <button
                onClick={() => onShowPopup({ type: 'cons', title, data: cons })}
                className="flex-1 bg-red-100 text-red-800 py-2 rounded-md font-semibold hover:bg-red-200"
              >
                ❌ Cons
              </button>
              <button
                onClick={onLogin}
                className="flex-1 bg-blue-950 text-white py-2 rounded-md font-semibold hover:bg-blue-850 "
              >
                Login 
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  