import { useReducer } from 'react';
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

const initStat = {};
const useStatementData = () => {
  const [statement, dispatch]
    = useReducer(statReducer, initStat);

  const getStatementData = async (key) => {
    const data = axios
      .get(`/api/statements/${key}`);
    sortByDate(data.data.data.annualReports);
    dispatch({ type: GET_CASH, data: data.data.data, key });
  };
  const sortByDate = (arr) =>
    arr
      .sort((lp, rp) =>
        new Date(rp['fiscalDateEnding'])
          .getTime() >
          new Date(lp['fiscalDateEnding'])
            .getTime()
          ? 1 : -1);

  return {
    statement,
    getStatementData
  };
};

export default useStatementData;