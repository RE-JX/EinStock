const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
const nofavicon = require("no-favicon");
// //----------------------------------------
// const database = require('../database');
const PreProcess = require('../mlas/preprocess.js');
const evaluation = require('../evaluator/simulate.js');
// const NaiveBayes = require('../mlas/MLs/nb.js');
const Forest = require('../mlas/MLs/rf.js');
const Neighbors = require('../mlas/MLs/knn.js');

// //-----------------middleware---------------
// //------------------------------------------
app.use(bodyParser.json());
app.use(nofavicon());

app.use((req, res, next) => {
  next();
});

app.use(express.static(path.join(__dirname , '/../client')));
 console.log(path.join(__dirname , '/../client'));
app.use('/public', express.static(path.join(__dirname , '/../node_modules')));

// //-----------------routes-------------------
// //------------------------------------------
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname , '/../client/index.html'));
});

require('./routes.js')(app);

// //-----------------database-----------------
// //------------------------------------------

// database.db.sync().then(() => {
//   console.log('database connected');
//   app.listen(process.env.PORT || port);
//   console.log('listening on port: ', port);
// });

app.listen(process.env.PORT || port);
// --------- testing algorithm, to be deleted later -----------------
// var algorithmInstance = new NaiveBayes('08/31/2016', '11/18/2016', 'SPY');
// algorithmInstance.preProcess()
//   .then(function() {
//     algorithmInstance.train();
//   })
//   .then(function() {
//     algorithmInstance.predict();
//   })
//   .then(function() {
//     return evaluation('d', '08/31/2016', '11/18/2016', 'SPY', algorithmInstance.predictions)
//   })
//   .then(function(data) {
//     console.log(data);
//   });


// NNA1('AAPL','2016-01-01', '2016-01-10')
//   .then(function(result) {
//     console.log('predictions: ', result);
//     return evaluation('d', '2016-01-01', '2016-01-10', 'AAPL', result);
//   })
//   .then((result) => {
//     console.log(result);
//   });

// var algorithmInstance = new Forest('11/07/2016', '11/28/2016', 'AAPL');
// algorithmInstance.preProcess()
//   .then(function() {
//     algorithmInstance.train();
//   })
//   .then(function() {
//     return algorithmInstance.predictTomorrow();
//   })
//   // .then(function() {
//   //   return algorithmInstance.predict();
//   // })
//   // .then(function() {
//   //   return evaluation('d', '11/07/2016', '11/28/2016', 'AAPL', algorithmInstance.predictions);
//   // })
//   // .then(function(data) {
//   //   console.log(data);
//   // })
//   .then(function(data){
//     console.log('prediction for tomorrow: ',data);
//   })
