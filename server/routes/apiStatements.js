const router = require('express').Router();
const alpha = process.env.ALPHA_ARR.split(' ');
const fetch = require('node-fetch');
const DAILY_ADJ = 'TIME_SERIES_DAILY_ADJUSTED';
const cors = require('cors');
router.use(cors());

const INCOME_STATEMENT = 'INCOME_STATEMENT';
const BALANCE_SHEET = 'BALANCE_SHEET';
const CASH_FLOW = 'CASH_FLOW';


// let i = 0;
// const incrementI = () => {
//   i += 1;
//   if (i >= alpha.length) i -= alpha.length;
//   return i;
// };

module.exports = (i, incrementI) => {
  const getURL = (type = DAILY_ADJ, tick) =>
    `https://www.alphavantage.co/query?function=${type}&symbol=${tick}&apikey=${alpha[i]}`;

  router.get('/income/:id', async (req, res) => {
    try {
      const data = await fetch(getURL(INCOME_STATEMENT, req.params.id));
      incrementI();
      const data2 = await data.json();
      res.json({ data: data2 });
    } catch (er) {
      console.log(er);
    }

  });

  router.get('/balance/:id', async (req, res) => {
    try {
      const data = await fetch(getURL(BALANCE_SHEET, req.params.id));
      incrementI();
      const data2 = await data.json();
      res.json({ data: data2 });
    } catch (er) {
      console.log(er);
    }
  });


  router.get('/cash/:id', async (req, res) => {
    try {
      const data = await fetch(getURL(CASH_FLOW, req.params.id));
      incrementI();
      const data2 = await data.json();
      res.json({ data: data2 });
    } catch (er) {
      console.log(er);
    }

  });
  return router;
};