var synAlg1 = require('../mlas/synaptic/synapticAlg1.js');
var evaluation = require('./simulate.js');

// synAlg1('AAPL', '2014-01-01', '2014-01-10');

synAlg1('AAPL', '2014-01-01', '2014-01-10')
.then(prediction => evaluation('d', '2014-01-01', '2014-01-10', 'AAPL', prediction ).then(result => result).error(err => console.log(err)))
.then((result) => {console.log(result);})
.error(error => console.log(error));