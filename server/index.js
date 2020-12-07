require('dotenv').config();

const app = require('express')();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

app.use(bodyParser.json());
app.use(cors());
const DAILY_ADJ = 'TIME_SERIES_DAILY_ADJUSTED';

const getURL = (type = DAILY_ADJ, tick) => {
  
  return `https://www.alphavantage.co/query?function=${type}&symbol=${tick}&apikey=${process.env.ALPHA_API_KEY}`
}

app.get('/api/daily/:id', async (req, res) => {
  try{
    const tick = req.params.id || 'AAPL'
    const data = await fetch(getURL(DAILY_ADJ, tick))
    const data2 = await data.json();
    res.json({ data: data2 })
  } catch(er) {
    console.log(er);
  }
})


app.listen(PORT, () => {
  console.log('listening on ', PORT);
});