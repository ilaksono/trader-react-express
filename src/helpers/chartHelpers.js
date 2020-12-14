
const calculateChart = (data) => {

};

export const camelToTitle = (camel) => {
  const title = camel.split('');
  const spaceArr = [];
  let adjust = 0;
  for (let i = 0; i < camel.length; i++) {
    if (camel.charCodeAt(i) >= 65 && camel.charCodeAt(i) <= 90) {
      spaceArr.push(i);
    }
  }
  spaceArr.forEach((val, index) => {
    title.splice(val + adjust, 0, ' ');
    adjust++;
  });
  title[0] = title[0].toUpperCase();
  return title.join('');
};

export const formatLargeNumber = (num) => {
  if (num === 'null' || num === 'None' || !num)
    return 0;
  num = Math.floor(Number(num));
  const arr = JSON.stringify(num).split('');
  let cntr = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    cntr++;
    if (cntr % 3 === 0)
      arr.splice(i, 0, ', ');
  }
  if (arr[0] === ', ')
    arr.shift();
  return arr.join('');
};

// console.log(formatLargeNumber('123123213213212'));



