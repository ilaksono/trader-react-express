const router = require('express').Router();
const cors = require('cors');
router.use(cors());

module.exports = (MongoClient, url) => {

  router.post('/', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, 
      async (err, client) => {
        if(err) console.log(err);
        try {
          const db = client.db('users')
          
        }catch(er) {
          console.log(er);
        }

    
    });

  });


  return router;
};