var algoCtrl = function ($scope, Algorithm) {
  $scope.data = {};
};

angular.module('einstock.algorithm', [
  'ngMaterial'
  ])

  //this will be the controller to create new campaigns
  .controller('algorithmController', algoCtrl)
