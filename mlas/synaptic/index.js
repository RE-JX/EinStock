var nna1 = require('./synapticAlg1.js');


// const moment = require('moment');
// const database = require('../database');
// const evaluation = require('../evaluator/simulate.js');
// const PreProcess = require('../mlas/preprocess.js');
// const sampleData = require('../mlas/sampleData/aapl6.js').data;
// const Promise = require('../node_modules/bluebird');
// //----------------algorithms------------------
// var Neighbors = require('../MLs/knn.js');
// var SupportVector = require('../MLs/svm.js');
// var Forest = require('../MLs/rf.js');
// var Logistic = require('../MLs/logistic.js');
var NaiveBayes = require('../MLs/nb.js');




nna1('AAPL','2016-01-01', '2016-01-10')
.then(function(result) { console.log(result); })
.error(err => console.log('err', err));

