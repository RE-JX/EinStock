var synaptic = require('../../node_modules/synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron;
var Layer = synaptic.Layer;
var Network = synaptic.Network;
var Trainer = synaptic.Trainer;
var Architect = synaptic.Architect;

function Perceptron(input, hidden, output) {
  // create the layers
  'use strict';

    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var myPerceptron = new Perceptron(2,3,1);
var myTrainer = new Trainer(myPerceptron);


myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

console.log('guess', '->', 'answer');
console.log(myPerceptron.activate([0,0]), '->', 0);
console.log(myPerceptron.activate([1,0]), '->', 1);
console.log(myPerceptron.activate([0,1]), '->', 1);
console.log(myPerceptron.activate([1,1]), '->', 0);
console.log('ran');

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