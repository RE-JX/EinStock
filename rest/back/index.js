//connect to Various APIs server up data to ML services
var yahoo = require('../node_modules/yahoo-finance');
var google = require('../node_modules/google-finance');
var Promise    = require("bluebird");

apiMethods = {};
apiMethods.yahoo = {};
apiMethods.google = {};

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

apiMethods.google.companyNews = Promise.promisify(function (sym, callback) {
  google.companyNews({
    // symbol: 'NASDAQ:' + sym
    symbol: 'NASDAQ:APPL'
  }, callback);
});

apiMethods.google.historical = Promise.promisify(function (sym, frm, to, callback) {
  google.historical({
    // symbol: 'NASDAQ:' + sym,
    symbol: 'NASDAQ:AAPL',
    from: frm,
    to: to
  }, callback);
});

apiMethods.google.companyNews = function () {
  console.error('Google companyNews is currently broken. Do not use.');
}
apiMethods.google.historical = function () {
  console.error('Google historical is currently broken. Do not use.');
}

//GOOGLE NOT WORKING
// google.historical({
//   symbol: 'NASDAQ:AAPL',
//   from: '2014-01-01',
//   to: '2014-12-31'
// }, function (err, quotes) {
//   console.log('it ran');
//   console.log(err);
//   console.log(quotes);
// });

// google.companyNews({
//   symbol: 'NASDAQ:AAPL'
// }, function (err, news) {
//   console.log('it ran');
//   if (err) console.log(err);
//   console.log(quotes);
// });




// EXAMPLES
// apiMethods.yahoo.snapshot('AAPL', ['s', 'n', 'd1', 'l1', 'y', 'r'])
// .then(function (a) {console.log(a);})
// .error(function (a) {console.log(a);});

apiMethods.yahoo.historical('AAPL', '2012-01-01', '2012-01-10')
.then(function (a) {console.log(a);})
.error(function (a) {console.log(a);});

// apiMethods.google.companyNews('AAPL')
// .then(function (a) {console.log(a);})
// .error(function (a) {console.log(a);});

// apiMethods.google.historical('AAPL', '2012-01-01', '2012-01-10')
// .then(function (a) {console.log(a);})
// .error(function (a) {console.log(a);});

// console.log('something happened');

module.exports = apiMethods;