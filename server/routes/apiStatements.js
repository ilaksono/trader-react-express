const router = require('express').Router();
const alpha = process.env.ALPHA_ARR.split(' ');
let {i, incrementI, getURL, fetch} = require('../index'); 

const INCOME_STATEMENT = 'INCOME_STATEMENT';
const BALANCE_SHEET = 'BALANCE_SHEET';
const CASH_FLOW = 'CASH_FLOW';

module.exports = () => {

  router.get('/income/:id', async (req, res) => {
    try {
      const data = await fetch(getURL(INCOME_STATEMENT, req.params.id));
      incrementI();
      const data2 = await data.json();
      res.json({ data: data2 });
    }catch(er) {
      console.log(er);
    }

  })
  
  router.get('/balance/:id', async (req, res) => {
    try {
      const data = await fetch(getURL(BALANCE_SHEET, req.params.id));
      incrementI();
      const data2 = await data.json();
      res.json({ data: data2 });
    } catch(er) {
      console.log(er);
    }
  })


  router.get('/cash/:id', async (req, res) => {
    try {
      const data = await fetch(getURL(CASH_FLOW, req.params.id));
      incrementI();
      const data2 = await data.json();
      res.json({ data: data2 });
    } catch (er) {
      console.log(er);
    }

  })
  return router;
}