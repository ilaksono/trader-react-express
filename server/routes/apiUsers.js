const router = require('express').Router();

module.exports = (MongoClient, url, { validateUserLog, validateUserReg }) => {

  router.post('/login', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true },
      (err, client) => {
        if (err) console.log(err);
        const db = client.db('trader');
        const users = db.collection('users');
        users.find({})
          .toArray((er, result) => {
            if (er) console.log(er);
            const val = validateUserLog(result, req.body.email, req.body.password);
            if (val)
              return res.json({ data: val });
            return res.status(400).json({ data: null, err: 'invalid login attempt' });
          });
      });
  });

  router.post('/register', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true },
      (err, client) => {
        if (err) console.log(err);
        const db = client.db('trader');
        const users = db.collection('users');
        const usersIns = users.initializeOrderedBulkOp();
        users.find({})
          .toArray(async (er, result) => {
            try {
              if (er) console.log(er);
              const val = validateUserReg(result, req.body.email, req.body.password, req.body.username);
              if (!val)
                return res.json({
                  data:
                    { err: 'email or pass already in use' }
                });
              usersIns.insert(val);
              await usersIns.execute();
              return res.json({ data: val });
            } catch (er) {
              console.log(er);
              return er;
            }
          });
      });
  });

  router.get('/:id', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true },
      (err, client) => {
        const db = client.db('trader');
        const coll = db.collection('users');
        coll.findOne({ username: req.params.id })
          .toArray((err, results) => {
            res.json({ data: results });
          });
      });
  });

  return router;
};