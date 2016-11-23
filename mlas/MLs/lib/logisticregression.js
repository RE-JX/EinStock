var linearAlgebra = require('linear-algebra')();     // initialise linear algebra library
var Vector = linearAlgebra.Vector;
var Matrix = linearAlgebra.Matrix;

var LogisticRegression = function(options) {
  this.epochs = options.epochs; // number of iterations
  this.lr = options.lr; // learning rate
  this.trainingData = options.trainingData;
  this.cost = [];
  this.trainingData.forEach(item => { //<---- add constant as x0
    item.unshift(1);
  });
  this.theta = Array(this.trainingData[0].length).fill(0); //<---- starting values for theta
  this.theta = new Matrix(this.theta.map(item => [item]));

  this.trainingData = new Matrix(this.trainingData);
  this.trainingLabel = options.trainingLabel;
  this.sampleSize = this.trainingLabel.length;
  this.trainingLabel = new Matrix(this.trainingLabel.map(item => [item]));
};

LogisticRegression.prototype.train = function() {
  var hx = this.trainingData.dot(this.theta).sigmoid();
  var ones = new Matrix(Array(this.sampleSize).fill(1).map(item => [item]));
  var cost = 1 / this.sampleSize * ((this.trainingLabel.mulEach(-1).trans().dot(hx.log())).minus((ones.minus(this.trainingLabel)).trans().dot((ones.minus(hx)).log())));
  var gradient;
  for(var i = 0; i < this.epochs; i++) {
    gradient = this.trainingData.trans().dot(hx.minus(this.trainingLabel)).mulEach(this.lr / this.sampleSize);
    // console.log('gradient: ', gradient);
    this.theta = this.theta.minus(gradient);
    hx = this.trainingData.dot(this.theta).sigmoid();
    cost = 1 / this.sampleSize * ((this.trainingLabel.mulEach(-1).trans().dot(hx.log()).data) - ((ones.minus(this.trainingLabel)).trans().dot((ones.minus(hx)).log()).data));
    this.cost.push(cost);
    // console.log('cost: ', cost);
  }
  console.log('last cost function: ', this.cost[this.cost.length - 1]);
};

LogisticRegression.prototype.predict = function(testFeatures) {
  testFeatures.forEach(item => { //<---- add constant as x0
    item.unshift(1);
  });
  var features = new Matrix(testFeatures);
  var predictions = features.dot(this.theta).sigmoid();
  return predictions.data.map(item => item[0]);
};

module.exports = LogisticRegression;