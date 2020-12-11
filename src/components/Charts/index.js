import Chart from './Chart';
import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import ChartSection from 'components/Main/ChartSection';
import useChartData from 'hooks/useChartData';
import AppContext from 'AppContext';
import ChartSwitch from 'components/Main/ChartSwitch';
import SymbolAuto from 'components/Main/SymbolAuto';
import Statements from 'components/Main/Statements';
import 'styles/Main.scss';
import StatementOptions from 'components/Main/StatementOptions';
import { TypeChooser } from "react-stockcharts/lib/helper";
import CandleStickChartWithMA from './CandlePointer';

const data = [
  {
    open: 12115,
    high: 12116,
    low: 12110,
    close: 12114,
    date: new Date('2020-12-11'),
    volume: 1000
  },
  {
    open: 12114,
    high: 12115,
    low: 12112,
    close: 12115,
    date: new Date('2020-12-12'),
    volume: 2000
  },
  {
    open: 12114,
    high: 12115,
    low: 12112,
    close: 12115,
    date: new Date('2020-12-13'),
    volume: 2000
  },
  {
    open: 12114,
    high: 12115,
    low: 12112,
    close: 12115,
    date: new Date('2020-12-14'),
    volume: 2000
  },
  {
    open: 12114,
    high: 12120,
    low: 12112,
    close: 12115,
    date: new Date('2020-12-15'),
    volume: 4000

  },
  {
    open: 12114,
    high: 12115,
    low: 12112,
    close: 12115,
    date: new Date('2020-12-16'),
    volume: 2000
  },

];

const Candle = (props) => {


  const [ticker, setTicker] = useState('');
  const [blank, setBlank] = useState('');
  const {
    chartOptions,
    setChartOptions,
    chartData,
    setChartData,
    primeChartData
  } = useChartData();
  const [showStates, setShowStates]
    = useState(false);
  const {
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

  } = useContext(AppContext);


  const handleSubmit = () => {
    if (daily)
      getDailyAdjusted(ticker);
    else
      getIntra(ticker);
    setBlank(ticker);
  };
  useEffect(() => {
    if (ticker.length)
      getStatementData(blank);
  }, [blank, stateMode]);

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
    <>
      <div className='main-layout'>
        <div className='chart-container'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <form onSubmit={event => event.preventDefault()}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <SymbolAuto ticker={ticker} setTicker={setTicker} />
                <Button
                  type='submit'
                  color='default'
                  onClick={handleSubmit}
                >Submit</Button>
              </div>
            </form>
            <ChartSwitch select={select}
              clickChartTab={clickChartTab}
              swapIntraDaily={swapIntraDaily}
              daily={daily}
            />
          </div>

          <div>
            {header.symbol} - {header.date} - {header.type}
          </div>
          <TypeChooser>
            {/* {type => <Chart type={type} data={data} />} */}
            {type => <CandleStickChartWithMA type={type} data={data} />}

          </TypeChooser>
        </div>
        {showStates &&

          <div className='statements-container fade-right'>
            <StatementOptions
              setStatementMode={setStatementMode}
              stateMode={stateMode}
            />
            <Statements
              statement={statement}
              stateMode={stateMode}
              getStatementData={getStatementData}
              showStates={showStates}
            />
          </div>
        }
        <Button onClick={() =>
          setShowStates(prev => !prev)}
          style={{
            position: 'fixed',
            right: showStates ? '340px' : '80px',
            top: '120px'
          }}
          variant='outlined'
        >{!showStates ? 'SHOW' : 'HIDE'}
        </Button>
      </div>
    </>
  );
  
};

export default Candle;
// webgradients.com