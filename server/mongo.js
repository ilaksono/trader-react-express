const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const index = require('./index.json');



const primeData = () => {
  MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
    let i = 0;

    try {
      const data = req.body.data;
      const db = client.db('trader');
      const stocks = db.collection('global').initializeOrderedBulkOp();
      const A = setInterval(() => {

        if (i >= 500 || i >= index.length) {
          clearTimeout(A);
          return;
        }
      }, 1000)
      const prom = data.map(each => {
        return stocks.insert({ ...each });
      });
      await stocks.execute();
      console.log('done');
    } catch (er) {
      console.log(er);
    }

    res.json('ok');
    client.close();


    
  })
}



module.exports = {
  primeData
}