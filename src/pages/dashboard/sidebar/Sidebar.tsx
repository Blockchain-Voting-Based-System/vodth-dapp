import { Link } from "react-router-dom";
import p1Image from "../../../img/Vlogo.png";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FaChartArea } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const MenuItems = [
  { icon: <AiOutlineDashboard />, text: "Dashboard", link: "/dashboard" },
  { icon: <MdOutlineEventAvailable />, text: "Events", link: "/events" },
  { icon: <ImUserTie />, text: "Candidates", link: "/candidates" },
  { icon: <HiUserGroup />, text: "Parties", link: "/parties" },
  { icon: <FaChartArea />, text: "Election Areas", link: "/election-areas" },
];

const Sidebar = () => {
  return (
    <div className="h-screen bg-black dark:bg-slate-950">
      <div className="flex flex-col gap-3 w-full text-slate-300 h-full justify-between">
        <div className="flex flex-col gap-10 px-4 mt-4">
          <div className="flex items-center justify-center gap-1">
            <img src={p1Image} alt="" className="w-30 h-25" />
          </div>
          <span className="text-sm font-bold sm:text-sm text-blue-100 text-center">
            Welcome to, Vodth!
          </span>
          <div className="flex flex-col gap-5 text-md sm:text-sm lg:text-lg">
            {MenuItems.map((item, index) => (
              <Link to={item.link} key={index} className="flex items-center gap-2">
                <div>{item.icon}</div>
                <div className="hidden sm:flex gap-2">{item.text}</div>
              </Link>
            ))}
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
