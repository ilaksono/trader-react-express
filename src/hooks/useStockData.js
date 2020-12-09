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

const useStockData = () => {
  const [stock, dispatch] = useReducer(stockReducer, initStock);
  const [select, setSelect] = useState('5. adjusted close');
  
  const getDailyAdjusted = async (tick) => {
    const data = await axios
    .get(`/api/daily/${tick}`)
    console.log(data.data.data['Time Series (Daily)']);
    dispatch({ type: GET_DAILY, data: data.data.data['Time Series (Daily)']})
    
    // dispatch({type: GET_DAILY, data:data.data})
  }

  return {
    stock,
    getDailyAdjusted,
    select,
    setSelect
  };
};
export default useStockData;