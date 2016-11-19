(function() {
  'use strict'

  angular.module('einstock.machine', [
      'ngMaterial'
    ])
    .controller('MachineController', MachineController)

  MachineController.$inject = ['$scope'];

  //Welcome controller for static welcome page
  function MachineController($scope) {
    $scope.about = "Machine Learning";
    $scope.methods = "";
  }
})();
