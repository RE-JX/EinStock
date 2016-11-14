var dashboardCtrl = function($scope, Algorithm) {
    $scope.data = {};
}

angular.module('einstock.dashboard', [
  'ngMaterial'
  ])
  // Dashboard for users to see charts
  .controller('dashboardController', dashboardCtrl);