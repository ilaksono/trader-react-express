require('dotenv').config();

const app = require('express')();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const index = require('./index.json');


const DAILY_ADJ = 'TIME_SERIES_DAILY_ADJUSTED';
const SYMBOL_SEARCH = 'SYMBOL_SEARCH';
const GLOBAL_QUOTE = 'GLOBAL_QUOTE';
const OVERVIEW = 'OVERVIEW';

const primeData = () => {
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
    let i = 0;

    try {
      const db = client.db('trader');
      const stocks = db.collection('overviews').initializeOrderedBulkOp();
      const A = await setInterval(async () => {
        const data = await fetch(getURL(OVERVIEW, index[i++].symbol));
        const json = await data.json();
        console.log(i, json);
        stocks.insert(json);
        if (i >= 400 || i >= index.length) {
          clearTimeout(A);
          return;
        }
      }, 500);
      await stocks.execute();
      console.log('done');
    } catch (er) {
      console.log(er);
    }

    client.close();



  });
};



app.use(bodyParser.json());
app.use(cors());



const getURL = (type = DAILY_ADJ, tick) => {

  return `https://www.alphavantage.co/query?function=${type}&symbol=${tick}&apikey=${process.env.ALPHA_API_KEY}`;
};

app.get('/api/daily/:id', async (req, res) => {
  try {
    const tick = req.params.id || 'AAPL';
    const data = await fetch(getURL(DAILY_ADJ, tick));
    const data2 = await data.json();
    res.json({ data: data2 });
  } catch (er) {
    console.log(er);
  }
});


// app.get('/api/autocomplete/:id', async (req, res) => {
//   try {
//     const can = req.params.id || 'A';
//     const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.id}&apikey=${process.env.ALPHA_API_KEY}`

//     const data = await fetch(url);
//     const json = await data.json();
//     res.json({ data: json });
//   } catch (er) {
//     console.log(er);
//   }
// });

app.get('/api/autocomplete/:id', async (req, res) => {

  let re = new RegExp(req.params.id, 'g');
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
    const db = client.db('trader');
    const stocks = db.collection('index').initializeOrderedBulkOp();
    const result = stocks.find({ symbol: "AAPL" });

    await stocks.execute();
    console.log(result);

    client.close();
  });
});





app.get('/api/global/:id', async (req, res) => {
  try {
    const data = await fetch(
      getURL(GLOBAL_QUOTE, req.params.id)
    );
    const json = await data.json();
    res.json({ data: json });
  } catch (er) {
    console.log(er);
  }
});

// const dbb = require('./overview1208.json');


app.listen(PORT, () => {
  // console.log(index.length);
  // primeData();

  // MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
  //   const db = client.db('trader');
  //   const stocks = db.collection('overviews').initializeOrderedBulkOp();

  //   dbb.results.forEach(each => {
  //     stocks.insert(each)
  //   });
  //   await stocks.execute();
  //   console.log('done');
  // })
  console.log('listening on ', PORT);
});
