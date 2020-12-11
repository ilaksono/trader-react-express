import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import axios from 'axios';
import 'styles/Scrollbars.scss';
import { useState } from 'react';
const SymbolAuto = props => {
  const [options, setOptions] = useState([]);

  const getAuto = async () => {
    const res = await axios
      .get(`/api/autocomplete/${props.ticker}`);
    setOptions(res.data.data);
    return res;
  };

  return (
    <>
      <Combobox
        // style={{
        //   fontFamily: 'Montserrat'
        // }}
        onSelect={add => {
          props.setTicker(add, false);
          setOptions([]);
          // props.clearSuggestions();
        }}
      >
        <ComboboxInput value={props.ticker}
          onChange={(e) => {
            props.setTicker(e.target.value);
            getAuto();
          }}
          disabled={false}
          placeholder="AAPL"
        />
        <ComboboxPopover>
          {options.length && options.map(({ symbol }) =>
            <ComboboxOption key={symbol} value={symbol}>
            </ComboboxOption>
          )

          }

        </ComboboxPopover>

      </Combobox>
    </>
  );
};

export default SymbolAuto;