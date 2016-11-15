var moment = require('moment');

var a1 = function(startDate, endDate, tickerSymbol) {
  var start = moment(startDate, 'YYYY-MM-DD'),
      end = moment(endDate, 'YYYY-MM-DD'),
      output;
  var difference = end.diff(start, 'days');
  var dayCount = Math.round(difference / 7 * 5) + 1; // get the number of weekdays plus starting day
  for(var i = 0; i < dayCount; i++) {
    output[i] = Math.round(Math.random());
  }
  return output;
};

var a2 = function(startDate, endDate, tickerSymbol) {

};

var dumbAlgos = {a1, a2};
module.exports = dumbAlgos;