import { camelToTitle } from 'helpers/chartHelpers';
import { useEffect, useState } from 'react';
import { Switch } from '@material-ui/core';
import StatementsDate from './StatementsDate';

import 'styles/Animations.scss';
const key = {
  'balance': 'Balance Sheet',
  'income': 'Income Statement',
  'cash': 'Cash Flow'
};

const Statements = (props) => {

  const [freq, setFreq] = useState('annualReports');
  const [err, setErr] = useState('');

  const handleFreqChange = () => {
    props.resetStatePage();
    setFreq(prev =>
      prev === 'annualReports' ? 'quarterlyReports' : 'annualReports');
  };

  let parsedList = [];
  if (Object.keys(props.statement).length) {
    if (props.statement[props.stateMode.mode] && !props.err.type) {
      if (!props.statement[props.stateMode.mode].annualReports) return [];
      if (!props.statement[props.stateMode.mode].annualReports[0]) return [];
      parsedList = Object
        .entries
        (
          props.statement
          [props.stateMode.mode]
          [freq]
          [props.stateMode.page]
        )
        .map(([key, value], i) => {
          return (
            <tr className='each-statement' 
             onClick={() => props.primeData(props.statement[props.stateMode.mode][freq], key, freq)}
            >
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
      <StatementsDate
        freq={freq}
        arr={props.statement[props.stateMode.mode][freq]}
        changeStatePage={props.changeStatePage}
      />
      <h2>
        {freq === 'annualReports' ? 'Annual Reports' : 'Quarterly Reports'} - {key[props.stateMode.mode]}
      </h2>
      <Switch
        onChange={handleFreqChange}
        checked={freq === 'annualReports' ? false : true}
        name='freq' color='primary'
      />
      <label>{freq === 'annualReports' ? 'Annual' : 'Quarterly'}</label>

      <table>
        {parsedList}
      </table>

    </div>
  );
};
export default Statements;