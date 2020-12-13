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
const initErr = {
  type: '',
  msg: ''
};

const initStat = {};
const useStatementData = () => {
  const [statement, dispatch]
    = useReducer(statReducer, initStat);
  const [stateMode, setStateMode] = useState(initMode);
  const [stateErr, setStateErr] = useState(initErr);

  const resetStateMode = () => {
    setStateMode(initMode);
  };
  const setStatementMode = (key) => {
    setStateMode({ ...stateMode, mode: key });
  };

  const getStatementData = async (ticker) => {
    try {
      const data = await axios
        .get(`/api/statements/${stateMode.mode}/${ticker}`);
      if (!data.data.data)
        return setStateErr({ type: 'NO_STATEMENT', msg: `Could not find statements for ${ticker}` });
      sortByDate(data.data.data.annualReports);
      dispatch({ type: GET_CASH, data: data.data.data, key: stateMode.mode });
    } catch (er) {
      console.log(er);
      return setStateErr({ type: 'NO_STATEMENT', msg: `Could not find statements for ${ticker}` });

    }
  };
  const sortByDate = (arr) => {
    if (arr)
      return arr
        .sort((lp, rp) =>
          new Date(rp['fiscalDateEnding'])
            .getTime() >
            new Date(lp['fiscalDateEnding'])
              .getTime()
            ? 1 : -1);
    else return [];
  };
  const resetStateErr = () => {
    setStateErr(initErr);
  };


  return {
    statement,
    getStatementData,
    stateMode,
    resetStateMode,
    setStatementMode,
    stateErr,
    resetStateErr
  };
};

export default useStatementData;