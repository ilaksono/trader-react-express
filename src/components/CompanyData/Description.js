import Table from 'react-bootstrap';
import {useState} from 'react';

const Description = () => {
  const [readMore, setReadMore] = useState(false);
  

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
          <tr>
            <td>1</td>
            <td>Mark</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
          </tr>
        </tbody>
      </Table>
    </>
  );


};