import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import ChartSection from './ChartSection';
import useChartData from 'hooks/useChartData';
import AppContext from 'AppContext';
import ChartSwitch from './ChartSwitch';
import SymbolAuto from './SymbolAuto';
import Statements from './Statements';
import 'styles/Main.scss';
import StatementOptions from './StatementOptions';
const Main = () => {
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
              {/* <input
          value={ticker}
          onChange={event =>
            setTicker(event.target.value)}
        /> */}
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
          <ChartSection data={chartData} options={chartOptions} />

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
            right: showStates ? '340px': '80px',
            top: '120px'
          }}
          variant='outlined'
        >{!showStates ? 'SHOW' : 'HIDE'}
        </Button>
      </div>
    </>
  );
};

export default Main;

// webgradients.com