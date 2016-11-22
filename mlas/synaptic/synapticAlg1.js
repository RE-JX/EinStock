var synaptic = require('../../node_modules/synaptic'); // this line is not needed in the browser
/* jshint ignore:start */
var Neuron = synaptic.Neuron;
var Layer = synaptic.Layer;
var Network = synaptic.Network;
/* jshint ignore:end */
var Trainer = synaptic.Trainer;
var Architect = synaptic.Architect;
var Promise = require("bluebird");

//Data and normalization
var normalizer = require('../normalizers').normalizer;
var worker = require('../../worker').yahoo.historical;
// var stockTraining = require('../sampleData/aapl6').data;

var NN = (symbol = 'AAPL', from = '2014-01-01', to = '2014-01-10', callback) => {

  var yearBefore = from.split('-');
  yearBefore[0] = String(Number(yearBefore[0]) - 1);
  yearBefore = yearBefore.join('-');

  var duration = Math.round((new Date(to) - new Date(from))/(1000 * 60 * 60 * 24));

  // console.log(duration, from, to, yearBefore);



  worker(symbol, yearBefore, to).then(function(data) {
    var normalizedData = normalizer(data, ['stock', 'symbol', 'date']);

    // console.log(normalizedData);
    //Setup NN and Trainer
    // var myNetwork = new Architect.Perceptron(6,7,1);
    var myNetwork = new Architect.Perceptron(normalizedData[0].length,normalizedData[0].length * 1, 1);
    var trainer = new Trainer(myNetwork);

    //Create a training set
    var trainingSet = normalizedData.reduce((arr, datum, i, a) => {
      // console.log(datum);
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
      iterations: 100000,
      error: 0.0005,
      shuffle: false,
      // log: 100,
      cost: Trainer.cost.CROSS_ENTROPY,
      schedule: {
        every: 1000, // repeat this task every 500 iterations
        do: function(data) {
          // console.log('error', data.error, 'iterations', data.iterations, 'rate', data.rate);
          // if (data.error > 0.5) {
          //   data.rate = 0.5;
          // } else if (data.error > 0.3) {
          //   data.rate = 0.3;
          // } else {
          //   data.rate = 0.1;
          // }
console.log('Percent complete: ', Math.round((data.iterations/100000) * 100), '%');
        }
      }
    });


    // normalizedData.forEach((data, i, arr) => {
    //   if (i !== normalizedData.length - 1) {
    //     var prediction = Math.round(myNetwork.activate(data)); // 1 means an increase in price
    //     var actual = (arr[i + 1][5] - arr[i][5]) > 0;  // true means an increase in price
    //     correct += prediction === +actual ? 1 : 0;
    //     entries++;
    //   if (i % 5 === 0) {
    //     // console.log('prediction:', prediction, 'actual:', actual);
    //     console.log(correct/normalizedData.length * 100,'%');
    //     }
    //   }
    // });
  var algPredictions = [];

  for (var i = normalizedData.length - 1; i >= normalizedData.length - duration; i--) {

    algPredictions.push(Math.round(myNetwork.activate(normalizedData[i])));
  }
// console.log(algPredictions);
  callback(algPredictions);
    // console.log('NN got:', correct/normalizedData.length * 100, '%', correct, normalizedData.length);
  });
};

// NN();


module.exports = Promise.promisify(NN);
