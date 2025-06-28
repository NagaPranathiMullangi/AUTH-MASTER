import React, { useEffect, useRef } from "react";

export default function PopupWindow({ title, list = [], onClose }) {
  const popupRef = useRef();

  // 🔒 Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // ❌ Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-opacity-30 z-50 flex justify-center items-center">
     <div
  ref={popupRef}
  className={`bg-gray-100 p-8 rounded-2xl shadow-2xl w-[600px] h-[400px] relative ${
    title?.toLowerCase().includes('pros')
      ? 'shadow-green-500'
      : title?.toLowerCase().includes('cons')
      ? 'shadow-red-500'
      : ''
  }`}
>
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-red-600 font-bold text-2xl"
        >
          ×
        </button>

        {/* 🏷️ Title */}
        <h2 className="text-lg font-semibold mb-4 text-blue-900">{title}</h2>

        {/* 📜 Scrollable List */}
        <ul className="list-disc pl-6 text-gray-800 text-lg overflow-y-auto max-h-[300px] pr-2">
          {list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
