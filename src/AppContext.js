import React from 'react';
import useStockData from 'hooks/useStockData';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const {
    stock,
    getDailyAdjusted
  } = useStockData();
    
  return (
    <AppContext.Provider value={{
      stock,
      getDailyAdjusted
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;