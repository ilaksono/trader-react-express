import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const options = [
  { key: 'balance', name: 'Balance' },
  { key: 'income', name: 'Income' },
  { key: 'cash', name: 'Cash' },
]
const useStyles = makeStyles((theme) => ({
  /*   muiButton: {
      label: {
        width: '10px',
      }
    }, */
  root: {
    width: '40px',
  },
  price: {
    margin: 0,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 12,
    borderRadius: 0,
    minWidth: '80px',
  },
  priceLeft: {
    margin: 0,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 12,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  },
  priceRight: {
    margin: 0,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 12,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
}));

const StatementOptions = (props) => {

  const classes = useStyles();

  const arr = ['priceLeft', 'price', 'priceRight'];

  const buttons = options
    .map((option, index) => {
      return (
        <div className="chart-filter-button" key={index} >
          <Button
            color={option.key === props.stateMode.mode
              ? 'primary' : 'default'}
            variant='contained'
            className={classes[arr[index]]}
            key={index}
            name={option.name}
            onClick={() =>
              props.setStatementMode(option.key)}>
            {option.name}
          </Button>
        </div>
      );
    }) 
    ;

  return (
    <div className='statement-btns-container' 
    style={{ display: 'flex', flexDirection: 'row' }}>
      {buttons}
    </div>
  );
};

export default StatementOptions;