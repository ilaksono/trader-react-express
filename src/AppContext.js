import React from 'react';
import useStockData from 'hooks/useStockData';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const {
    stock,
    getDailyAdjusted,
    select,
    setSelect,
    header,

  } = useStockData();
    
  return (
    <AppContext.Provider value={{
      stock,
      getDailyAdjusted,
      select,
      setSelect,
      header,

    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;