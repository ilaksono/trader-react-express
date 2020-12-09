import DashboardListItem from './DashboardListItem';
import useDashboardData from 'hooks/useDashboardData';
import Pagination from '@material-ui/lab/Pagination';
const index = require('index.json');

const Dashboard = () => {
  const {dash, setDashboard, setPage} = useDashboardData();

  let parsedList = [];
  for (let i = 0; i < 12; i++) {
    parsedList.push(<DashboardListItem {...index[i]} />);
  }
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
        <Pagination count={Math.ceil(index.length / 10)} variant='outlined' color='primary' page={dash.page} onChange={setPage}/>
      </div>
    </div>
  );
};
export default Dashboard;