var synaptic = require('../../node_modules/synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var stockTraining = require('../sampleData/aapl6').data;
var yahooHistoricalNormalizer = require('../normalizers').yahooHistoricalNormalizer;





console.log(yahooHistoricalNormalizer(stockTraining, ['stock', 'symbol', 'date']));

var myNetwork = new Architect.Perceptron(6,6,1);
// var myNetwork = new Architect.Perceptron(2, 2, 1)
// var trainer = new Trainer(myNetwork)

// var trainingSet = [
//   {
//     input: [0,0],
//     output: [0]
//   },
//   {
//     input: [0,1],
//     output: [1]
//   },
//   {
//     input: [1,0],
//     output: [1]
//   },
//   {
//     input: [1,1],
//     output: [0]
//   },
// ]

// // trainer.train(trainingSet);

// trainer.train(trainingSet,{
//     rate: .1,
//     iterations: 40000,
//     error: .000005,
//     shuffle: true,
//     log: 1000,
//     cost: Trainer.cost.CROSS_ENTROPY,
//     schedule: {
//     every: 500, // repeat this task every 500 iterations
//     do: function(data) {
//         // custom log
//         console.log("error", data.error, "iterations", data.iterations, "rate", data.rate);
//         // if (someCondition)
//         //     return true; // abort/stop training
//     }
// }
// });







