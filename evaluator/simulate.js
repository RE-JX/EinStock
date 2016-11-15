var ss = require('simple-statistics');
var moment = require('moment');
var Promise = require("bluebird");
var apiMethods = require('../rest/back/index.js');

var simulation =function(prices, predictions, totalAssetValues, cashPosition, sharesOwned, callback) {
  if(predictions[0] === 1) { // long
    sharesOwned[0] = cashPosition / prices[0];
    cashPosition[0] = 0;
  }
  if(predictions[0] === 0) { // short
    sharesOwned[0] = - cashPosition / prices[0];
    cashPosition[0] = cashPosition[0] - sharesOwned[0] * prices[0];
  }

  for(var i = 1; i < predictions.length; i++) {
    if(totalAssetValues[i - 1] <= 0) {  // Basic risk control: if your asset value is negative, you won't be allowed to play for the remaining period
      sharesOwned[i] = sharesOwned[i - 1];
      cashPosition[i] = cashPosition[i - 1];
    } else {
      if(predictions[i] === predictions[i - 1]) { // if prediction for next day is same as previous day, stay put
        sharesOwned[i] = sharesOwned[i - 1];
        cashPosition[i] = cashPosition[i - 1];
      } else if(predictions[i] === 1 && predictions[i - 1] === 0) { // if prediction for next day is bearish
          cashPosition[i] = cashPosition[i - 1] + sharesOwned[i - 1] * prices[i]; // first sell all shares you own
          sharesOwned[i] = 0;
          if(cashPosition[i] > 0) { // then borrow shares and short it
            sharesOwned[i] = - cashPosition[i] / prices[i];
            cashPosition[i] = cashPosition[i] + sharesOwned[i] * prices[i];
          }
      } else if(predictions[i] === 0 && predictions[i - 1] === 1) { // if prediction for next day is bullish
          cashPosition[i] = cashPosition[i - 1] - Math.abs(sharesOwned[i - 1]) * prices[i];
          sharesOwned[i] = 0; // first wrap up the previous short position
          if(cashPosition[i] > 0) { // then buy more shares
            sharesOwned[i] = cashPosition[i] / prices[i];
            cashPosition[i] = 0;
          }
      }
    }

    totalAssetValues[i] = cashPosition[i] + sharesOwned[i] * prices[i];
  }
  callback();
};

var simulationPromised = Promise.promisify(simulation);

// inputs to the simulation function:
// 1. frequency (e.g. d, h, m)
// 2. start date (and/or time)
// 3. end date
// 4. ticker symbol for underlining asset
// 5. array of predicted price movement for the next interval over test period
//       element value: 1 - up
//                      0 - down
      // i.e. the array looks like this: [1, 0, 1, 1, 1, 0, 0]

// Output of the simulation function:
// An object that looks something like this:
// {
//   frequency: 'd',
//   startDate: '11/14/2016',
//   endDate: '11/18/2016',
//   tickerSymbol: 'IBM',
//   predictions: [1, 0, 1, 1, 1], <== predicted price movements
//   actualMove: [0, 0, 1, 1, 0],  <== actual realized price movements
//   inclusionError: 40, <== percentage of instances where price goes up, but prediction was down
//   exclusionError: 30, <== percentage of instances where price goes down, but prediction was up
//   assetValues: [100, 110, 95, 105, 102], <== evolution of total portfolio values over test period, starting from $100 cash
//   returns: [0, 10, -13, 20, -1], <== percentage change in total portfolio values
//   avgReturn: 3, <== average return across intervals
//   cummuReturn: 2, <== cummulative return over test  period
//   returnStd: 5, <== standard deviation of returns
//   sharpeRatio: 0.4, <== annualized Sharpe ratio, a.k.a risk-adjusted return
//   benchmarkReturn: 1 <== the cummulative return for S&P500 over test period
// }

var evaluation = function(frequency, startDate, endDate, tickerSymbol, predictedMoves) {
  var pricesSpy,
      pricesSelf,
      onedayBefore,
      increased,
      commission = 5,  // commission paid to broker per trade
      actualMoves = [],
      successRate = 0,
      inclusionError = 0,
      exclusionError = 0,
      avgReturn,
      cummuReturn,
      returnStd,
      sharpeRatio,
      benchmarkReturnSelf,
      benchmarkReturnMarket,
      totalAssetValues = [1000], // starting with $1000 cash on the day before startDate
      cashPosition = [1000],
      stockSharesOwned = [],
      returns = [0];
  start = new Date(startDate);
  end = new Date(endDate);

  if(start.getDay() === 1) {
    onedayBefore = moment(startDate).subtract(3, 'days').toDate();
  } else {
    onedayBefore = moment(startDate).subtract(1, 'days').toDate();
  }

  // fetch prices for S&P 500 index
  apiMethods.yahoo.historical('SPY', onedayBefore, end)
    .then(function(result) {
        pricesSpy = result.map(data => data.adjClose);
        benchmarkReturnMarket = (pricesSpy[pricesSpy.length - 1] - pricesSpy[0]) / pricesSpy[0] * 100;
    });

  // fetch prices for underlining stock
  return apiMethods.yahoo.historical(tickerSymbol, onedayBefore, end)
    .then(function(result) {
        pricesSelf = result.map(data => data.adjClose);
        benchmarkReturnSelf = (pricesSelf[pricesSelf.length - 1] - pricesSelf[0]) / pricesSelf[0] * 100;
      // ------------ calculate actual price moves by day ------------
        for(var i = 1; i < pricesSelf.length; i++) {
          increased = (pricesSelf[i]/pricesSelf[i-1]-1) > 0 ? 1 : 0;
          actualMoves.push(increased);
        }
      // -------- calculate rates of prediction success and error -------------
        predictedMoves.forEach((move, i) => {
          if(move === 1 && actualMoves[i + 1] === 0) {
            inclusionError++;
          } else if(move === 0 && actualMoves[i + 1] === 1) {
            exclusionError++;
          } else {
            successRate++;
          }
        });
        successRate = successRate / predictedMoves.length;
        inclusionError = inclusionError / predictedMoves.length;
        exclusionError = exclusionError / predictedMoves.length;
    })
    .then(function() {
      // -------- simulate trades according to predictedMoves and calculate portfolio values ---------
        return simulationPromised(pricesSelf, predictedMoves, totalAssetValues, cashPosition, stockSharesOwned)
        .then(function() {
          // ------- calculate other ratios ----------
            for(var j = 1; j < totalAssetValues.length; j++) {
              returns[j] = (totalAssetValues[j] - totalAssetValues[j - 1]) / totalAssetValues[j - 1] * 100;
            }
            avgReturn = ss.mean(returns.slice(1));
            cummuReturn = (totalAssetValues[totalAssetValues.length - 1] - totalAssetValues[0]) / totalAssetValues[0] * 100;
            returnStd = ss.sampleStandardDeviation(returns.slice(1));
            sharpeRatio = avgReturn / returnStd * Math.sqrt(252);
          // -------- return results -------------
            return {
              frequency, startDate, endDate, tickerSymbol, successRate, inclusionError, exclusionError, avgReturn, cummuReturn, returnStd, sharpeRatio, benchmarkReturnSelf, benchmarkReturnMarket, predictedMoves, actualMoves, returns,
              predictedMoves, totalAssetValues, cashPosition, stockSharesOwned
            };
        });
    });
};

module.exports = evaluation;  // <-- this is a promise
