var moment = require('moment');
var apiMethods = require('../worker/index.js');

// ------------- Dumb algorithm #1: prediction is a random number -------------
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

// --- Dumb algorithm #2: predicting tomorrow's price movement will be the same as yesterday's -----
var a2 = function(startDate, endDate, tickerSymbol) {
  var start = new Date(startDate);
  var end = new Date(endDate);
  var twoDaysBefore, actualPrices = [], predictions = [];
  console.log('start.getDay: ',startDate, moment(startDate).day());
  if(moment(startDate).day() === 1) {
    twoDaysBefore = moment(startDate).subtract(4, 'days').toDate();
  } else {
    twoDaysBefore = moment(startDate).subtract(2, 'days').toDate();
  }
  return apiMethods.yahoo.historical(tickerSymbol, twoDaysBefore, endDate)
    .then(result => {
      console.log('twoDaysBefore: ', twoDaysBefore);
      actualPrices = result.map(data => data.adjClose);
     })
    .then(() => {
      for(let i = 0; i < actualPrices.length - 2; i++) {
        predictions[i] = (actualPrices[i + 1] - actualPrices[i]) >= 0 ? 1 : 0;
      }
      return predictions;
    })
};

var dumbAlgos = {a1, a2};
module.exports = dumbAlgos;