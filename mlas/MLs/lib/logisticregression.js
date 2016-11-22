var linearAlgebra = require('linear-algebra')();     // initialise linear algebra library
var Vector = linearAlgebra.Vector;
var Matrix = linearAlgebra.Matrix;

var LogisticRegression = function(options) {
  this.trainingData = options.trainingData;
  this.trainingData.forEach(item => { //<---- add constant as x0
    item.unshift(1);
  });
  this.trainingLabel = options.trainingLabel;
  this.theta = Array(this.trainingData[0].length).fill(0); //<---- starting values for theta
};

LogisticRegression.prototype.train = function() {

}