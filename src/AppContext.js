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
  } = useStockData();
    
  const {
    statement,
    getStatementData,
    stateMode,
    resetStateMode,
    setStatementMode


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
      setStatementMode

    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;