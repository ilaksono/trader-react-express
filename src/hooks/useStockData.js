import { useReducer, useState } from 'react';
import axios from 'axios';

const initStock = {
  'Meta Data': {},
  'Time Series (Daily)': {}
};
// const initSelect = {
//   '1. open': false,
//   '2. high': false,
//   '3. low': false,
//   '4. close': false,
//   '5. adjusted close': true,
//   '6. volume': false,
//   '7. dividend amount': false,
//   '8. split coefficient': false
// }
const GET_DAILY = 'GET_DAILY';

const stockReducer =(stock, action) => {
  switch(action.type) {
    case GET_DAILY:{
      return{
        ...action.data
      };
    }
    default: 
      throw new Error('not valid stock type')
  }
}

const initHeader = {
  symbol:'',
  date:''
}
const useStockData = () => {
  const [stock, dispatch] = useReducer(stockReducer, initStock);
  const [select, setSelect] = useState('5. adjusted close');
  const [header, setHeader] = useState(initHeader);
  const getDailyAdjusted = async (tick) => {
    const data = await axios
    .get(`/api/daily/${tick}`)
    console.log(data.data.data['Time Series (Daily)']);
    dispatch({ type: GET_DAILY, data: data.data.data['Time Series (Daily)']})
    setHeader({ symbol: data.data.data['Meta Data']['2. Symbol'], date: data.data.data['Meta Data']['3. Last Refreshed']})
    // dispatch({type: GET_DAILY, data:data.data})
  }

  return {
    stock,
    getDailyAdjusted,
    select,
    setSelect,
    header
  };
};
export default useStockData;