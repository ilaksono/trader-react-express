import { useState } from 'react';
const initData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Sample Data',
    backgroundColor: '#1E0253',
    // backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }],
  ready: null
};
const initOptions = {
  scales: {
    yAxes: [{
      ticks: {
        min: 0,
        max: 700,
        maxTicksLimit: 5
      },
      scaleLabel: {
        labelString: 'Value ($)',
        display: true
      }
    }],
    xAxes: [{
      scaleLabel: {
        labelString: 'Date',
        display: true,
        maxTicksLimit: 6
      }
    }]
  },
};


const useChartData = () => {
  const [chartData, setChartData] = useState(initData);
  const [chartOptions, setChartOptions] = useState(initOptions);

  const primeChartData = (obj) => {

    let primedLabels = [];
    let primedVal = [];
    let max = 0;
    primedVal = Object.keys(obj).map((key, i) => {
      primedLabels.unshift(key);
      let val = Number(obj[key]['5. adjusted close']);
      if (max < val)
        max = val;
      return val;
    });
    primedVal = primedVal.reverse();

    setChartData({
      labels: primedLabels,
      datasets: [{
        label: 'Daily Open',
        // backgroundColor: 'none',
        borderColor: 'red',
        data: primedVal,
        fill: true,
        // hoverBackgroundColor: '#1E0253',
        pointBackgroundColor: 'red'
        // pointHoverBackgroundColor: '#1E0253'
      }],
      ready: true,
    });
    setChartOptions(prev => ({ ...prev, scales: { yAxes: [{ ticks: { min: 0, max:1.5 * max, maxTicksLimit: 6 } }] } }));
  };

  return {
    chartOptions,
    setChartOptions,
    chartData,
    setChartData,
    primeChartData
  };
};
export default useChartData;