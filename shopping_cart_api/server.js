const express = require('express');
const router = require('./routes/index');
const app = express();
const db = require('./services/db');

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('I dey here');
});
db.isAlive();

app.listen(3000, () => {
  console.log('App running at port 3000');
});
