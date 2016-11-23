var synaptic = require('../../node_modules/synaptic');
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

var NN = function (symbol, from, to, callback) {
  'use strict';

  var yearBefore = from.split('-');
  yearBefore[0] = String(Number(yearBefore[0]) - 1);
  yearBefore = yearBefore.join('-');

  var duration = Math.round((new Date(to) - new Date(from))/(1000 * 60 * 60 * 24));

  // console.log(duration, from, to, yearBefore);

console.log(symbol, from, to);

  worker(symbol, yearBefore, to).then(function(data) {
    var normalizedData = normalizer(data, ['stock', 'symbol', 'date']);

    //Setup NN and Trainer
    var myNetwork = new Architect.Perceptron(normalizedData[0].length,normalizedData[0].length * 1, 1);
    var trainer = new Trainer(myNetwork);

    //Create a training set
    var trainingSet = normalizedData.reduce((arr, datum, i, a) => {
      if (normalizedData.length - 1 !== i) {
        var temp = {input: datum};
        temp.output = [+ (a[i + 1][5] > datum[5])];
        arr.push(temp);
      }
      return arr;
    }, []);

    //train the NN
    trainer.train(trainingSet, {
      rate: 0.01,
      // iterations: 100000,
      iterations: 10000,
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

  var algPredictions = [];

  for (var i = normalizedData.length - 1; i >= normalizedData.length - duration; i--) {

    algPredictions.push(Math.round(myNetwork.activate(normalizedData[i])));
  }
  callback(null, algPredictions);
  });
};

// NN('AAPL', '2014-01-01', '2014-01-10', a => console.log(a));


module.exports = Promise.promisify(NN);
