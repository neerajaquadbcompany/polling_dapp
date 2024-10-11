import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ votes }) => {
  

 
  const colors = ['#003f5c', '#58508d', '#bc5090', '#ff6361']; 

  
  const data = {
    labels: Object.keys(votes), 
    datasets: [
      {
        data: Object.values(votes), 
        backgroundColor: colors.slice(0, Object.keys(votes).length), 
        
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true, // Show legend with poll options
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} votes`; // Show votes in tooltip
          },
        },
      },
    },
    cutout: '60%', // Donut shape with a cutout in the middle
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
