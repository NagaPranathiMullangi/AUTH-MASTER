import React from 'react';
import '../index.css';

function Home() {
    return (
        
        <div className="relative flex items-center justify-center min-h-[calc(100vh-108px)] overflow-hidden">


        {/* 📸 Background Image with Moving Effect */}
        <img
          src="https://www.shutterstock.com/image-illustration/background-concept-data-protection-cybersecurity-600nw-2037142181.jpg"// place image inside public/assets/
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-centercenter z-0"
        />

        {/* Overlay (optional for contrast) */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* 🧊 Glass Card */}
        <div className="flex flex-col items-center gap-6  -translate-x-40">
  {/* First Card */}
  <div className="animate-float relative z-2 bg-blue-950/30 backdrop-blur-l p-10 rounded-2xl shadow-sm border shadow-white  border-white/100 text-center max-w-md w-full -translate-x-10">
    <h2 className="text-4xl text-white/100 font-bold mb-3">👋 Welcome</h2>
    <p className=  " font-normal text-lg text-white/100">Explore various authentication methods</p>
  </div>

  {/* Second Card */}
  <div className=" relative z-2 bg-blue-950/30 backdrop-blur-l p-10 rounded-2xl shadow-sm border shadow-white border-white/100 text-center max-w-md w-full -translate-x-10">
   
  <p className="text-white/100 text-lg italic font-sans font-bold">
  Please <span className="text-white text-2xl font-extrabold">Register</span> first to explore all features.
</p>

  </div>
</div>
      </div>

    );
  }
  
  export default Home;