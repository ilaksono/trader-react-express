import {useState} from 'react';
import axios from 'axios';
const initTr = {
  currentRatio: 0,
  debtEquity: 0,
  peRatio: 0,
  profitMargin: 0,
  revGrowth: 0,
  divYield: 0,
  retEquity: 0,
  numShares: 0
}
const useTechnicalRatios = () => {
  const [trs, setTrs] = useState(initTr);
  const primeTrs = (json, price, cashJson, tick, incomeJson) => {
    if(json.hasOwnProperty('totalCurrentAssets')) {
      const cr = Number(json[0].totalCurrentAssets)/Number(json[0].totalCurrentLiabilities)
      const debt = (Number(json[0].totalShortTermDebt) + Number(json[0].totalShortTermDebt)) / (Number(json.totalAssets) - Number(json.totalLiabilities));
      const earnPerShare = Number(getEPS(tick)[0].reportedEPS) 
      const pe = price / earnPerShare;
      const proMarg = Number(incomeJson[0].netIncome) / Number(incomeJson[0].totalRevenue);
      const revGrow = (Number(incomeJson[0].totalRevenue) - Number(incomeJson[1].totalRevenue))/Number(incomeJson[1].totalRevenue);
      const numShares = Number(incomeJson[0].netIncome) / earnPerShare;
      const divYield = Number(cashJson[0].dividendPayout) / numShares / price;
      const retEquity = Number(incomeJson[0].netIncome) / Number(json.totalShareholderEquity);
    }
  }

  const getEPS = async (tick) => {
    try {
      const data = await axios.get(`/api/statements/earnings/${tick}`)
      return data.data.annualEarnings || 1;
    } catch(er) {
      console.log(er);
    }
  }
  
  return {
    trs,
    setTrs
  }
  
}