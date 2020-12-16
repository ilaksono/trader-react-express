const router = require('express').Router();

module.exports = (MongoClient, url, { updateUserStocks }) => {
  router.post('/', (req, res) => {
    const { symbol, name, user_id } = req.body.data;
    MongoClient.connect(url, { useUnifiedTopology: true },
      async (err, client) => {
        const db = client.db('trader');
        const coll = db.collection('users');
        coll.findOneAndUpdate({id: user_id }, {symbol, name})
        return res.json({});
      });


    return router;
  };