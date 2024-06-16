// src/components/Topbar.tsx
import React from "react";

const Topbar: React.FC = () => {
  return (
    <div className="border-b flex justify-between items-center h-16 bg-white shadow-md px-6">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none focus:text-gray-600 lg:hidden">
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none mx-4">
          <i className="fas fa-search"></i>
        </button>
        <button className="text-gray-500 focus:outline-none mx-4">
          <i className="fas fa-bell"></i>
        </button>
        <img
          // src="/path/to/user-avatar.jpg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
