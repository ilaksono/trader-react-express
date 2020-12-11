import { camelToTitle } from 'helpers/chartHelpers';
import { useEffect } from 'react';
import 'styles/Animations.scss';
const key = {
  'balance': 'Balance Sheet',
  'income': 'Income Statement',
  'cash': 'Cash Flow'
};

const Statements = (props) => {

  useEffect(() => {
    console.log('axios');
  }, []);
  let parsedList = [];
  if (Object.keys(props.statement).length) {
    if (props.statement[props.stateMode.mode]) {
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
                <strong>
                  {camelToTitle(key)}
                </strong>

              </td>
              <td>
                {value}
              </td>
            </tr>
          );
        });
    }
  }

  return (
    <div >
      <h2>
        Annual Reports - {key[props.stateMode.mode]}
      </h2>
      <table>
        {parsedList}
      </table>

    </div>
  );
};
export default Statements;