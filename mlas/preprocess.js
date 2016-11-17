// -------- produce EMAs, standard deviations, Bollinger Bands, and other indicators to be used as predictors in ML models ---------
var gauss = require('gauss');

var PreProcess = function(dataInput) { // trainingData is array of objects from Yahoo finance
  this.data = dataInput.slice(0);
};

PreProcess.prototype.index = function() { //<-- index for each object
  this.data.forEach((item, i) => {
    item.index = i;
  })
};

PreProcess.prototype.movement = function() { // <--- price movement: 1 -- up, 0 -- down
  var prices = this.data.map(item => item.adjClose);
  for(var i = 1; i < prices.length; i++) {
    this.data[i]['movement'] = prices[i] - prices[i - 1] >= 0 ? 1 : 0;
  }
}

PreProcess.prototype.ema = function(w) { // <-- produce EMA-w, w === 5, 20, 50
  var prices = this.data.map(item => item.adjClose).toVector();
  var maPrices = prices.ema(w).toArray();
  var i = this.data.length - 1,
      j = maPrices.length - 1;
  while(i >= 0) {
    if(j >= 0) {
      this.data[i][`ema${w}`] = maPrices[j];
    } else {
      this.data[i][`ema${w}`] = undefined;
    }
    i--;
    j--;
  }
};

PreProcess.prototype.std = function(w) {  // <-- produce w period standard deviation of adjClose prices
  var prices = this.data.map(item => item.adjClose).toVector();
  var std;
  var subPrices;
  for(var i = w - 1; i < prices.length; i++) {
    subPrices = prices.slice(i - w + 1, i + 1).toVector();
    this.data[i][`std${w}`] = subPrices.stdev();
  }
};

PreProcess.prototype.maGap = function(w) { // <-- produce adjClose price as percent of EMA-w
  this.data.forEach(item => {
    if(item[`ema${w}`]) {
      item[`gap_ema${w}`] = item['adjClose'] / item[`ema${w}`];
    } else {
      item[`gap_ema${w}`] = undefined;
    }
  })
};

PreProcess.prototype.BB = function(w) { // <-- produce Bollinger bands (https://en.wikipedia.org/wiki/Bollinger_Bands)
  // assuming this.data[i].ema and this.data[i].std for w periods have already been created
  this.data.forEach(item => {
    if(item[`ema${w}`] && item[`std${w}`]) {
      item[`lowerBB${w}`] = item[`ema${w}`] - 2 * item[`std${w}`];
      item[`upperBB${w}`] = item[`ema${w}`] + 2 * item[`std${w}`];
    }
  });
};

PreProcess.prototype.percentBB = function(w) { // <-- percentBB = (price − lowerBB) / (upperBB − lowerBB)
  //assuming Bolinger bands for w have already been created
  this.data.forEach(item => {
    if(item[`lowerBB${w}`] && item[`upperBB${w}`]) {
      item[`percentBB${w}`] = (item['adjClose'] - item[`lowerBB${w}`]) / (item[`upperBB${w}`] - item[`lowerBB${w}`]);
    }
  })
};

PreProcess.prototype.lags = function(lagCount, w) {  // <-- lagCount needs to be >= 2
  if(lagCount < 2) {
    console.log('lag must be >= 2');
    return;
  }
  for(var i = lagCount; i < this.data.length; i++) {
    for(var j = 2; j <= lagCount; j++) {
      this.data[i][`ema${w}_lag${j}`] = this.data[i - j][`ema${w}`];
      this.data[i][`std${w}_lag${j}`] = this.data[i - j][`std${w}`];
      this.data[i][`gap_ema${w}_lag${j}`] = this.data[i - j][`gap_ema${w}`];
      this.data[i][`lowerBB${w}_lag${j}`] = this.data[i - j][`lowerBB${w}`];
      this.data[i][`upperBB${w}_lag${j}`] = this.data[i - j][`upperBB${w}`];
      this.data[i][`percentBB${w}_lag${j}`] = this.data[i - j][`percentBB${w}`];
    }
  }
}

module.exports = PreProcess;