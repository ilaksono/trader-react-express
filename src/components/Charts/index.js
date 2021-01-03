import Chart from './Chart';
import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import useChartData from 'hooks/useChartData';
import AppContext from 'AppContext';
import SymbolAuto from 'components/Main/SymbolAuto';
import Statements from 'components/Main/Statements';
import 'styles/Main.scss';
import StatementOptions from 'components/Main/StatementOptions';
import { TypeChooser } from "react-stockcharts/lib/helper";
import CandleStickChartWithMA from './CandlePointer';
import useCandleData from 'hooks/useCandleData';
import { Switch } from '@material-ui/core';
import StatementsDate from 'components/Main/StatementsDate';
import Side from 'components/Side';
const Candle = (props) => {


  const [ticker, setTicker] = useState('');
  const [blank, setBlank] = useState('');
  const {
    primeChartData
  } = useChartData();

  const [showStates, setShowStates]
    = useState(false);

  const {
    stock,
    select,
    swapIntraDaily,
    daily,
    statement,
    getStatementData,
    stateMode,
    setStatementMode,
    changeStatePage,
    resetStatePage,
    primeData,
    candleData,
    getCandleData,
    candleHeader,
    toggleAdjusted,
    adjust,
    candleErr,
    resetCandleErr

  } = useContext(AppContext);


  const handleSubmit = () => {
    getCandleData(ticker, daily ? 'daily' : 'intra');
    setBlank(ticker);
  };
  useEffect(() => {
    if (ticker.length)
      getStatementData(blank);
  }, [blank, stateMode]);

  useEffect(() => {
    if (ticker.length)
      handleSubmit();
  }, [daily, adjust]);

  useEffect(() => {
    resetCandleErr();
  }, [candleData]);

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
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <SymbolAuto ticker={ticker} setTicker={setTicker} />
                <Button
                  type='submit'
                  color='default'
                  onClick={handleSubmit}
                >Submit</Button>
              </div>
            </form>
            <Switch onChange={() => {
              swapIntraDaily();
            }} checked={daily} name='daily' color='primary'
            />
            <label>{daily ? 'Daily' : '5 min'}</label>
            <Switch onChange={() => {
              toggleAdjusted();
            }} checked={adjust} name='daily' color='primary'
            />
            <label>{adjust ? 'Adjusted' : 'Close'}</label>
          </div>

          <div>
            {candleHeader.symbol} - {candleHeader.date} - {candleHeader.type}
          </div>
          {
            (candleData.length && !candleErr.type) &&
            <TypeChooser>
              {/* {type => <Chart type={type} data={data} />} */}
              {type => <CandleStickChartWithMA type={type} data={candleData} />}
            </TypeChooser>
          }
          {candleErr.type &&
            <div>
              {candleErr.msg}
            </div>

          }
        </div>
        {showStates &&

          <div className='statements-container fade-right'>
            <StatementOptions
              setStatementMode={setStatementMode}
              stateMode={stateMode}
            />
            {
              // statement[stateMode.mode] &&
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
              err={candleErr}
              resetStatePage={resetStatePage}
              changeStatePage={changeStatePage}
              primeData={primeData}
            />
          </div>
        }
        <Button onClick={() =>
          setShowStates(prev => !prev)}
          style={{
            position: 'fixed',
            right: showStates ? '380px' : '80px',
            top: '220px',
            zIndex: 7

          }}
          variant='outlined'
        >{!showStates ? 'SHOW' : 'HIDE'}
        </Button>
      </div>
      <Side showStates={showStates} />
    </>
  );

};

export default Candle;
// webgradients.com

