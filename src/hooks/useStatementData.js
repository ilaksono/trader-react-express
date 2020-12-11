import { useReducer, useState } from 'react';
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
const initMode = {
  mode: 'balance',
  page: 0
};

const initStat = {};
const useStatementData = () => {
  const [statement, dispatch]
    = useReducer(statReducer, initStat);
  const [stateMode, setStateMode] = useState(initMode);

  const resetStateMode = () => {
    setStateMode(initMode);
  };
  const setStatementMode = (key) => {
    setStateMode({...stateMode, mode: key});
  }

  const getStatementData = async (ticker) => {
    const data = await axios
      .get(`/api/statements/${stateMode.mode}/${ticker}`);
    sortByDate(data.data.data.annualReports);
    dispatch({ type: GET_CASH, data: data.data.data, key: stateMode.mode });
  };
  const sortByDate = (arr) => {
    if (arr.length)
      return arr
        .sort((lp, rp) =>
          new Date(rp['fiscalDateEnding'])
            .getTime() >
            new Date(lp['fiscalDateEnding'])
              .getTime()
            ? 1 : -1);
    else return [];
  };


  return {
    statement,
    getStatementData,
    stateMode,
    resetStateMode,
    setStatementMode
  };
};

export default useStatementData;