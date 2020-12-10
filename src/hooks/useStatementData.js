import { useReducer } from 'react';
import { camelToTitle } from 'helpers/chartHelpers';
import axios from 'axios';
const GET_CASH = 'GET_CASH';
const statReducer = (statement, action) => {

  switch (action.type) {
    case GET_CASH:
      return { [action.key]: action.data };

    default:
      throw new Error('invalid statement type');
  }

};

const initStat = {

};
const useStatementData = () => {
  const [statement, dispatch] = useReducer(statReducer, initStat);

  const getStatementData = async (key) => {
    const data = axios.get(`/api/statements/${key}`);
    dispatch({ type: GET_CASH, data: data.data.data, key });
  };
  return {
    statement,
    getStatementData
  };
};