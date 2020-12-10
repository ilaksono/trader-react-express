import { useHistory } from 'react-router-dom';
import 'styles/Dashboard.scss';
const DashboardListItem = (props) => {
  const history = useHistory();
  const handleClick = () => {
    props.getDailyAdjusted(props.symbol);
    history.push('/main');

  };
  let cls = 'green';

  let p = props.c / props.o;
  if (p < 1) {
    cls = 'red';
    p = 1 - p;
  } else p -= 1;

  p *= 10000;
  p = Math.floor(p);
  p /=100;

  return (
    <tr>
      <td onClick={handleClick}>
        {props.T}
      </td>
      <td>
        {props.name}
      </td>
      <td>
        {props.c || 7}
      </td>
      <td className={cls}>
      {p}%
      </td>

    </tr>
  );
};

export default DashboardListItem;