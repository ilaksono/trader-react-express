import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import ChartSection from './ChartSection';
import useChartData from 'hooks/useChartData';
import AppContext from 'AppContext';
import ChartSwitch from './ChartSwitch';
import SymbolAuto from './SymbolAuto';
import { Switch } from '@material-ui/core';

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
    getDailyAdjusted,
    select,
    setSelect,
    header,
    swapIntraDaily,
    daily,
    getIntra
  } = useContext(AppContext);
  

  const handleSubmit = () => {
    if (daily)
      getDailyAdjusted(ticker);
    else
      getIntra(ticker);
  };

  useEffect(() => {
    handleSubmit();
  }, [daily]);



  useEffect(() => {
    if (Object.keys(stock))
      primeChartData(stock, select);
    // eslint-disable-next-line
  }, [stock, select]);
  const clickChartTab = (val) => {
    setSelect(val);
  };
  return (
    <div>
      <h1>
        Submit Any Ticker
      </h1>
      <Switch onChange={() => {
        swapIntraDaily();
      }} checked={daily} name='daily' color='primary'
      />
      <label>Toggle {!daily ? 'Daily' : '5 min'}</label> 
      <form onSubmit={event => event.preventDefault()}>
        {/* <input
          value={ticker}
          onChange={event =>
            setTicker(event.target.value)}
        /> */}
        <SymbolAuto ticker={ticker} setTicker={setTicker} />
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          onClick={handleSubmit}
        >Submit</Button>
      </form>
      <ChartSwitch select={select}
        clickChartTab={clickChartTab}
        daily={daily}
      />
      <div>
        {header.symbol} - {header.date} - {header.type}
      </div>

      <ChartSection data={chartData} options={chartOptions} />


    </div>

  );
};

export default Main;

// webgradients.com