// src/components/Sidebar.tsx
import React from "react";
import logo from "./../../public/logo.jpeg";
const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-20 bg-white shadow-md text-center">
      <div className="flex items-center justify-center h-16 border-b">
        <img src={logo} alt="Votechain Logo" className="h-10" />
      </div>
      <nav className="mt-10">
        <ul>
          <li className=" p-4 text-gray-700 hover:bg-gray-200">
            <i className="fas fa-tachometer-alt w-6 h-4"></i>
            {/* <span className="ml-4">Dashboard</span> */}
          </li>
          <li className=" p-4 text-gray-700 hover:bg-gray-200">
            <i className="fas fa-plus-square w-6 h-4"></i>
            {/* <span className="ml-4">Create a Poll</span> */}
          </li>
          <li className=" p-4 text-gray-700 hover:bg-gray-200">
            <i className="fas fa-pen-square w-6 h-4"></i>
            {/* <span className="ml-4">Fill a Poll</span> */}
          </li>
          <li className="p-4 text-white bg-black rounded-lg">
            <i className="fas fa-history w-6 h-4"></i>
            {/* <span className="ml-4">Poll History</span> */}
          </li>
          <li className=" p-4 text-gray-700 hover:bg-gray-200">
            <i className="fas fa-cog w-6 h-4"></i>
            {/* <span className="ml-4">Settings</span> */}
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full">
        <div className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100">
          <i className="fas fa-sign-out-alt w-6 h-4"></i>
          {/* <span className="ml-4">Log out</span> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
