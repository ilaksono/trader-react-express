const calculateChart = (data) => {

};

const camelToTitle = (camel) => {
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
