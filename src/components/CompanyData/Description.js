import Table from 'react-bootstrap/Table';
import { useState, useContext } from 'react';
import AppContext from 'AppContext';
const Description = ({ desc }) => {
  const [readMore, setReadMore] = useState(false);

  let parsedRows = [];
  if (desc.length) {
    parsedRows = Object.entries(desc).map(({ val, key }, index) => {
      return (
        <tr>
          <td>
            {key}
          </td>
          <td>
            {
              key === 'Description' ?
                (
                  readMore
                    ?
                    <>
                      <div>
                        {val}
                      </div>
                      <span
                        style={{
                          color: 'blue'
                        }}
                        onClick={() => setReadMore(false)}>less</span>
                    </>
                    :
                    <>
                      <div>
                        {val.slice(0, 45)}
                      </div>
                      <span
                        style={{
                          color: 'blue'
                        }}
                        onClick={() => setReadMore(true)}>...more</span>
                    </>

                )
                : val
            }
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <Table striped bordered hover>
        <div className='description-container'>
        </div>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {parsedRows.length > 0 && parsedRows}
        </tbody>
      </Table>
    </>
  );


};

export default Description;