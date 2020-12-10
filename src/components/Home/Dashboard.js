import DashboardListItem from './DashboardListItem';
import useDashboardData from 'hooks/useDashboardData';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useContext, useState } from 'react';
import AppContext from 'AppContext';
import axios from 'axios';
// const index = require('index.json');
import CircularProgress from '@material-ui/core/CircularProgress';
import DashTable from './DashTable';

const Dashboard = () => {

  const { select, getDailyAdjusted } = useContext(AppContext);
  const { dash, setDashboard, setPage } = useDashboardData();
  const [sort, setSort] = useState(false);
  const [index, setIndex] = useState([]);
  let parsedList = [];

  useEffect(() => {
    axios
      .get('/api/dash')
      .then((data) => {
        setIndex(data.data.data);
      });
  }, []);
  const sortStockData = () => {
    let cpy = [...index];
    if (sort) {
      cpy = cpy.sort((lp, rp) => {
        return ((lp.o / lp.c) > (rp.o / rp.c)) ? 1 : -1;
      });

    } else {
      cpy = cpy.sort((lp, rp) => {
        return ((lp.o / lp.c) < (rp.o / rp.c)) ? 1 : -1;
      });
    }
    setSort(prev => !prev);
    setIndex([...cpy]);
  };
  // if (dash.data.length) {
  //   parsedList = dash.data.map((each) =>
  //     <DashboardListItem {...each} />
  //     );
  // }
  if (index.length) {
    // for (let i = 12 * (dash.page - 1); i < 12 * dash.page; i++) {
    //   parsedList.push(<DashboardListItem getDailyAdjusted={getDailyAdjusted} {...index[i]} />);
    // }
    parsedList = index.slice(12 * (dash.page - 1), 12 * dash.page);
  }
  // useEffect(() => {
  //   const arr = index.slice(12 * dash.page, 12 * dash.page + 12);
  //   setDashboard(arr);
  // }, [dash.page]);

  return (
    <div className='dashboard-layout'>
      <div className='dash-container'>
        {
          !index.length ?
            <CircularProgress size='100' color='primary' />
            :
            <DashTable
              index={parsedList}
              getDailyAdjusted={getDailyAdjusted}
              sortStockData={sortStockData}
            />
        }


      </div>
      <div>
        <Pagination count={Math.ceil(index.length / 12)} variant='outlined' color='primary' page={dash.page} onChange={setPage} />
      </div>
    </div>
  );
};
export default Dashboard;


/* <table>
  <tr>
    <td>
      Symbol
            </td>
    <td>
      Name
            </td>
    <td>
      Closing ($)
            </td>
    <td>
      % Diff
            </td>
  </tr>
  {parsedList}
</table> */