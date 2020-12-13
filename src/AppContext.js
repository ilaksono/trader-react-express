import React from 'react';
import useStockData from 'hooks/useStockData';
import useStatementData from 'hooks/useStatementData';
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
    statement,
    getStatementData,
    stateMode,
    resetStateMode,
    setStatementMode,
    stateErr,
    resetStateErr


  } = useStatementData();
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
      resetStockErr

    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;