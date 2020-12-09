import {useHistory} from 'react-router-dom';

const DashboardListItem = (props) => {
  const history = useHistory();
  const handleClick = () => {
    props.getDailyAdjusted(props.symbol)
    history.push('/main')

  }

  return (
    <tr>
      <td onClick={handleClick}>
        {props.symbol}
      </td>
      <td>
        {props.name}
      </td>
      <td>
        {props.value || 7}
      </td>
    </tr>
  )
}

export default DashboardListItem;