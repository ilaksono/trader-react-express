import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useHistory } from 'react-router-dom';
import 'styles/Dashboard.scss';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const history = useHistory();
  const handleClick = () => {
    props.getDailyAdjusted(row.symbol);
    history.push('/main');
  };
  let cls = 'green';
  let p = row.close / row.specs[0].open;
  console.log(row.close, row.open);
  if (p < 1) {
    cls = 'red';
    p = 1 - p;
  } else p -= 1;

  p *= 10000;
  p = Math.floor(p);
  p /= 100;
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell onClick={handleClick} align="right">{row.symbol}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.close}</TableCell>
        <TableCell align="right" style={{ color: cls }}>{p}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow >
                    <TableCell style={{ fontWeight: 'bold' }}>High</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Low</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">Open</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">Volume</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.specs.map((spec) => (
                    <TableRow key={spec.high}>
                      <TableCell component="th" scope="row">
                        {spec.high}
                      </TableCell>
                      <TableCell >{spec.low}</TableCell>

                      <TableCell align='right'>{spec.open}</TableCell>
                      <TableCell align='right'>{spec.volume}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
function createData(symbol, name, close, volume, high, low, open) {
  return {
    symbol,
    name,
    close,
    specs: [
      { high, low, open, volume },
    ],
  };
}


export default function CollapsibleTable(props) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: 'bold' }} align='right'>Symbol</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">Price</TableCell>
            <TableCell 
              onClick={props.sortStockData}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              align="right">
              <div>
                </div>Gain/Loss %
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.index.map((row) => {
            row = createData(row.T, row.name, row.c, row.v, row.h, row.l, row.o);
            return <Row key={row.name} row={row} getDailyAdjusted={props.getDailyAdjusted} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}