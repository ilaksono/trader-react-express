import {useState} from 'react';
import axios from 'axios'
const useCandleData = () => {
  const [candleData, setCandleData] = useState([]);

  const primeCandle = (data) => {
    if(!Object.keys(data))
      return [];
    let arr = [];
    for(const [key, value] of Object.entries(data)) {
      arr.unshift({
        data: new Date(key),
        open: Number(value['1. open']),
        high: Number(value['2. high']),
        low: Number(value['3. low']),
        close: Number(value['4. close']),
        volume: Number(value['5. volume']),
      })
    }
    return arr;
  }
  const getData = async (tick, type = 'daily') => {
    const data = await axios
    .get(`/api/${type}/${tick}`);
   const raw = data.data.data[`Time Series (${type === 'daily' ? 'Daily' : '5min'})`];
   const cpy = primeCandle(raw); 
   setCandleData(cpy);
  }

  return {
    candleData,
    getData,

  }
}

export default useCandleData;