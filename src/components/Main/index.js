import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import ChartSection from './ChartSection';
import useChartData from 'hooks/useChartData';
import AppContext from 'AppContext';


const Main = () => {
  const [ticker, setTicker] = useState('');
  const {
    chartOptions,
    setChartOptions,
    chartData,
    setChartData,
    primeChartData
  } = useChartData();

  const {
    stock,
    getDailyAdjusted
  } = useContext(AppContext);


  const handleSubmit = () => {
    getDailyAdjusted(ticker);
  };


  useEffect(() => {
    if (Object.keys(stock))
      primeChartData(stock);
  }, [stock]);

  return (
    <div>
      <h1>
        Submit Any Ticker
      </h1>
      <form onSubmit={event => event.preventDefault()}>
        <input
          value={ticker}
          onChange={event =>
            setTicker(event.target.value)}
        />
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          onClick={handleSubmit}
        >Submit</Button>
      </form>

      <ChartSection data={chartData} options={chartOptions}/>


    </div>

  );
};

export default Main;