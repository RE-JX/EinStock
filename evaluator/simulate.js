// inputs:
// 1. frequency (e.g. d, h, m)
// 2. start date (and/or time)
// 3. end date
// 4. ticker symbol for underlining asset
// 5. array of predicted price movement for the next interval over test period
//       element value: 1 - up
//                      0 - down
      // i.e. the array looks like this: [1, 0, 1, 1, 1, 0, 0]

// Output:
// An object that looks something like this:
// {
//   frequency: 'd'
//   startDate: '11/14/2016',
//   endDate: '11/18/2016',
//   assetName: 'IBM',
//   predictions: [1, 0, 1, 1, 1],
//   actualMove: [0, 0, 1, 1, 0],  <== actual realized price movements
//   inclusionError: 40, <== percentage of instances where price goes up, but prediction was down
//   exclusionError: 30, <== percentage of instances where price goes down, but prediction was up
//   assetValues: [100, 110, 95, 105, 102], <== evolution of total portfolio values over test period
//   returns: [0, 10, -13, 20, -1], <== percentage change in total portfolio values
//   avgReturn: 3, <== average return across intervals
//   cummuReturn: 2, <== cummulative return over test  period
//   returnStd: 5, <== standard deviation of returns
//   sharpeRatio: 0.4, <== Sharpe ratio, a.k.a risk-adjusted return
//   benchmarkReturn: 1 <== the cummulative return for S&P500 over test priod
// }
