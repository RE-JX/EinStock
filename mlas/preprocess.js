// -------- produce EMAs, Bollinger Bands, and other indicators to be used as predictors in ML models ---------

var PreProcess = function(trainingData) {
  this.data = trainingData.slice(0);
};

PreProcess.prototype.index = function() {

};

PreProcess.prototype.ema = function(w) { // <-- produce EMA-w, w === 5, 20, 50

};

PreProcess.prototype.maGap = function(w) { // <-- produce percentage gap btw adjClose price and EMA-w

};

PreProcess.prototype.BB = function(w, k) {

};

PreProcess.prototype.percentBB = function(w, k) {

};

PreProcess.prototype.std = function(w) {

}