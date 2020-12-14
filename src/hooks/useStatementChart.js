import { useState } from 'react';

const initData = {
  labels: [],
  datasets: [{
    label: 'Sample Data',
    backgroundColor: '#1E0253',
    // backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }],
  ready: false
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

  const primeData = (arr, key, freq) => {
    let dates = [];
    let min = Number(arr[0][key]);
    let max = 0;
    const cpy = arr.map(val => {
      const can = Number(val[key]);
      if (min > can)
        min = Number(can);
      if (max < can)
        max = can;

      dates.unshift(val.fiscalDateEnding);
      return can;
    });
    cpy.reverse();

    const primed = {
      labels: dates,
      datasets: [{
        label: `${key} - ${freq}`,
        // backgroundColor: '#1E0253',
        // backgroundColor: 'rgb(255, 99, 132)',
        borderColor: cpy[cpy.length - 1] - cpy[0] >= 0 ? 'green' : 'red',
        data: cpy
      }],
      ready: true
    };
    const options = {
      scales: {
        yAxes: [{
          ticks: {
            min: 0.9 * min,
            max: 1.1 * max,
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

    setStateData(prev =>
      ({
        ...prev,
        data: primed,
        key,
        freq,
        options
      }));
  };
  return {
    stateData,
    primeData
  };
};

export default useStatementChart;