import React from 'react';
import useStockData from 'hooks/useStockData';
import useStatementData from 'hooks/useStatementData';
import useStatementChart from 'hooks/useStatementChart';
import useCandleData from 'hooks/useCandleData';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const {
    stock,
    getDailyAdjusted,
    select,
    setSelect,
    header,
    swapIntraDaily,
    daily,
    getIntra,
    stockErr,
    resetStockErr
  } = useStockData();
    const {
      stateData,
      primeData
    } = useStatementChart();
  const {
    statement,
    getStatementData,
    stateMode,
    resetStateMode,
    setStatementMode,
    stateErr,
    resetStateErr,
    changeStatePage,
    resetStatePage

  } = useStatementData();

  const {
    candleData,
    getCandleData,
    candleHeader,
    toggleAdjusted,
    adjust,
    candleErr,
    resetCandleErr
  } = useCandleData();

  return (
    <AppContext.Provider value={{
      stock,
      getDailyAdjusted,
      select,
      setSelect,
      header,
      swapIntraDaily,
      daily,
      getIntra,
      statement,
      getStatementData,
      stateMode,
      resetStateMode,
      setStatementMode,
      stateErr,
      resetStateErr,
      stockErr,
      resetStockErr,
      changeStatePage,
      resetStatePage,
      stateData,
      primeData,
      candleData,
      getCandleData,
      candleHeader,
      toggleAdjusted,
      adjust,
      candleErr,
      resetCandleErr

    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;