import DashboardListItem from './DashboardListItem';
import useDashboardData from 'hooks/useDashboardData';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useContext } from 'react';
import AppContext from 'AppContext';
const index = require('index.json');

const Dashboard = () => {

  const {select, getDailyAdjusted} = useContext(AppContext);
  const { dash, setDashboard, setPage } = useDashboardData();

  let parsedList = [];

  // if (dash.data.length) {
  //   parsedList = dash.data.map((each) =>
  //     <DashboardListItem {...each} />
  //     );
  // }

  for (let i = 12 * (dash.page-1); i < 12 * dash.page; i++) {
    parsedList.push(<DashboardListItem getDailyAdjusted={getDailyAdjusted} {...index[i]} />);
  }
  // useEffect(() => {
  //   const arr = index.slice(12 * dash.page, 12 * dash.page + 12);
  //   setDashboard(arr);
  // }, [dash.page]);

  return (
    <div className='dashboard-layout'>
      <div className='dash-container'>
        <table>
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
          </tr>
          {parsedList}
        </table>
      </div>
      <div>
        <Pagination  count={Math.ceil(index.length / 12)} variant='outlined' color='primary' page={dash.page} onChange={setPage} />
      </div>
    </div>
  );
};
export default Dashboard;