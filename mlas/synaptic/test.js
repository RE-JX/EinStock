var synaptic = require('../../node_modules/synaptic'); // this line is not needed in the browser

var Neuron = synaptic.Neuron;
var Layer = synaptic.Layer;
var Network = synaptic.Network;

var Trainer = synaptic.Trainer;
var Architect = synaptic.Architect;

var myNetwork = new Architect.Perceptron(1, 1, 1);
var trainer = new Trainer(myNetwork);



var trainingSet = [
  {input: [0.1], output: [0]},
  {input: [0.2], output: [0]},
  {input: [0.3], output: [0]},
  {input: [0.4], output: [0]},
  {input: [0.5], output: [1]},
  {input: [0.6], output: [1]},
  {input: [0.7], output: [1]},
  {input: [0.8], output: [1]},
  {input: [0.9], output: [1]},
  {input: [1], output: [1]},
  {input: [0], output: [0]}];



// trainer.train(trainingSet);
    trainer.train(trainingSet, {
      rate: 0.1,
      iterations: 500000,
      error: 0.0001,
      shuffle: true,
      log: 10000,
      cost: Trainer.cost.CROSS_ENTROPY,
      schedule: {
        every: 2000, // repeat this task every 500 iterations
        do: function(data) {
        }
      }
    });

console.log('0: ', myNetwork.activate([0]));
console.log('.1: ', myNetwork.activate([0.01]));
console.log('.2: ', myNetwork.activate([0.02]));
console.log('.3: ', myNetwork.activate([0.03]));
console.log('.4: ', myNetwork.activate([0.04]));
console.log('.5: ', myNetwork.activate([0.05]));
console.log('.6: ', myNetwork.activate([0.06]));
console.log('.7: ', myNetwork.activate([0.07]));
console.log('.8: ', myNetwork.activate([0.08]));
console.log('.9: ', myNetwork.activate([0.09]));
console.log('1: ', myNetwork.activate([1]));

