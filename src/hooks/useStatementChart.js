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

const initState = {
  data: initData,
  key: '',
  freq: '',
  options: initOptions
};

const useStatementChart = () => {

  const [stateData, setStateData] = useState(initState);
  const primeData = (arr, key) => {
    let dates = [];
    const cpy = arr.map(val => {
      dates.unshift(val.fiscalDateEnding);
      return val[key];
    });
    cpy.reverse();
  };
};

export default useStatementChart;