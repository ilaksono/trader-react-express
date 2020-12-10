import { camelToTitle } from 'helpers/chartHelpers';
import { useEffect } from 'react';

const Statements = (props) => {

  useEffect(() => {
    console.log('axios');
  }, []);
  let parsedList = [];
  if (Object.keys(props.statement).length) {
    parsedList = Object
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

  }

  return (
    <div>
      <h2>
        Annual Reports
      </h2>
      <table>
        {parsedList}
      </table>

    </div>
  );
};
export default Statements;