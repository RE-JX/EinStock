// ------- implement random forest algorithm using https://github.com/jessfraz/random-forest-classifier ---------------

// var forestjs = require('forestjs');
// var rf = new forestjs.RandomForest();
var ss = require('simple-statistics');
var SVM = require('ml-svm');
var KNN = require('ml-knn');
var options = {
  C: 0.01,
  tol: 10e-4,
  maxPasses: 10,
  maxIterations: 10000,
  kernel: 'poly',
  kernelOptions: {
    sigma: 0.5
  }
};
var knn = new KNN();

var moment = require('moment');
var Promise = require('bluebird');
var apiMethods = require('../../worker/index.js');
var PreProcess = require('../preprocess.js');

var predictors = [
  'movement_lag2',
  'ema5_lag2',
  'std5_lag2',
  'gap_ema5_lag2',
  'percentBB5_lag2',
  'ema20_lag2',
  'std20_lag2',
  'gap_ema20_lag2',
  'percentBB20_lag2',
  'movement_lag3',
  'ema5_lag3',
  'std5_lag3',
  'gap_ema5_lag3',
  'percentBB5_lag3',
  'ema20_lag3',
  'std20_lag3',
  'gap_ema20_lag3',
  'percentBB20_lag3',
  'movement_lag4',
  'ema5_lag4',
  'std5_lag4',
  'gap_ema5_lag4',
  'percentBB5_lag4',
  'ema20_lag4',
  'std20_lag4',
  'gap_ema20_lag4',
  'percentBB20_lag4'
];

var RandomForest = function(startDate, endDate, tickerSymbol) {
  this.startDate = moment(new Date(startDate)).format().slice(0, 10);
  this.endDate = moment(new Date(endDate)).format().slice(0, 10);
  this.tickerSymbol = tickerSymbol;
  this.trainingData = [];
  this.testData = [];
  this.trees = [];

  var startTrain = moment(this.startDate).subtract(12, 'months'); //<-- use the previous half year for training
  // var endTrain = moment(startDate).subtract(2, 'days');
  if(startTrain.day() === 0) {
    startTrain = startTrain.add(1, 'days');
  };
  if(startTrain.day() === 6) {
    startTrain = startTrain.subtract(1, 'days');
  };
  this.startTrain = startTrain.format().slice(0, 10);
};

RandomForest.prototype.preProcess = function() {
  var that = this;
  // if(endTrain.day() === 0) {
  //   endTrain = endTrain.subtract(2, 'days');
  // }
  // if(endTrain.day() === 6) {
  //   endTrain = endTrain.subtract(1, 'days');
  // }

  return apiMethods.yahoo.historical(this.tickerSymbol, this.startTrain, this.endDate)
    .then(function(data) {  // <------- preprocess all data, including training data and test data
      var predictors = new PreProcess(data);
      predictors.index();
      predictors.movement();
      predictors.ema(5); //<------ use 5 day and 20 day moving average as predictors
      predictors.std(5);
      predictors.maGap(5);
      predictors.BB(5);
      predictors.percentBB(5);
      predictors.lags(4, 5); //<----- use lags 2 to 4
      predictors.ema(20);
      predictors.std(20);
      predictors.maGap(20);
      predictors.BB(20);
      predictors.percentBB(20);
      predictors.lags(4, 20);
      return predictors.data;
    })
    .then(function(data) {
      that.trainingData = data;
    })
    .then(function() {
      return apiMethods.yahoo.historical(that.tickerSymbol, that.startDate, that.endDate)
    })
    .then(function(data) {
      for(var i = data.length - 1; i >=0; i--) {
        that.testData.push(that.trainingData.pop());
      }
      that.testData.reverse();
      that.trainingData.pop();
    });
};

RandomForest.prototype.predict = function() {
  // console.log('test data: ', this.testData);
  // console.log('trees: ', trees);
  var testFeatures = this.testData.map(item => {
    var features = [];
    predictors.forEach(predictor => {
      features.push(item[predictor]);
    })
    return features;
  });


  for(var i = 0; i < testFeatures[0].length; i++) {
    var vector = testFeatures.map(item => item[i]);
    // console.log('vector:', vector);
    var std = ss.sampleStandardDeviation(vector);
    var mean = ss.mean(vector);
    // console.log('std and mean:', std, mean);
    testFeatures.forEach(item => {
      item[i] = (item[i] - mean) / std;
    })
  };
  console.log('test features: ', testFeatures);

  this.predictions = knn.predict(testFeatures);
  console.log('predictions: ', this.predictions);
};

RandomForest.prototype.train = function(callback) {
  var that = this;
  var trainingOutcomes = this.trainingData.map(item => {
    return item.movement;
  });
  var trainingFeatures = this.trainingData.map(item => {
    var features = [];
    predictors.forEach(predictor => {
      features.push(item[predictor]);
    })
    return features;
  });
  var checkForMissingData = function(array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i] === undefined) return true;
    }
    return false;
  };

  while(checkForMissingData(trainingFeatures[0])) {
    trainingFeatures = trainingFeatures.slice(1);
    trainingOutcomes = trainingOutcomes.slice(1);
  }

  for(var i = 0; i < trainingFeatures[0].length; i++) {
    var vector = trainingFeatures.map(item => item[i]);
    // console.log('vector:', vector);
    var std = ss.sampleStandardDeviation(vector);
    var mean = ss.mean(vector);
    // console.log('std and mean:', std, mean);
    trainingFeatures.forEach(item => {
      item[i] = (item[i] - mean) / std;
    })
  };

  // console.log('training features: ', trainingFeatures);
  // var options = {};
  // options.numTrees = 200;
  // options.maxDepth = 11;
  // options.numTries = 11;
  console.log('trainingFeatures: ', trainingFeatures.length);
  knn.train(trainingFeatures, trainingOutcomes);

};

RandomForest.prototype.trainPromise = Promise.promisify(RandomForest.prototype.train);



module.exports = RandomForest;