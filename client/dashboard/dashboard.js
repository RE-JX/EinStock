(function() {
  'use strict'

  angular.module('einstock.dashboard', [
      'ngMaterial',
      'chart.js'
    ])
    // Dashboard for users to see charts
    .controller('SpeedController', SpeedController)
    .controller('DashboardController', DashboardController)
    .controller('RadarController', RadarController)
    .controller('LineController', LineController)
    .controller('PieController', PieController)
    .controller('BubbleController', BubbleController);

  SpeedController.$inject = ['$scope', '$timeout', '$mdDialog'];
  DashboardController.$inject = ['$scope', 'Algorithm'];
  RadarController.$inject = ['$scope'];
  LineController.$inject = ['$scope'];
  PieController.$inject = ['$scope'];

  //Sidebar navigation controller
  function SpeedController($scope, $timeout, $mdDialog) {
    $scope.dialog = function ($event, item) {
      $mdDialog.show({
        clickOutsideToClose: true
      })
    };
  };

  //Using to pass local storage to scope of all charts in dashboard
  function DashboardController($scope, Algorithm) {
    // console.log('GET REQUEST FROM DASHBOARD', localStorage.getItem('data'));
    $scope.data = angular.fromJson(localStorage.getItem('data'));
    // var something = {
    //   userId: angular.fromJson(localStorage.getItem('profile')).identities[0].user_id
    // };
    // $scope.data = Algorithm.get(something).success(function(data) {
    //   console.log(data);
    // });
    // console.log(localStorage.getItem('profile'));
    $scope.data.tickerSymbol = $scope.data.tickerSymbol.toUpperCase();
    $scope.labels = [];
    console.log($scope.data);
    var data = $scope.data;

    //Create labels for dates given and pass to children in scope
    var current = moment(data.startDate).add(1, 'days');
    var end = moment(data.endDate).add(1, 'days');
    var labelCount = data.actualMoves.length;
    //If end predicted date is weekend, change to following Monday
    if (6 <= end.day()) {
      end = end.weekday(8);
    }

    //Way to get day labels
    while (labelCount > 1) {
      if (0 < current.day() && current.day() < 6) {
        $scope.labels.push(current.format('MM-DD-YYYY'));
        current.add(1, 'days');
      }
      if (6 <= current.day()) {
        current = current.weekday(8);
        $scope.labels.push(current.format('MM-DD-YYYY'));
        current.add(1, 'days');
      }
      labelCount--;
    }
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
          fontSize: 14
        },
      },
      tooltips: {
        titleFontSize: 20,
        bodyFontSize: 20
      }
    };
    //Add to Radar data
    $scope.radar.push(data.cummuReturn);
    $scope.radar.push(data.avgReturn);
    $scope.radar.push(data.sharpeRatio);
    $scope.radar.push(data.benchmarkReturnMarket);
    $scope.radar.push(data.benchmarkReturnSelf);
  };

  //Line chart on top right to show returns
  function LineController($scope) {
    var data = $scope.data;
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

    $scope.datasetOverride = [
      {
        label: 'Buy and hold S&P 500',
        borderWidth: 3,
        type: 'line'
      },
      {
        label: 'Buy and hold current stock',
        borderWidth: 3,
        type: 'line',
      },
      {
        label: 'Trading from algorithm predictions',
        borderWidth: 1,
        type: 'bar'
      }
    ];
  };

  //Bottom left pie chart that shows algorithm success rate
  function PieController($scope) {
    var data = $scope.data;
    $scope.labels = ['Successful predictions (%)', 'Inclusion Errors (%)', 'Exclusion Errors (%)'];
    $scope.legend = ['Successful predictions (%)', 'Inclusion Errors (%)', 'Exclusion Errors (%)'];
    $scope.series = ['Successful predictions (%)', 'Inclusion Errors (%)', 'Exclusion Errors (%)'];

    $scope.pie = [data.successRate * 100, data.inclusionError * 100, data.exclusionError * 100];
    $scope.options = {
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
      onAnimationComplete: function () {
          this.showTooltip(this.segments, true);
      }
    };
  }

  //Bottom right bubble graph
  function BubbleController($scope) {
    var data = $scope.data;
    $scope.label = 'New';
    $scope.bubble = [];

    var count = 0;
    data.totalAssetValues.forEach(function(day) {
      var droplet = {
        x: data.benchmarkAssetValuesSelf[count] / 10,
        y: data.benchmarkAssetValuesMarket[count] / 10,
        r: data.totalAssetValues[count] / 40
      };
      count++;
      $scope.bubble.push(droplet);
    });
  };

  //ending function brackets
})();
