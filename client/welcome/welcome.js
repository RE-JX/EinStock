var welcomeCtrl = function($scope) {
    $scope.data = {};
};

angular.module('einstock.welcome', [
  'ngMaterial'
  ])
  .controller('welcomeController', welcomeCtrl)