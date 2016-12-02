const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
const nofavicon = require("no-favicon");
// //----------------------------------------
const database = require('../database');
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

database.db.sync().then(() => {
  console.log('database connected');
  app.listen(process.env.PORT || port);
  console.log('listening on port: ', port);
});

// app.listen(process.env.PORT || port);
// app.listen(process.env.PORT);


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

