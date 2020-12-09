import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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


const options = [
  { key: '1. open', name: 'Open' },
  { key: '2. high', name: 'High' },
  { key: '3. low', name: 'Low' },
  { key: '4. close', name: 'Close' },
  { key: '5. adjusted close', name: 'Adjusted C' },
  { key: '6. volume', name: 'Volume' },
  { key: '7. dividend amount', name: 'Dividend' },
  { key: '8. split coefficient', name: 'Split Coeff' }
];

const optionsIntra = [
  { key: '1. open', name: 'Open' },
  { key: '2. high', name: 'High' },
  { key: '3. low', name: 'Low' },
  { key: '4. close', name: 'Close' },
  { key: '5. volume', name: 'Volume' },
]

const ChartSwitch = (props) => {

  const classes = useStyles();

  const arr = ['priceLeft', 'price', 'price', 'priceRight', 'priceLeft', 'price', 'price', 'priceRight'];

  const buttons = props.daily ? options
    .map((select, index) => {
      return (
        <div className="chart-filter-button" key={index} >
          <Button
            color={select.key === props.select
              ? 'primary' : 'default'}
            variant='contained'
            className={classes[arr[index]]}
            key={index}
            name={select.name}
            onClick={() =>
              props.clickChartTab(select.key)}>
            {select.name}
          </Button>
        </div>
      );
    }) :
    optionsIntra
      .map((select, index) => {
        return (
          <div className="chart-filter-button" key={index} >
            <Button
              color={select.key === props.select
                ? 'primary' : 'default'}
              variant='contained'
              className={classes[arr[index]]}
              key={index}
              name={select.name}
              onClick={() =>
                props.clickChartTab(select.key)}>
              {select.name}
            </Button>
          </div>
        );
      })
    ;

  return (
    <div className='chart-filter-container' style={{ display: 'flex', flexDirection: 'row' }}>
      {buttons}
    </div>
  );
};

export default ChartSwitch;