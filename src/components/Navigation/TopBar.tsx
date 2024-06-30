// src/components/Topbar.tsx
import React from "react";
import { InputText } from "primereact/inputtext";
const Topbar: React.FC = () => {
  return (
    <div className="border-b flex justify-between items-center h-16 bg-white shadow-md px-6">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none focus:text-gray-600 lg:hidden">
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center">
          <InputText
            type="text"
            placeholder="Search..."
            className="pl-10 pr-2 py-2 border border-gray-300 rounded"
          />
          <i className="fas fa-search absolute left-3 text-gray-500"></i>
        </div>
        <div className="relative flex items-center">
          <button className="text-gray-500">
          <i className="fas fa-bell "></i>
          </button>
          
        </div>
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
