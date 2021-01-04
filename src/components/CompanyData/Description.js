import Table from 'react-bootstrap/Table';
import { useState } from 'react';
const Description = ({ desc }) => {
  const [readMore, setReadMore] = useState(false);

  let parsedRows = [];
  if (desc.Symbol) {
    parsedRows = Object.entries(desc).map(({ val, key }, index) => {
      return (
        <tr key={index}>
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
                : 
                val
            }
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <div className='description-container'>
        <Table striped bordered hover>
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
      </div>
    </>
  );


};

export default Description;