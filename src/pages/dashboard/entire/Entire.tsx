
import FirstCenter from "../center/Firstcenter";
import SecondCenter from "../center/SecondCenter";
import Table from "../center/Table";

import { CiCalendar } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { IoMailUnreadOutline } from "react-icons/io5";

import p2Image from "../../../img/profile.png";

const Entire = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white  dark:bg-slate-950">
      <section className="w-auto md:w-[100%] h-full">
        <div className="w-flex flex items-center justify-between">
          <div className="text-indigo-950 m-4 font-bold text-xl md:text-2xl dark:text-transparent bg-clip-text dark:bg-gradient-to-r from-indigo-800 to-pink-800">
            dApp Template
          </div>
        </div>
        <div className="hidden md:flex gap-4 items-center justify-end px-4 text-indigo-950 dark:text-slate-400">
          <CiCalendar />
          <IoIosNotifications />
          <IoMailUnreadOutline />
          <img src={p2Image} alt="" className="rounded-full w-5 h-5" />
        </div>
        <FirstCenter/>
        <SecondCenter/>
        <div className="m-4">
          <div className="text-indigo-950 dark:text-slate-400 font-bold text-2xl my-4">
            Recent Election Areas
          </div>
        <Table/>
        </div>
      </section>
    </div>
  );
};

export default Entire;
