const express = require('express');
const router = require('./routes/index');
const app = express();
const db = require('./services/db');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

db.isAlive();

app.listen(3000, () => {
  console.log('App running at port 3000');
});
