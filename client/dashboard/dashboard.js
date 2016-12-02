
(function() {
  'use strict'

  angular.module('einstock.dashboard', [
      'ngMaterial',
      'chart.js'
    ])
    // Dashboard for users to see charts
    .controller('SpeedController', SpeedController)
    .controller('DashboardController', DashboardController);

  SpeedController.$inject = ['$scope', '$timeout', '$mdDialog'];
  DashboardController.$inject = ['$scope', 'Algorithm', '$mdDialog'];

  //Sidebar navigation controller
  function SpeedController($scope, $timeout, $mdDialog) {
    $scope.dialog = function($event, item) {
      $mdDialog.show({
        clickOutsideToClose: true
      })
    };
  };

  //Using to pass local storage to scope of all charts in dashboard
  function DashboardController($scope, Algorithm, $mdDialog) {

    var history = angular.fromJson(localStorage.getItem('data'));
    $scope.history = history;
    console.log($scope.history)
    $scope.data = $scope.history.data[$scope.history.data.length - 1];
    $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
    $scope.labels = $scope.data.dateLabels;
    $scope.tomorrow = true;

    // Dialog templates for the info buttons
    $scope.showHelpBuySell = function($event) {
        $mdDialog.show({
          targetEvent: $event,
          template: '<md-dialog>' +
                    '  <md-dialog-content class="info">' +
                    '    <h3>Trading Decisions</h3>' +
                    '    <p>This chart shows the buying/selling actions ' +
                    '    simulated over the test period if one were to trade' +
                    '    following the algorithm\'s price trend predictions.</p>' +
                    '  </md-dialog-content>' +
                    '  <div class="md-actions">' +
                    '    <md-button ng-click="closeDialog()" class="md-primary">' +
                    '      Got it' +
                    '    </md-button>' +
                    '  </div>' +
                    '</md-dialog>',
          controller: function($scope, $mdDialog){
            $scope.closeDialog = function(){$mdDialog.hide();};
            $scope.hide = function() {
              $mdDialog.hide();
            };
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
          }
        });
    };

    $scope.showHelpTomorrow = function($event) {
        $mdDialog.show({
          targetEvent: $event,
          template: '<md-dialog>' +
                    '  <md-dialog-content class="info">' +
                    '    <h3>Next Day Prediction</h3>' +
                    '    <p>Up-arrow indicates the algorithm predicts an upward movement ' +
                    '    in the underlining stock price for the next trading day. ' +
                    '    Down-arrow indicates the opposite.</p>' +
                    '  </md-dialog-content>' +
                    '  <div class="md-actions">' +
                    '    <md-button ng-click="closeDialog()" class="md-primary">' +
                    '      Got it' +
                    '    </md-button>' +
                    '  </div>' +
                    '</md-dialog>',
          controller: function($scope, $mdDialog){
            $scope.closeDialog = function(){$mdDialog.hide();};
            $scope.hide = function() {
              $mdDialog.hide();
            };
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
          }
        });
    };

    $scope.showHelpRadar = function($event) {
        $mdDialog.show({
          targetEvent: $event,
          template: '<md-dialog>' +
                    '  <md-dialog-content class="info">' +
                    '    <h3>Investment Returns</h3>' +
                    '    <p><strong>Algorithm Cumulative Return: </strong>Total simulated investment returns over the test period if tradings were conducted following the algorithm\' predictions </p>' +
                    '    <p><strong>Average Algorithm Return: </strong>Daily average of the cumulative return </p>' +
                    '    <p><strong>Sharpe Ratio: </strong>Average algorithm return divided by standard deviation of daily returns. This is a common measure for risk-adjusted returns </p>' +
                    '    <p><strong>Market Benchmark: </strong>Cumulative returns over the test period for buying and holding S&P 500 index </p>' +
                    '    <p><strong>Self Benchmark: </strong>Cumulative returns over the test period for buying and holding the underlining stock </p>' +
                    '  </md-dialog-content>' +
                    '  <div class="md-actions">' +
                    '    <md-button ng-click="closeDialog()" class="md-primary">' +
                    '      Got it' +
                    '    </md-button>' +
                    '  </div>' +
                    '</md-dialog>',
          controller: function($scope, $mdDialog){
            $scope.closeDialog = function(){$mdDialog.hide();};
            $scope.hide = function() {
              $mdDialog.hide();
            };
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
          }
        });
    };

    $scope.showHelpPie = function($event) {
        $mdDialog.show({
          targetEvent: $event,
          template: '<md-dialog>' +
                    '  <md-dialog-content class="info">' +
                    '    <h3>Prediction Accuracy</h3>' +
                    '    <p><strong>Successful predictions: </strong>Percentage of the test period when the algorithm\'s prediction for the next day matches the actual direction of price change</p>' +
                    '    <p><strong>Inclusion Errors: </strong>Percentage of the test period when the algorithm\'s prediction was "up" while the actual price movement was "down" </p>' +
                    '    <p><strong>Exclusion Errors: </strong>Percentage of the test period when the algorithm\' prediction was "down" while the actual price movement was "up" </p>' +
                    '  </md-dialog-content>' +
                    '  <div class="md-actions">' +
                    '    <md-button ng-click="closeDialog()" class="md-primary">' +
                    '      Got it' +
                    '    </md-button>' +
                    '  </div>' +
                    '</md-dialog>',
          controller: function($scope, $mdDialog){
            $scope.closeDialog = function(){$mdDialog.hide();};
            $scope.hide = function() {
              $mdDialog.hide();
            };
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
          }
        });
    };

    $scope.showHelpBarLine = function($event) {
        $mdDialog.show({
          targetEvent: $event,
          template: '<md-dialog>' +
                    '  <md-dialog-content class="info">' +
                    '    <h3>Daily Asset Values</h3>' +
                    '    <p>This chart shows the evolution of total portfolio asset values over the test period if $1000 had been invested at the beginning of the test period and tradings conducted according to algorithm predictions. This result is shown against the evolution of total asset values if the $1000 had been invested in buying and holding the S&P 500 index or the underlining stock. </p>' +
                    '  </md-dialog-content>' +
                    '  <div class="md-actions">' +
                    '    <md-button ng-click="closeDialog()" class="md-primary">' +
                    '      Got it' +
                    '    </md-button>' +
                    '  </div>' +
                    '</md-dialog>',
          controller: function($scope, $mdDialog){
            $scope.closeDialog = function(){$mdDialog.hide();};
            $scope.hide = function() {
              $mdDialog.hide();
            };
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
          }
        });
    };
    // History changing function for button module
    $scope.changeHistoryOne = function() {
      var data = history.data;
      $scope.data = data[data.length - 2];
      $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
      $scope.labels = $scope.data.dateLabels;
      graphRender();
      $scope.tomorrow = false;
    };
    $scope.changeHistoryTwo = function() {
      var data = history.data;
      $scope.data = data[data.length - 3];
      $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
      $scope.labels = $scope.data.dateLabels;
      graphRender();
      $scope.tomorrow = false;
    };
    $scope.changeHistoryThree = function() {
      var data = history.data;
      $scope.data = data[data.length - 4];
      $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
      $scope.labels = $scope.data.dateLabels;
      graphRender();
      $scope.tomorrow = false;
    };

    //Graph render function to help with re-rendering
    var graphRender = function() {
      //Radar Chart on top left
      $scope.radarLabel = ['Algorithm Cumulative Return', 'Algorithm Average Return', 'Sharpe Ratio', 'Market Benchmark', 'Self Benchmark'];
      $scope.colors = ['#FDB45C'];
      $scope.radar = [];
      $scope.radarOptions = {
        responsive: true,
        scale: {
          pointLabels: {
            fontSize: 16
          },
        },
        tooltips: {
          titleFontSize: 20,
          bodyFontSize: 20
        }
      };
      //Add to Radar data
      $scope.radar.push($scope.data.cummuReturn);
      $scope.radar.push($scope.data.avgReturn);
      $scope.radar.push($scope.data.sharpeRatio);
      $scope.radar.push($scope.data.benchmarkReturnMarket);
      $scope.radar.push($scope.data.benchmarkReturnSelf);

      //Bottom left pie chart that shows algorithm success rate
      $scope.pieLabels = ['Successful predictions (%)', 'Inclusion Errors (%)', 'Exclusion Errors (%)'];
      $scope.pieLegend = ['Successful predictions (%)', 'Inclusion Errors (%)', 'Exclusion Errors (%)'];
      $scope.pieSeries = ['Successful predictions (%)', 'Inclusion Errors (%)', 'Exclusion Errors (%)'];

      $scope.pie = [$scope.data.successRate * 100, $scope.data.inclusionError * 100, $scope.data.exclusionError * 100];

      $scope.pieOptions = {
        responsive: true,
        legend: {
          display: true,
          fullWidth: true,
          labels: {
            fontSize: 30
          }
        },
        tooltips: {
          titleFontSize: 30,
          bodyFontSize: 25
        },
        defaultFontSize: 18,
        onAnimationComplete: function() {
          this.showTooltip(this.segments, true);
        }
      };

      // Bar chart for buying and selling timeline
      $scope.timeline = [];
      $scope.buying = $scope.data.buyOrSell.map(event => {
        if(event === 'buy') return 1;
        else return 0;
      });
      $scope.selling = $scope.data.buyOrSell.map(event => {
        if(event === 'sell') return -1;
        else return 0;
      });
      $scope.timeline.push($scope.buying);
      $scope.timeline.push($scope.selling);
      $scope.timelineOptions = {
        responsive: true,
        legend: {
          display: true,
          fullWidth: true,
          labels: {
            fontSize: 25
          }
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 16
            }
          }],
          yAxes: [{
            display: false
          }]
        }
      };
      $scope.timelineSeries = [
        'Buy',
        'Sell'
      ];
      $scope.timelineColors = ['#4CAF50','#F44336'];

      // Bar Line Hybrid Chart on bottom
      $scope.line = [
        $scope.data.benchmarkAssetValuesMarket,
        $scope.data.benchmarkAssetValuesSelf,
        $scope.data.totalAssetValues
      ];

      $scope.lineSeries = [
        'Benchmark 1: Buy and hold S&P 500',
        'Benchmark 2: Buy and hold current stock',
        'Trading from algorithm predictions'
      ];

      $scope.lineChartYAxis = '$';

      $scope.lineOptions = {
        responsive: true,
        legend: {
          display: true,
          fullWidth: true,
          labels: {
            fontSize: 25
          }
        },
        tooltips: {
          titleFontSize: 25,
          bodyFontSize: 25
        },
        padding: 0,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 18
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 20
            },
            scaleLabel: {
              display: true,
              labelString: 'Dollars',
              fontSize: 20
            }
          }]
        }
      };

      $scope.onClick = function(points, evt) {
        console.log(points, evt);
      };

      $scope.datasetOverride = [{
        label: 'Buy and hold S&P 500',
        borderWidth: 3,
        type: 'line'
      }, {
        label: 'Buy and hold current stock',
        borderWidth: 3,
        type: 'line',
      }, {
        label: 'Trading from algorithm predictions',
        borderWidth: 1,
        type: 'bar'
      }];
    };
    graphRender();
  };
  //ending function brackets
})();
