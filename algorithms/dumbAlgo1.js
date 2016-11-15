var moment = require('moment');
var apiMethods = require('../rest/back/index.js');

var a1 = function(startDate, endDate, tickerSymbol) {
  var start = moment(startDate, 'YYYY-MM-DD'),
      end = moment(endDate, 'YYYY-MM-DD'),
      output = [],
      dayCount;
  var difference = end.diff(start, 'days');
  if(difference < 5) {
    dayCount = difference + 1;
  } else {
    dayCount = Math.round(difference / 7 * 5) + 1; // get the number of weekdays plus starting day
  }

  for(var i = 0; i < dayCount; i++) {
    output[i] = Math.round(Math.random());
  }
  return output;
};

var a2 = function(startDate, endDate, tickerSymbol) {
  var start = new Date(startDate);
  var end = new Date(endDate);
  var twoDaysBefore, actualPrices = [], output = [];
  if(start.getDay() === 1) {
    twoDaysBefore = moment(startDate).subtract(4, 'days').toDate();
  } else {
    twoDaysBefore = moment(startDate).subtract(2, 'days').toDate();
  }
  return apiMethods.yahoo.historical(tickerSymbol, twoDaysBefore, endDate)
    .then(result => {
      actualPrices = result.map(data => data.adjClose);
     })
    .then(() => {
      for(let i = 1; i < actualPrices.length - 2; i++) {
        output[i - 1] = (actualPrices[i] - actualPrices[i - 1]) >= 0 ? 1 : 0;
      }
      return output;
    })
};

var dumbAlgos = {a1, a2};
module.exports = dumbAlgos;