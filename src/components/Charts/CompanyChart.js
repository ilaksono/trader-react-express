import { TypeChooser } from "react-stockcharts/lib/helper";
import CandleStickChartWithMA from './CompanyChartObject';
import {useParams} from 'react-router-dom';
import AppContext from 'AppContext';
import {useContext} from 'react';

const CompanyChart = () => {
  const {id} = useParams();
  const {
    candleData
  } = useContext(AppContext);
  return (
    <div className='company-chart-container'>
      <TypeChooser>
        {/* {type => <Chart type={type} data={data} />} */}
        {type => <CandleStickChartWithMA height={140} type={type} data={candleData} />}
      </TypeChooser>
    </div>
  );

};

export default CompanyChart