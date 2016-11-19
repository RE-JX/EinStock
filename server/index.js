const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
//---------------------------------------- 
const database = require('../database');
const evaluation = require('../evaluator/simulate.js');
const dumbAlgo1 = require('../algorithms/dumbAlgo1.js').a1;
const dumbAlgo2 = require('../algorithms/dumbAlgo1.js').a2;
const PreProcess = require('../mlas/preprocess.js');
const sampleData = require('../mlas/sampleData/aapl6.js').data;
const Neighbors = require('../mlas/MLs/knn.js');
const SupportVector = require('../mlas/MLs/svm.js');
const Forest = require('../mlas/MLs/rf.js');
const Logistic = require('../mlas/MLs/logistic.js')
let predictions;


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

require('./routes.js')(app);
//-----------------database-----------------
//------------------------------------------

database.db.sync().then(() => {
  console.log('database connected');
  app.listen(process.env.PORT || port);
  console.log('listening on port: ', port);
});

// ------- example usage of PreProcess function for creating predictors, to be deleted later ---------
// const predictors = new PreProcess(sampleData);
// predictors.index();
// predictors.movement();
// predictors.ema(2);
// predictors.std(2);
// predictors.maGap(2);
// predictors.BB(2);
// predictors.percentBB(2);
// predictors.lags(2, 2);
// console.log(predictors.data);

// ------- example usage of preProcess + algorithm, to be deleted later --------------
// var logistic = new Logistic('10/03/2016', '11/03/2016', 'AAPL');
//   logistic.preProcess()
//     .then(function() {
//       console.log('training!');
//       logistic.train();
//     })
//     .then(function() {
//       console.log('predicting!');
//       logistic.predict();
//     });
