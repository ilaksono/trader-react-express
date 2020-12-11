import { useState } from 'react';
import axios from 'axios';
const useCandleData = () => {
  const [candleData, setCandleData] = useState([]);
  const [candleHeader, setHeader] = useState({});
  const primeCandle = (data, type) => {
    if (!Object.keys(data))
      return [];
    let arr = [];
    for (const [key, value] of Object.entries(data)) {
      arr.unshift({
        date: new Date(key),
        open: Number(value['1. open']),
        high: Number(value['2. high']),
        low: Number(value['3. low']),
        close: Number(value['4. close']),
        volume: Number(value[type === 'daily' ? '6. volume': '5. volume']),
      });
    }
    return arr;
  };
  const getCandleData = async (tick, type = 'daily') => {
    try {
      const data = await axios
        .get(`/api/${type}/${tick}`);
      const raw = data.data.data[`Time Series (${type === 'daily' ? 'Daily' : '5min'})`];
      const cpy = primeCandle(raw, type);
      setCandleData(cpy);
      setHeader({
        symbol: data.data.data['2. Symbol'],
        date: data.data.data['3. Last Refreshed'],
        type: type === 'daily' ? 'Daily' : '5 mins'
      });
      return cpy;
    } catch (er) {
      console.log(er);
    }
  };

  return {
    candleData,
    getCandleData,
    candleHeader
  };
};

export default useCandleData;