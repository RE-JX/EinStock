
(function() {
  'use strict'

  angular.module('einstock.dashboard', [
      'ngMaterial',
      'chart.js',
      'angular-horizontal-timeline'
    ])
    // Dashboard for users to see charts
    .controller('SpeedController', SpeedController)
    .controller('DashboardController', DashboardController)
    .controller('TimelineController', TimelineController);

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

  function TimelineController($scope) {
    var history = angular.fromJson(localStorage.getItem('data'));
    $scope.history = history;
    var data = history.data;
    $scope.data = data[data.length - 1];
    $scope.format = 'YYYY-MM-DD';
    $scope.startDate = $scope.data.dateLabels[0];
    $scope.endDate = $scope.data.dateLabels[$scope.data.dateLabels.length - 1];
    $scope.events = [];
    $scope.data.buyOrSell.forEach((event, i) => {
      if(event !== 'hold') {
        $scope.events.push({'date': $scope.data.dateLabels[i], 'content': event});
      }
    });
    console.log($scope.events);
  };

  //Using to pass local storage to scope of all charts in dashboard
  function DashboardController($scope, Algorithm) {

    var history = angular.fromJson(localStorage.getItem('data'));
    $scope.history = history;
    var data = history.data;
    $scope.data = data[data.length - 1];
    $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
    $scope.labels = $scope.data.dateLabels;
    // console.log($scope.data);

    // History changing function for button module
    $scope.changeHistoryOne = function() {
      var data = history.data;
      $scope.data = data[data.length - 1 - 2];
      graphRender();
    };
    $scope.changeHistoryTwo = function() {
      var data = history.data;
      $scope.data = data[data.length - 1 - 3];
      graphRender();
    };
    $scope.changeHistoryThree = function() {
      var data = history.data;
      $scope.data = data[data.length - 1 - 4];
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

      // Bar Line Hybrid Chart on bottom
      $scope.line = [
        $scope.data.benchmarkAssetValuesMarket,
        $scope.data.benchmarkAssetValuesSelf,
        $scope.data.totalAssetValues
      ];
      console.log($scope.line, $scope.labels);

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
