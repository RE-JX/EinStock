(function() {
  'use strict'

  angular
    .module('einstock.algorithm', [
      'ngMaterial',
      'ngMessages'
    ])

    //this will be the controller to create new campaigns
    .controller('algorithmController', algoCtrl)

  function algoCtrl($scope, Algorithm, TickValidation) {
    //init a start date
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 1);
    //-----------------------------------------
    $scope.data = {
      ticker: 'GOOG',
      startDate: firstDate,
      endDate: new Date()
    }

    $scope.log = function() {
      Algorithm.post($scope.data).success(function(data) {
        console.log(data);
        localStorage.setItem('data', angular.toJson(data));
      });
    }

    $scope.tickTest = function() {
     return TickValidation.isValid($scope.data.ticker);
    }

    $scope.dash = function() {
      return Algorithm.redirect();
    }
  }

})();