## Machine Learning Algorithms (MLAs)

### Sample Data

A directory that houses a variety of sample data so API calls are not needed during setup.

### Normalizers

#### index.js

index is a special index that grabs all of the other files in the directory and requires them into index making require statements in other parts of the application easier. Every normalizer must follow the following format to be programmatically added to the index:

```javascipt
var fn = function() {};

var obj = {
  name: 'exampleName',
  func: fn
}

module.exports = obj;

```
To use any of the normalizer functions require them like so: `require('../normalizers').yahooHistoricalNormalizer;`

###### Current normalizers

| Name | Function Name | Argument | Example Input | Optional |
|---|---|---|---|---|
| Yahoo Historical | yahooHistoricalNormalizer | data | [{}, {}, ...] | No |
| | | ignoreKeys | ['str', 'str', ...] | Yes |
| | | max | Object with maxed values | Yes |
| | | min | Object with mined values | Yes |

### Synaptic

Currently working on an index file to reduce future non-DRY code.

xor_ex.js has a working example of how to train a NN to become a XOR gate.
