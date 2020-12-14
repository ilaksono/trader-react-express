import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const then = new Date(date);
  const m = then.getMonth();
  const yr = then.getYear();
  return `${months[m]} ${yr}`;
}

export default function StatementsDate(props) {

  const getFiscalDate = (index) => {
    console.log(index);
    return props.arr[index].fiscalDateEnding || 'Never';
  };

  const handleChange = (event, newValue) => {
    props.changeStatePage(newValue);
  };

  const classes = useStyles();
  // const marks = [
  //   {
  //     value: 0,
  //     label: formatDate(props.arr[0]),
  //   },
  //   {
  //     value: props.arr.length - 1,
  //     label: formatDate(props.arr[props.arr.length - 1]),
  //   },
  // ];
  let marks = [];
  if (props.arr.length) {
    marks = props.arr.map((val, i) => {
      return {
        value: i,
        label: formatDate(val.fiscalDateEnding)
      };
    });

  }
  console.log(marks, 'marks');

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Timeline
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={getFiscalDate}
        aria-labelledby="discrete-slider-custom"
        step={1}
        min={0}
        max={props.arr.length - 1}
        valueLabelDisplay="auto"
        // marks={marks}
        marks
        onChange={handleChange}
      />
    </div>
  );
}