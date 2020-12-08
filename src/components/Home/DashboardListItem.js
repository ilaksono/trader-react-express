const DashboardListItem = (props) => {
  return (
    <tr>
      <td>
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