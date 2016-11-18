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
To use any of the normalizer functions require them like so: `require('../normalizers').normalizer;`

###### Current normalizers

The General Normalizer is written in such a way that it is resuable for any data following the array of objects format. So long as the `ignoreKeys` property is correctly set, the General Normalizer should not have any trouble normalizing the data.

| Name | Function Name | Argument | Example Input | Optional |
|---|---|---|---|---|
| General Normalizer | normalizer | data | [{}, {}, ...] | No |
| | | ignoreKeys | ['str', 'str', ...] | Yes |
| | | max | Object with maxed values | Yes |
| | | min | Object with mined values | Yes |

### Synaptic

xor_ex.js has a working example of how to train a NN to become a XOR gate.

synapticAlg1 (synaptic algortithum 1) takes in a symbol, start date, end date and