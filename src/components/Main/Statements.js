import { camelToTitle } from 'helpers/chartHelpers';

const Statements = (props) => {
  const parsedList = Object
    .entries
    (
      props.statement
      [props.stateMode.mode]
        .annualReports
      [props.stateMode.page]
    )
    .map(([key, value], i) => {
      return (
        <tr className='each-statement'>
          <td>
            {camelToTitle(key)}
          </td>
          <td>
            {value}
          </td>
        </tr>
      );
    });

  return (
    <div>
      <h2>
        {camelToTitle()}
      </h2>

    </div>
  );
};
export default Statements;