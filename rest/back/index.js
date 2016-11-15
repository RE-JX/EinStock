//connect to Various APIs server up data to ML services
var yahoo = require('../../node_modules/yahoo-finance');
var Promise    = require("bluebird");

apiMethods = {};

apiMethods.yahoo = {};
// apiMethods.yahoo.historical = function (sym = 'AAPL', frm = '2012-01-01', to = '2012-12-31', ) {
apiMethods.yahoo.historical = Promise.promisify(function (sym, frm, to, callback) {

  yahoo.historical({
    symbol: sym,
    from: frm,
    to: to,
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, callback);
});

// apiMethods.yahoo.historical = function (sym = 'AAPL', flds = ['s', 'n', 'd1', 'l1', 'y', 'r']) {
apiMethods.yahoo.snapshot = Promise.promisify(function (sym, flds, callback) {
  yahoo.snapshot({
    symbol: sym,
    fields: flds,
  }, callback);
});

apiMethods.yahoo.snapshot('AAPL', ['s','n'])
.then(function (a) {console.log(a)})
.error(function (a) {console.log(a)});

apiMethods.yahoo.historical('AAPL', '2012-01-01', '2012-01-10')
.then(function (a) {console.log(a)})
.error(function (a) {console.log(a)});

module.exports = apiMethods;