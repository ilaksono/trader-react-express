
// const calculateChart = (data) => {

// };

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
    if (cntr % 3 === 0) {
      arr.splice(i, 0, ',');
    }
  }
  if (arr[0] === ',')
    arr.shift();

  return `$${arr.join('')}`;
};

export const formatNum = (val, neg = false) => {
  let num = val;

  if (num === 'null' || num === 'None' || !num)
    return 0;
  num = Math.floor(Number(num));
  if (num < 0)
    return formatNum(num * -1, true);
  const power = ['M', 'B', 'T', 'Q'];
  let cntr = 0;
  let suf = '';
  while (Math.floor(num / 1000) > 0) {
    num /= 1000;
    if (++cntr >= 2)
      suf = power[cntr - 2];
  }
  num = Math.floor(num * 10) / 10;
  if (suf) {
    if (neg)
      return `-$${num} ${suf}`;

    return `$${num} ${suf}`;
  }
  return formatLargeNumber(val);
};

export const formatNegNum = val => {

};

