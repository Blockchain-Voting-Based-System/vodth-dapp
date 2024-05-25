import React from "react";
import p1Image from "../../img/Vlogo.png";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuUserCircle2 } from "react-icons/lu";
import { FaChartArea } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="h-screen dark:bg-slate-950">
      <div className="flex flex-col gap-3 w-full text-slate-300 h-full justify-between">
        <div className="flex flex-col gap-10 px-4 mt-4">
          <div className="flex items-center justify-center gap-1">
            <img src={p1Image} alt="" className="w-30 h-25" />
          </div>
          <span className="text-sm font-bold sm:text-sm text-blue-100 text-center">
            Welcome to, Vodth!
          </span>
          <div className="flex flex-col gap-5 text-md sm:text-sm lg:text-lg">
            <div className="flex items-center gap-2">
              <div>
                <AiOutlineDashboard></AiOutlineDashboard>
              </div>
              <div className="hidden sm:flex hover:text-slate-100 cursor-pointer">
                Dashboard
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <LuUserCircle2 />
              </div>
              <div className="hidden sm:flex hover:text-slate-100 cursor-pointer">
                Voters
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <ImUserTie />
              </div>
              <div className="hidden sm:flex hover:text-slate-100 cursor-pointer">
                Candidates
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <HiUserGroup />
              </div>
              <div className="hidden sm:flex hover:text-slate-100 cursor-pointer">
                Parties
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <FaChartArea />
              </div>
              <div className="hidden sm:flex hover:text-slate-100 cursor-pointer">
                Election Areas
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center text-md sm:text-xs md:text-sm lg:text-lg px-4 mb-4 gap-2">
          <div>
            <IoSettingsOutline />
          </div>
          <div className="hidden sm:flex">Setting</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
