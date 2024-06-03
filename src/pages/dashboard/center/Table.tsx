const data = [
  { state: "New York", candidate1: "500 votes", candidate2: "200 votes", candidate3: "400 votes", candidate4: "1000 votes" },
  { state: "Florida", candidate1: "500 votes", candidate2: "200 votes", candidate3: "400 votes", candidate4: "1000 votes" },
  { state: "Pennsylvania", candidate1: "500 votes", candidate2: "200 votes", candidate3: "400 votes", candidate4: "1000 votes" },
  { state: "California", candidate1: "500 votes", candidate2: "200 votes", candidate3: "400 votes", candidate4: "1000 votes" }
];

const Table = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="bg-slate-900/50 text-white dark:text-slate-400 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 text-left align-middle">
              State
            </th>
            <th scope="col" className="px-6 py-3 text-left align-middle">
              Candidate1
            </th>
            <th scope="col" className="px-6 py-3 text-left align-middle">
              Candidate2
            </th>
            <th scope="col" className="px-6 py-3 text-left align-middle">
              Candidate3
            </th>
            <th scope="col" className="px-6 py-3 text-left align-middle">
              Candidate4
            </th>
          </tr>
        </thead>
        <tbody className="text-xs bg-slate-900/50 text-white dark:text-slate-400">
          {data.map((row, index) => (
            <tr key={index} className="text-sm">
              <td className="px-6 py-4 whitespace-nowrap text-left align-middle">{row.state}</td>
              <td className="px-6 py-4 whitespace-nowrap text-left align-middle">{row.candidate1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-left align-middle">{row.candidate2}</td>
              <td className="px-6 py-4 whitespace-nowrap text-left align-middle">{row.candidate3}</td>
              <td className="px-6 py-4 whitespace-nowrap text-left align-middle">{row.candidate4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
