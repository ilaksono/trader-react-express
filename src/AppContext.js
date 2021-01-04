import React from 'react';
import useStockData from 'hooks/useStockData';
import useStatementData from 'hooks/useStatementData';
import useStatementChart from 'hooks/useStatementChart';
import useCandleData from 'hooks/useCandleData';
import useOverviewData from 'hooks/useOverviewData';
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
    overview,
    setOverview,
    primeOverview,
    desc
  } = useOverviewData();
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
      resetCandleErr,
      overview,
      setOverview,
      primeOverview,
      desc,

    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;