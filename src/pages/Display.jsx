import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Display = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 flex flex-col items-center justify-center overflow-hidden">

      {/* Login Button */}
      <button className="absolute top-6 right-8 px-4 py-2 bg-white/20 text-white font-semibold rounded hover:bg-white/30 transition-all duration-300" onClick={() => navigate('/login')}>
        Login
      </button>

      {/* Geometric shapes (background effect) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 border-2 border-white/10 rotate-12"></div>
        <div className="absolute bottom-10 left-20 w-20 h-20 border-2 border-white/10 rounded"></div>
      </div>

      {/* Main Text */}
      <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-wider text-center">
        FundExplorer
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-4"></div>
      <p className="text-xl text-white/90 font-light tracking-widest uppercase text-center">
        Discover • Read • Invest
      </p>

      {/* Icons at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        {['📊', '🔒', '💰'].map((icon, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <span className="text-white text-sm">{icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
