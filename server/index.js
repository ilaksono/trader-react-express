const app = require('express')();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log('listening on ', PORT);
});