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
import StatementsDate from './StatementsDate';
import Side from 'components/Side';

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
    setStatementMode,
    stateErr,
    resetStateErr,
    stockErr,
    resetStockErr,
    changeStatePage,
    resetStatePage,
    primeData,

  } = useContext(AppContext);

  const handleSubmit = () => {
    resetStockErr();
    if (daily)
      getDailyAdjusted(ticker);
    else
      getIntra(ticker);
    setBlank(ticker);
  };

  const clickChartTab = (val) => {
    setSelect(val);
  };

  useEffect(() => {
    resetStateErr();
  }, [statement]);
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
                {stockErr.type &&
                  <div>
                    {stockErr.msg}
                  </div>
                }
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
          (
            !stateErr.type ?

              <div className='statements-container fade-right'>
                <StatementOptions
                  setStatementMode={setStatementMode}
                  stateMode={stateMode}
                />
                {
                  // statement[stateMode.mode].annualReports &&
                  // <StatementsDate
                  //   arr={statement[stateMode.mode].annualReports}
                  //   changeStatePage={changeStatePage}
                  // />
                }
                <Statements
                  statement={statement}
                  stateMode={stateMode}
                  getStatementData={getStatementData}
                  showStates={showStates}
                  err={stockErr}
                  resetStatePage={resetStatePage}
                  changeStatePage={changeStatePage}
                  primeData={primeData}
                />
              </div>
              :
              <div className='statements-container'>
                {stateErr.msg}
              </div>
          )
        }
        <Button onClick={() =>
          setShowStates(prev => !prev)}
          style={{
            position: 'fixed',
            right: showStates ? '340px' : '80px',
            top: '220px',
            zIndex: '7'
          }}
          variant='outlined'
        >{!showStates ? 'SHOW' : 'HIDE'}
        </Button>
      </div>
      <Side 
        showStates={showStates}
      />
    </>
  );
};

export default Main;

// webgradients.com