import BarChart from "../barchart/BarChart";

const SecondCenter = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4 m-4 w-auto">
    <div className="cols-span-4 md:col-span-1 bg-slate-900/50 rounded-md">
      <div className="flex flex-col justify-between p-4 h-full">
        <div className="font-semibold text-indigo-950 text-white dark:text-slate-400">
          New Vote
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="text-5xl sm:text-5xl font-bold text-white dark:text-slate-400">
            64
          </div>
          <div className="flex px-2 py-1 text-sm rounded-full bg-green-500 items-center text-green-900">
            +69%
          </div>
        </div>
      </div>
    </div>
    <div className="cols-span-4 md:col-span-3 row-span-2 bg-white dark:bg-slate-900/50">
      <div className="h-full">
        <BarChart />
      </div>
    </div>
    <div className="cols-span-4 md:col-span-1 bg-slate-900/50 rounded-md">
      <div className="flex flex-col justify-between p-4 h-full">
        <div className="font-semibold text-indigo-950 dark:text-slate-400 text-white">
          Old Vote
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="text-5xl sm:text-5xl font-bold text-white dark:text-slate-400">
            51
          </div>
          <div className="flex px-2 py-1 text-sm rounded-full bg-yellow-500 items-center text-yellow-900">
            59%
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SecondCenter;
