import { camelToTitle } from 'helpers/chartHelpers';




const Statements = (props) => {
  const parsedList = Object.keys((key, i) => {
    return (
      <tr className='each-statement'>
        <td>
          {camelToTitle}
        </td>
        <td>

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