var synaptic = require('../../node_modules/synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

//Data and normalization
var normalizer = require('../normalizers').normalizer;
var worker = require('../../worker').yahoo.historical;
// var stockTraining = require('../sampleData/aapl6').data;
var stockTraining = worker('AAPL', '2012-01-01', '2012-01-12').then(function(data) {

    var normalizedData = normalizer(data, ['stock', 'symbol', 'date']);

    // console.log(normalizedData);
    //Setup NN and Trainer
    var myNetwork = new Architect.Perceptron(6,7,1);
    var trainer = new Trainer(myNetwork);

    //Create a training set
    var trainingSet = [
      {
        input: normalizedData[0],
        output: [normalizedData[1][5]]
      },
      {
        input: normalizedData[1],
        output: [normalizedData[2][5]]
      },
      {
        input: normalizedData[2],
        output: [normalizedData[3][5]]
      },
      {
        input: normalizedData[3],
        output: [normalizedData[4][5]]
      },
      {
        input: normalizedData[4],
        output: [normalizedData[5][5]]
      }

    ];



    //train the NN

    trainer.train(trainingSet,{
        rate: .3,
        iterations: 8000,
        error: .005,
        shuffle: false,
        log: 1000,
        cost: Trainer.cost.CROSS_ENTROPY,
        schedule: {
            every: 500, // repeat this task every 500 iterations
            do: function(data) {
                console.log("error", data.error, "iterations", data.iterations, "rate", data.rate);
            }
        }
    });

    console.log('NN: ', myNetwork.activate(normalizedData[0]), normalizedData[1][5]);
    console.log('NN: ', myNetwork.activate(normalizedData[1]), normalizedData[2][5]);
    console.log('NN: ', myNetwork.activate(normalizedData[2]), normalizedData[3][5]);
    console.log('NN: ', myNetwork.activate(normalizedData[3]), normalizedData[4][5]);
    console.log('NN: ', myNetwork.activate(normalizedData[4]), normalizedData[5][5]);
    console.log('NN: ', myNetwork.activate(normalizedData[5]), normalizedData[6][5]);
    console.log('NN: ', myNetwork.activate(normalizedData[6]), normalizedData[7][5]);
});









