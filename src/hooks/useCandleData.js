import { useState } from 'react';
import axios from 'axios';

const initErr = {
  type:'',
  msg:''
}

const useCandleData = () => {
  const [candleData, setCandleData] = useState([]);
  const [candleHeader, setHeader] = useState({});
  const [adjust, setAdjust] = useState(true);
  const [candleErr, setCandleErr] = useState(initErr);
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
        close: Number(value[adjust ? '5. adjusted close' : '4. close']),
        volume: Number(value[type === 'daily' ? '6. volume': '5. volume']),
      });
    }
    return arr;
  };
  const resetCandleErr = () => {
    setCandleErr(initErr);
  }
  const toggleAdjusted = () => {
    setAdjust(prev => !prev);
  }
  const getCandleData = async (tick, type = 'daily') => {
    try {
      const data = await axios
        .get(`/api/${type}/${tick}`);
        if(!data.data.data)
          setCandleErr({type:'NO_CANDLE', msg:`Could not get candle data for ${tick}`})
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
      setCandleErr({ type: 'NO_CANDLE', msg: `Could not get candle data for ${tick}` })
      console.log(er);
    }
  };

  return {
    candleData,
    getCandleData,
    candleHeader,
    toggleAdjusted,
    adjust,
    candleErr,
    resetCandleErr
  };
};

export default useCandleData;