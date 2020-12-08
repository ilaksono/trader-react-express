import DashboardListItem from './DashboardListItem';
const index = require('index.json');

const Dashboard = () => {

  let parsedList = [];
  for (let i = 0; i < 10; i++) {
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
    </div>
  );
};
export default Dashboard;