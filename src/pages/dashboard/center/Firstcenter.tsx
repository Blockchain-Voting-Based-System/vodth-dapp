import { LuUserCircle2 } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
import { ImUserTie } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { FaChartArea } from "react-icons/fa";
const sectionsData = [
    { icon: <LuUserCircle2 />, text: "Total Voters" },
    { icon: <ImUserTie />, text: "Total Candidates" },
    { icon: <HiUserGroup />, text: "Total Parties" },
    { icon: <FaChartArea />, text: "Total Voting Areas" },
  ];
const FirstCenter = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
          {sectionsData.map((section, index) => (
            <div
              key={index}
              className="flex flex-col justify-between w-full md:w-auto h-48 bg-slate-900/50 p-4 rounded-md"
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-4xl text-indigo-950 dark:text-slate-400">
                  {section.icon}
                </div>
                <div className="flex items-center justify-center w-10 h-10 dark:text-slate-400 bg-indigo-200 dark:bg-slate-900/50 rounded-full">
                  <CiMenuKebab />
                </div>
              </div>
              <div className="font-extrabold text-4xl sm:text-2xl lg:text-xl0  text-white dark:text-slate-400">
                123,123,123
              </div>
              <div className="dark:text-slate-400 text-sm text-white font-semibold">
                {section.text}
              </div>
            </div>
          ))}
        </div>
  );
};

export default FirstCenter;
