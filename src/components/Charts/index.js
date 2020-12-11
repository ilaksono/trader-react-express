import Chart from './Chart';
import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import ChartSection from 'components/Main/ChartSection';
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


const Candle = (props) => {


  const [ticker, setTicker] = useState('');
  const [blank, setBlank] = useState('');
  const {

    primeChartData
  } = useChartData();
  const {
    candleData,
    getCandleData,
    candleHeader
  } = useCandleData();
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
    setStatementMode

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
          </div>

          <div>
            {candleHeader.symbol} - {candleHeader.date} - {candleHeader.type}
          </div>
          {
            candleData.length && 
          <TypeChooser>
            {/* {type => <Chart type={type} data={data} />} */}
            {type => <CandleStickChartWithMA type={type} data={candleData} />}
          </TypeChooser>

          }
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

