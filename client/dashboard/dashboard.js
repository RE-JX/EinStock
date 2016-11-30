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
    .controller('RadarController', RadarController)
    .controller('LineController', LineController)
    .controller('PieController', PieController)
    .controller('BubbleController', BubbleController)
    .controller('TimelineController', TimelineController);

  SpeedController.$inject = ['$scope', '$timeout', '$mdDialog'];
  DashboardController.$inject = ['$scope', 'Algorithm'];
  RadarController.$inject = ['$scope'];
  LineController.$inject = ['$scope'];
  PieController.$inject = ['$scope'];
  TimelineController.$inject = ['$scope'];

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
    $scope.labels = [];
    // console.log($scope.data);
    var data = $scope.data;

    //Create labels for dates given and pass to children in scope

    // var current = moment(data.startDate).add(1, 'days');
    // var end = moment(data.endDate).add(1, 'days');
    // var labelCount = data.actualMoves.length;
    // //If end predicted date is weekend, change to following Monday
    // if (6 <= end.day()) {
    //   end = end.weekday(8);
    // }

    // //Way to get day labels
    // while (labelCount > 1) {
    //   if (0 < current.day() && current.day() < 6) {
    //     $scope.labels.push(current.format('YYYY-MM-DD'));
    //     current.add(1, 'days');
    //   }
    //   if (6 <= current.day()) {
    //     current = current.weekday(8);
    //     $scope.labels.push(current.format('YYYY-MM-DD'));
    //     current.add(1, 'days');
    //   }
    //   labelCount--;
    // }
    $scope.labels = data.dateLabels;
  };

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

  function TimelineController($scope) {
    var data = $scope.data;
    $scope.format = 'YYYY-MM-DD';
    $scope.startDate = data.dateLabels[0];
    $scope.endDate = data.dateLabels[data.dateLabels.length - 1];
    $scope.events = [];
    data.buyOrSell.forEach((event, i) => {
      if(event !== 'hold') {
        $scope.events.push({'date': data.dateLabels[i], 'content': event});
      }
    });
    console.log($scope.events);
  };

  //Chart top left bar chart to show if it went up or down
  function RadarController($scope) {
    var data = $scope.data;
    $scope.labels = ['Algorithm Cumulative Return', 'Algorithm Average Return', 'Sharpe Ratio', 'Market Benchmark', 'Self Benchmark'];
    $scope.colors = ['#FDB45C'];
    $scope.radar = [];
    $scope.options = {
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

  //Line chart on top right to show returns
  function LineController($scope) {
    var data = $scope.data;
    $scope.labels = data.dateLabels;
    $scope.line = [
      data.benchmarkAssetValuesMarket,
      data.benchmarkAssetValuesSelf,
      data.totalAssetValues
    ];

    $scope.series = [
      'Benchmark 1: Buy and hold S&P 500',
      'Benchmark 2: Buy and hold current stock',
      'Trading from algorithm predictions'
    ];

    $scope.options = {
      legend: {
        display: true,
        fullWidth: true,
        labels: {
          fontSize: 25
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

      $scope.pie = [$scope.successRate * 100, $scope.inclusionError * 100, $scope.exclusionError * 100];
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
