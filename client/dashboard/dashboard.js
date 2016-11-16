(function() {
  'use strict'

  angular.module('einstock.dashboard', [
      'ngMaterial',
      'highcharts-ng',
      'chart.js'
    ])
    // Dashboard for users to see charts
    .controller('DashboardController', DashboardController)
    .controller('StockController', StockController)
    .controller('lineController', LineController);

  DashboardController.$inject = ['$scope'];
  StockController.$inject = ['$scope', '$timeout'];
  LineController.$inject = ['$scope'];

  function DashboardController() {
    console.log('GET REQUEST FROM DASHBOARD', localStorage.getItem('data'));
  };

  function StockController($scope, $timeout) {
    $scope.chartConfig = {
      options: {
        chart: {
          zoomType: 'x'
        },
        rangeSelector: {
          enabled: true
        },
        navigator: {
          enabled: true
        }
      },
      series: [],
      title: {
        text: 'Machine Learning'
      },
      useHighStocks: true
    };

    $scope.chartConfig.series.push({
      id: 1,
      data: [
        [1147651200000, 23.15],
        [1147737600000, 23.01],
        [1147824000000, 22.73],
        [1147910400000, 22.83],
        [1147996800000, 22.56],
        [1148256000000, 22.88],
        [1148342400000, 22.79],
        [1148428800000, 23.50],
        [1148515200000, 23.74],
        [1148601600000, 23.72],
        [1148947200000, 23.15],
        [1149033600000, 22.65]
      ]
    }, {
      id: 2,
      data: [
        [1147651200000, 25.15],
        [1147737600000, 25.01],
        [1147824000000, 25.73],
        [1147910400000, 25.83],
        [1147996800000, 25.56],
        [1148256000000, 25.88],
        [1148342400000, 25.79],
        [1148428800000, 25.50],
        [1148515200000, 26.74],
        [1148601600000, 26.72],
        [1148947200000, 26.15],
        [1149033600000, 26.65]
      ]
    });
  };

  function LineController($scope) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
      scales: {
        yAxes: [{
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }, {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }]
      }
    };
  };
})();
