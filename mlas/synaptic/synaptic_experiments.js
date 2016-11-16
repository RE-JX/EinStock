var synaptic = require('../../node_modules/synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

//Data and normalization
var stockTraining = require('../sampleData/aapl6').data;
var normalizer = require('../normalizers').normalizer;
var normalizedData = normalizer(stockTraining, ['stock', 'symbol', 'date']);


//Setup NN and Trainer
var myNetwork = new Architect.Perceptron(6,6,1);
var trainer = new Trainer(myNetwork);

//Create a training set
var trainingSet = [
  {
    input: normalizedData[0],
    output: normalizedData[1].adjClose
  },
  {
    input: normalizedData[1],
    output: normalizedData[2].adjClose
  },
  {
    input: normalizedData[2],
    output: normalizedData[3].adjClose
  },
  {
    input: normalizedData[3],
    output: normalizedData[4].adjClose
  },
  {
    input: normalizedData[4],
    output: normalizedData[5].adjClose
  }

]

//train the NN
trainer.train(trainingSet,{
    rate: .1,
    iterations: 4000,
    error: .005,
    shuffle: false,
    log: 1000,
    cost: Trainer.cost.CROSS_ENTROPY,
    schedule: {
    every: 500, // repeat this task every 500 iterations
    do: function(data) {
        // custom log
        console.log("error", data.error, "iterations", data.iterations, "rate", data.rate);
        // if (someCondition)
        //     return true; // abort/stop training
    }
}
});









