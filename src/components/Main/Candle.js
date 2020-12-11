import React from 'react';
import Chart from './Chart';

import { TypeChooser } from "react-stockcharts/lib/helper";
import CandleStickChartWithMA from './CandlePointer';


const Candle = (props) => {

  const data = [
    {
      open: 12115,
      high: 12116,
      low: 12110,
      close: 12114,
      date: new Date('2020-12-11'),
      volume: 1000
    },
    {
      open: 12114,
      high: 12115,
      low: 12112,
      close: 12115,
      date: new Date('2020-12-12'),
      volume: 2000
    },
    {
      open: 12114,
      high: 12115,
      low: 12112,
      close: 12115,
      date: new Date('2020-12-13'),
      volume: 2000
    },
    {
      open: 12114,
      high: 12115,
      low: 12112,
      close: 12115,
      date: new Date('2020-12-14'),
      volume: 2000
    },
    {
      open: 12114,
      high: 12120,
      low: 12112,
      close: 12115,
      date: new Date('2020-12-15'),
      volume: 4000

    },
    {
      open: 12114,
      high: 12115,
      low: 12112,
      close: 12115,
      date: new Date('2020-12-16'),
      volume: 2000
    },

  ];
  return (
    <TypeChooser>
      {/* {type => <Chart type={type} data={data} />} */}
      {type => <CandleStickChartWithMA type={type} data={data} />}

    </TypeChooser>
  );

};

export default Candle;