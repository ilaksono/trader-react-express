import ChartSection from 'components/Main/ChartSection';
import { useContext, useState } from 'react';
import AppContext from 'AppContext';
import Button from '@material-ui/core/Button';

const Side = () => {
  const [chartOpen, setChartOpen] = useState(false);
  const {
    stateData,
  } = useContext(AppContext);
  return (
    <div>
      {
        stateData.data.labels.length &&
        (
          <Button
            onClick={() => setChartOpen(prev => !prev)}
          >
            {chartOpen ? 'HIDE' : 'SHOW'}
          </Button>
        )
      }
      {
        (chartOpen && stateData.data.ready) &&
        <div>
          <ChartSection
            data={stateData.data}
            options={stateData.options}
          />
        </div>
      }
    </div>

  );

};

export default Side;