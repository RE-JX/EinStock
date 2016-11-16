const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8080;
const database = require('../database');
const evaluation = require('../evaluator/simulate.js');
const dumbAlgo1 = require('../algorithms/dumbAlgo1.js').a1;
const dumbAlgo2 = require('../algorithms/dumbAlgo1.js').a2;

//-----------------middleware---------------
//------------------------------------------
app.use(bodyParser.json());

app.use((req, res, next) => {
  next();
});

app.use(express.static(path.join(__dirname + '/../client')));

app.use('/public', express.static(path.join(__dirname + '/../node_modules')));

//-----------------routes-------------------
//------------------------------------------
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/../client/index.html'));
});


database.db.sync().then(() => {
  console.log('database connected');
  app.listen(process.env.PORT || port);
  console.log('listening on port: ', port);
});

// test evaluation function, to be deleted later
var startDate = '2016-10-07',
    endDate = '2016-10-14';
// var predictions = dumbAlgo1(startDate, endDate, 'ABC');
dumbAlgo2(startDate, endDate, 'AAPL')
  .then(function(result) {
    predictions = result;
    console.log('predictions: ', predictions);
  })
  .then(function() {
    evaluation('d', startDate, endDate, 'AAPL', predictions)
      .then(function(result) {
        console.log('result: ',result);
      });
  });



