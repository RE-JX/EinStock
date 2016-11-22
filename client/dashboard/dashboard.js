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
  DashboardController.$inject = ['$scope'];
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
  function DashboardController($scope) {
    // console.log('GET REQUEST FROM DASHBOARD', localStorage.getItem('data'));
    $scope.data = angular.fromJson(localStorage.getItem('data'));
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
        $scope.labels.push(current.format("MM-DD-YYYY"));
        current.add(1, 'days');
      }
      if (6 <= current.day()) {
        current = current.weekday(8);
        $scope.labels.push(current.format("MM-DD-YYYY"));
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

    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };

    $scope.datasetOverride = [
      {
        label: "Benchmark Asset Value",
        borderWidth: 3,
        type: 'line'
      },
      {
        label: "Chosen Asset Value",
        borderWidth: 3,
        type: 'line',
      },
      {
        label: "Algorithm Asset Value",
        borderWidth: 1,
        type: 'bar'
      }
    ];
  };

  //Bottom left pie chart that shows algorithm success rate
  function PieController($scope) {
    var data = $scope.data;
    $scope.labels = ['Success Rate', 'Include Error', 'Exclusion Error'];
    $scope.pie = [data.successRate * 100, data.inclusionError * 100, data.exclusionError * 100];
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
