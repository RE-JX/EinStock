var synaptic = require('../../node_modules/synaptic'); // this line is not needed in the browser
/* jshint ignore:start */
var Neuron = synaptic.Neuron;
var Layer = synaptic.Layer;
var Network = synaptic.Network;
/* jshint ignore:end */
var Trainer = synaptic.Trainer;
var Architect = synaptic.Architect;
var Promise = require('bluebird');

//Data and normalization
var normalizer = require('../normalizers').normalizer;
var worker = require('../../worker').yahoo.historical;






var NN = function (symbol, from, to) {
  // 'use strict';

  this.symbol = symbol;
  this.from = from;
  this.to = to;
  this.trainer;
  this.trainingSet;
  this.prediction = [];

  this.yearBefore = this.from.split('-');
  this.yearBefore[0] = String(Number(this.yearBefore[0]) - 1);
  this.yearBefore = this.yearBefore.join('-');

  console.log('from, to', from, to);
  console.log(arguments);

  this.duration = Math.round((new Date(to) - new Date(from))/(1000 * 60 * 60 * 24));


};







NN.prototype.preProcess = function () {
  'use strict';

  const obj = this;

  return worker(this.symbol, this.yearBefore, this.to)
  .then(function(data) {
    return normalizer(data, ['stock', 'symbol', 'date']);
  })
  .then(function (normalizedData) {

    return normalizedData.reduce((arr, datum, i, a) => {

      if (normalizedData.length - 1 !== i) {
        var temp = {input: datum};
        temp.output = [+ (a[i + 1][5] > datum[5])];
        arr.push(temp);
      }
      return arr;
    }, []);

  })
  .then(function (normalizedData) {

    var myNetwork = new Architect.Perceptron(normalizedData[0].length, normalizedData[0].length * 1, 1);
    obj.trainingSet = normalizedData;
    return new Trainer(myNetwork);
  })
  .then(function (trainer) {
    obj.trainer = trainer;
  })
  // .then(function () {
  //   console.log(obj.symbol,
  //   obj.from,
  //   obj.to,
  //   obj.trainer,
  //   obj.trainingSet);
  // })
  .error(function (err) {
    console.log(err);
    obj.trainer = null;
  });

};







NN.prototype.train = function () {

    //train the NN
    this.trainer.train(this.trainingSet, {
      rate: 0.01,
      iterations: 100000,
      error: 0.0005,
      shuffle: false,
      // log: 100,
      cost: Trainer.cost.CROSS_ENTROPY,
      schedule: {
        every: 1000, // repeat this task every 500 iterations
        do: function(data) {
          console.log('Percent complete: ', Math.round((data.iterations/100000) * 100), '%');
        }
      }
    });
};





NN.prototype.predict = function () {
  'use strict';
console.log('ran');
console.log('this.trainingSet',this.trainingSet.length);
console.log('this.duration',this.duration);
console.log('this.prediction', this.prediction);
  for (var i = this.trainingSet.length - 1; i >= this.trainingSet.length - this.duration; i--) {
    this.prediction.push(Math.round(this.myNetwork.activate(this.trainingSet[i])));
    console.log('happened');
  }
};




var a = new NN('AAPL', '2014-01-01', '2014-01-10');
a.preProcess()
.then(function () {
  a.train();
})
.then(function () {
  a.predict();
})
.then(function () {
  console.log(a.prediction);
});


module.exports = NN;
