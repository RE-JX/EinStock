(function() {
  'use strict'

  angular.module('einstock.dashboard', [
      'ngMaterial',
      'chart.js'
    ])
    // Dashboard for users to see charts
    .controller('DashboardController', DashboardController)
    .controller('BarController', BarController)
    .controller('LineController', LineController)
    .controller('PieController', PieController)
    .controller('BubbleController', BubbleController);

  DashboardController.$inject = ['$scope'];
  BarController.$inject = ['$scope'];
  LineController.$inject = ['$scope'];
  PieController.$inject = ['$scope'];

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
  function BarController($scope) {
    var data = $scope.data;
    $scope.series = ['Predicted', 'Actual'];
    $scope.bar = [];
    $scope.options = {
      scales: {
        yAxes: [{
          display: false
        }]
      }
    };

    //Add to bar data
    $scope.bar.push(data.actualMoves);
    $scope.bar.push(data.predictedMoves);
  };

  //Line chart on top right to show returns
  function LineController($scope) {
    $scope.line = [
      [65, -59, 80, 81, -56, 55, -40],
      [28, 48, -40, 19, 86, 27, 90],
      [28, 48, -40, 19, 86, 27, 90],
    ];

    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };

    $scope.datasetOverride = [
      {
        label: "line chart 1",
        borderWidth: 3,
        type: 'line'
      },
      {
        label: "line chart 2",
        borderWidth: 3,
        type: 'line',
      },
      {
        label: "Bar chart",
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
    $scope.bubble = [];

    var count = 0;
    data.totalAssetValues.forEach(function(day) {
      var droplet = {
        x: data.benchmarkAssetValuesSelf[count] / 10,
        y: data.benchmarkAssetValuesMarket[count] / 10,
        r: data.totalAssetValues[count] / 100
      };
      count++;
      $scope.bubble.push(droplet);
    });
  };

  //ending function brackets
})();
