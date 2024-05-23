import React from "react";
import Chart from "../chart/Chart";
import { CiCalendar } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { IoMailUnreadOutline } from "react-icons/io5";
import { LuUserCircle2 } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
import { ImUserTie } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { FaChartArea } from "react-icons/fa";
import p2Image from "../../img/profile.png";

const main = () => {
  return (
    <div className="flex flex-col md:flex-row dark:bg-slate-950">
      <section className="w-auto md:w-[100%] h-full">
        <div className="w-flex flex items-center justify-between">
          <div className="text-indigo-950 m-4 font-bold text-xl md:text-2xl dark:text-transparent bg-clip-text              dark:bg-gradient-to-r from-indigo-800 to-pink-800">
            {" "}
            dApp Template
          </div>
        </div>
        <div className=" hidden md:flex gap-4 items-center justify-end px-4 text-indigo-950 dark:text-slate-400">
          <CiCalendar />
          <IoIosNotifications />
          <IoMailUnreadOutline />
          <img src={p2Image} alt="" className="rounded-full w-5 h-5" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
          <div className="flex flex-col justify-between w-full md:w-auto h-48 bg-white dark:bg-slate-900/50 p-4 rounded-md">
            <div className="flex w-full items-center justify-between">
              <div className="text-4xl text-indigo-950 dark:text-slate-400">
                <LuUserCircle2 />
              </div>
              <div className="flex items-center justify-center w-10 h-10 dark:text-slate-400 bg-indigo-200 dark:bg-slate-900/50 rounded-full">
                <CiMenuKebab />
              </div>
            </div>
            <div className="font-extrabold text-4xl sm:text-2xl lg:text-xl0 dark:text:slate-400">
              123,123,123
            </div>
            <div className="dark:text-slate-400 text-sm font-semibold ">
              Total Voters
            </div>
          </div>
          <div className="flex flex-col justify-between w-full md:w-auto h-48 bg-white dark:bg-slate-900/50 p-4 rounded-md">
            <div className="flex w-full items-center justify-between">
              <div className="text-4xl text-indigo-950 dark:text-slate-400">
                <ImUserTie />
              </div>
              <div className="flex items-center justify-center w-10 h-10 dark:text-slate-400 bg-indigo-200 dark:bg-slate-900/50 rounded-full">
                <CiMenuKebab />
              </div>
            </div>
            <div className="font-extrabold text-4xl sm:text-2xl lg:text-xl0 dark:text:slate-400">
              123,123,123
            </div>
            <div className="dark:text-slate-400 text-sm font-semibold ">
              Total Candidates
            </div>
          </div>
          <div className="flex flex-col justify-between w-full md:w-auto h-48 bg-white dark:bg-slate-900/50 p-4 rounded-md">
            <div className="flex w-full items-center justify-between">
              <div className="text-4xl text-indigo-950 dark:text-slate-400">
                <HiUserGroup />
              </div>
              <div className="flex items-center justify-center w-10 h-10 dark:text-slate-400 bg-indigo-200 dark:bg-slate-900/50 rounded-full">
                <CiMenuKebab />
              </div>
            </div>
            <div className="font-extrabold text-4xl sm:text-2xl lg:text-xl0 dark:text:slate-400">
              123,123,123
            </div>
            <div className="dark:text-slate-400 text-sm font-semibold ">
              Total Parties
            </div>
          </div>
          <div className="flex flex-col justify-between w-full md:w-auto h-48 bg-white dark:bg-slate-900/50 p-4 rounded-md">
            <div className="flex w-full items-center justify-between">
              <div className="text-4xl text-indigo-950 dark:text-slate-400">
                <FaChartArea />
              </div>
              <div className="flex items-center justify-center w-10 h-10 dark:text-slate-400 bg-indigo-200 dark:bg-slate-900/50 rounded-full">
                <CiMenuKebab />
              </div>
            </div>
            <div className="font-extrabold text-4xl sm:text-2xl lg:text-xl0 dark:text:slate-400">
              123,123,123
            </div>
            <div className="dark:text-slate-400 text-sm font-semibold ">
              Total Voting Areas
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4 m-4 w-auto">
          <div className="cols-span-4 md:col-span-1 h-28 bg-white dark:bg-slate-900/50 rounded-md">
            <div className="flex flex-col justify-between p-4 h-full">
              <div className="font-semibold text-indigo-950 dark:text-slate-400">
                New Vote
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-5xl sm:text-5xl font-bold text-indigo-900 dark:text-slate">
                  64
                </div>
                <div className="flex px-2 py-1 text-sm rounded-full bg-green-500 items-center text-green-900">
                  +69%
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-3 row-span-2 bg-white dark:bg-slate-900/50">
            <Chart />
          </div>
          <div className="cols-span-4 md:col-span-1 h-28 bg-white dark:bg-slate-900/50 rounded-md">
            <div className="flex flex-col justify-between p-4 h-full">
              <div className="font-semibold text-indigo-950 dark:text-slate-400">
                Old Vote
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-5xl sm:text-5xl font-bold text-indigo-900 dark:text-slate">
                  51
                </div>
                <div className="flex px-2 py-1 text-sm rounded-full bg-yellow-500 items-center text-yellow-900">
                  59%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-4">
          <div className="text-indigo-950 dark:text-slate-400 font-bold text-2xl my-4 ">
            Recent Election Areas
          </div>
          <table className="w-full text-sm text-left dark:text-indigo-500">
            <thead className="text-xs text-indigo-950 dark:text-slate-400 uppercase bg-gray-50 dark:bg-slate-900/50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  State
                </th>
                <th scope="col" className="py-3 px-6">
                  Candidate1
                </th>
                <th scope="col" className="py-3 px-6">
                  Candidate2
                </th>
                <th scope="col" className="py-3 px-6">
                  Candidate3
                </th>
                <th scope="col" className="py-3 px-6">
                  Candidate4
                </th>
              </tr>
            </thead>
            <tbody className="text-indigo-950 dark:text-slate-400">
              <td className="py-4 px-6">New York</td>
              <td className="py-4 px-6">500 votes</td>
              <td className="py-4 px-6">200 votes</td>
              <td className="py-4 px-6">400 votes</td>
              <td className="py-4 px-6">1000 votes</td>
            </tbody>
            <tbody className="text-indigo-950 dark:text-slate-400">
              <td className="py-4 px-6">Florida</td>
              <td className="py-4 px-6">500 votes</td>
              <td className="py-4 px-6">200 votes</td>
              <td className="py-4 px-6">400 votes</td>
              <td className="py-4 px-6">1000 votes</td>
            </tbody>
            <tbody className="text-indigo-950 dark:text-slate-400">
              <td className="py-4 px-6">Pennsyvania</td>
              <td className="py-4 px-6">500 votes</td>
              <td className="py-4 px-6">200 votes</td>
              <td className="py-4 px-6">400 votes</td>
              <td className="py-4 px-6">1000 votes</td>
            </tbody>
            <tbody className="text-indigo-950 dark:text-slate-400">
              <td className="py-4 px-6">California</td>
              <td className="py-4 px-6">500 votes</td>
              <td className="py-4 px-6">200 votes</td>
              <td className="py-4 px-6">400 votes</td>
              <td className="py-4 px-6">1000 votes</td>
            </tbody>
          </table>
        </div>
      </section>
      {/* <section className="w-full md:w-[30%] bg-indigo-3200 dark:bg-slate-900/20">
        <div className="flex flex-cols m-4">
         
        </div>
        <div></div>
      </section> */}
    </div>
  );
};

export default main;
