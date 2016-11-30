
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
  DashboardController.$inject = ['$scope', 'Algorithm'];

  //Sidebar navigation controller
  function SpeedController($scope, $timeout, $mdDialog) {
    $scope.dialog = function($event, item) {
      $mdDialog.show({
        clickOutsideToClose: true
      })
    };
  };

  //Using to pass local storage to scope of all charts in dashboard
  function DashboardController($scope, Algorithm) {

    var history = angular.fromJson(localStorage.getItem('data'));
    $scope.history = history;
    var data = history.data;
    $scope.data = data[data.length - 1];
    $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
    $scope.labels = $scope.data.dateLabels;


    // History changing function for button module
    $scope.changeHistoryOne = function() {
      var data = history.data;
      $scope.data = data[data.length - 2];
      $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
      $scope.labels = $scope.data.dateLabels;
      graphRender();
    };
    $scope.changeHistoryTwo = function() {
      var data = history.data;
      $scope.data = data[data.length - 3];
      $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
      $scope.labels = $scope.data.dateLabels;
      graphRender();
    };
    $scope.changeHistoryThree = function() {
      var data = history.data;
      $scope.data = data[data.length - 4];
      $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
      $scope.labels = $scope.data.dateLabels;
      graphRender();
    };

    //Graph render function to help with re-rendering
    var graphRender = function() {
      //Radar Chart on top left
      $scope.radarLabel = ['Algorithm Cumulative Return', 'Algorithm Average Return', 'Sharpe Ratio', 'Market Benchmark', 'Self Benchmark'];
      $scope.colors = ['#FDB45C'];
      $scope.radar = [];
      $scope.radarOptions = {
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

      $scope.lineOptions = {
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
