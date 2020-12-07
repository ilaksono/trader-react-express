import {useState} from 'react';
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
        max: 5,
        maxTicksLimit: 6
      },
      scaleLabel: {
        labelString:'Value ($)',
        display: true
      }
    }],
    xAxes:[{
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

  return {
    chartOptions,
    setChartOptions,
    chartData,
    setChartData
  };
}
export default useChartData;