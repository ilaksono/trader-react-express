import { useReducer } from 'react';
import axios from 'axios';

const initStock = {
  'Meta Data': {},
  'Time Series (Daily)': {}
};

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

  const getDailyAdjusted = async (tick) => {
    const data = await axios
    .get(`/api/daily/${tick}`)
    console.log(data.data.data['Time Series (Daily)']);
    dispatch({ type: GET_DAILY, data: data.data.data['Time Series (Daily)']})
    
    // dispatch({type: GET_DAILY, data:data.data})
  }

  return {
    stock,
    getDailyAdjusted
  };
};
export default useStockData;