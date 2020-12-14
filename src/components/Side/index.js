import ChartSection from 'components/Main/ChartSection';
import { useContext, useState } from 'react';
import AppContext from 'AppContext';
import Button from '@material-ui/core/Button';
import 'styles/Side.scss'
const Side = (props) => {
  const {
    stateData,
  } = useContext(AppContext);
  const [chartOpen, setChartOpen] = useState(false);

  return (
    <>
    
      {
        stateData.data.labels.length > 0 &&
        (
          <Button
            onClick={() => setChartOpen(prev => !prev)}
            variant='outlined'
            style={{
              position: 'fixed',
              right: props.showStates ? (chartOpen ? '51.5vw' : '27vw') : (chartOpen ? '27vw' : '0')
            }}
          >
            {chartOpen ? 'HIDE' : 'SHOW'}
          </Button>
        )
      }
      {
        (chartOpen && stateData.data.ready) &&
        <div className='fade-right side-menu'
          style={{
            position: 'fixed',
            right: props.showStates ? '26.5vw' : '0',
            top: '83.5px',
          }}>
          <h1>
            Statement Data Chart
    </h1>
          <ChartSection
            data={stateData.data}
            options={stateData.options}
          />
        </div>
      }
    </>

  );

};

export default Side;