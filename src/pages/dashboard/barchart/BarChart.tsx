
import React, { useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart: React.FC = () => {
  const data = {
    labels: ["Candidate1", "Candidate2", "Candidate3", "Candidate4"],
    datasets: [
      {
        label: "Count",
        data: [5000, 2000, 3000, 6000],
        backgroundColor: ["green", "yellow", "blue", "red"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { display: true, grid: { display: false } },
      y: { display: true, grid: { display: false } },
    },
  };

  useEffect(() => {
    const chart = ChartJS.getChart("chart-bar"); 
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return (
    <Bar id="chart-bar" data={data} options={options} />

   
  );
};

export default BarChart;
