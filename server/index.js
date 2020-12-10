require('dotenv').config();

const app = require('express')();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const csvjson = require('csvtojson');
const fs = require('fs');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
// const index = require('./index.json');

const alpha = process.env.ALPHA_ARR.split(' ');
const DAILY_ADJ = 'TIME_SERIES_DAILY_ADJUSTED';
const SYMBOL_SEARCH = 'SYMBOL_SEARCH';
const GLOBAL_QUOTE = 'GLOBAL_QUOTE';
const OVERVIEW = 'OVERVIEW';
const INTRA_DAY = 'TIME_SERIES_INTRADAY';
const INTRA_EX = 'TIME_SERIES_INTRADAY_EXTENDED';

const apiStatements = require('./routes/apiStatements');
app.use('/api/statements', apiStatements());

let i = 0;
const incrementI = () => {
  i += 1;
  if (i >= alpha.length) i -= alpha.length;
  return i;
};
const primeData = () => {
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
    let i = 0;

    try {
      const db = client.db('trader');
      const stocks = db.collection('overviews').initializeOrderedBulkOp();
      const A = await setInterval(async () => {
        const data = await fetch(getURL(OVERVIEW, index[i++].symbol));
        const json = await data.json();
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



const getURL = (type = DAILY_ADJ, tick) => 
  `https://www.alphavantage.co/query?function=${type}&symbol=${tick}&apikey=${alpha[i]}`;

app.get('/api/daily/:id', async (req, res) => {
  try {
    const tick = req.params.id || 'AAPL';
    const data = await fetch(getURL(DAILY_ADJ, tick));
    incrementI();
    const data2 = await data.json();
    res.json({ data: data2 });
  } catch (er) {
    console.log(er);
  }
});

app.get('/api/dash', async (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
    if (err)
      return console.log(err);
    try {

      const db = client.db('trader');
      const stocks = db.collection('aggregate');
      stocks.find({}).sort({ T: 1 })
        .toArray((err, result) => {
          if (err) console.log(err);
          res.json({ data: result });
          client.close();
        });
    } catch (er) {
      console.log(er);
    }

  });
});

app.get('/api/intra/:id', async (req, res) => {
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.id}&interval=5min&apikey=${alpha[i]}`;
    incrementI();
    const data = await fetch(url);
    const A = await data.json();
    res.json({ data: A });
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

  let re = new RegExp(req.params.id);
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
    try {
      const db = client.db('trader');
      const stocks = db.collection('index');
      stocks.find({ symbol: re }).limit(5)
        .toArray((err, result) => {
          if (err)
            console.log(err);
          res.json({ data: result });
          client.close();
        });
      // const json = await result.filter({ symbol: 'AAPL' });
      // console.log(result);
      // res.send(result);
    } catch (er) {
      console.log(er);
    }
  });
});





app.get('/api/global/:id', async (req, res) => {
  try {
    const data = await fetch(
      getURL(GLOBAL_QUOTE, req.params.id)
    );
    incrementI();
    const json = await data.json();
    res.json({ data: json });
  } catch (er) {
    console.log(er);
  }
});

// const dbb = require('./overview1208.json');

const crossData = async () => {
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
    try {
      const db = client.db('trader');
      const stocks1 = db.collection('index');
      const stocks2 = db.collection('overviews');
      const stocks3 = db.collection('aggregate')
        .initializeOrderedBulkOp();
      let i = 0;
      stocks1.find({})
        .toArray((err, data1) => {
          if (err) console.log(err);
          stocks2.find({})
            .toArray((err2, data2) => {
              if (err2) console.log(err2);
              data2.forEach(async (view) => {
                data1.find((entry) => {
                  if (entry.symbol === view.T) {
                    stocks3.insert({ ...view, name: entry.name });
                    i++;
                    console.log(i);


                    return true;
                  }
                  return false;

                });

                if (i >= 8501)
                  await stocks3.execute();
              });
            });

        });

      console.log('done');


    } catch (er) {
      console.log(er);
    }
    // client.close();
  });
};


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
  // crossData();
  console.log('listening on ', PORT);
});
