(function() {
  'use strict'

  angular
    .module('einstock.algorithm', [
      'ngMaterial',
      'ngMessages'
    ])

    //this will be the controller to create new campaigns
    .controller('AlgorithmController', AlgorithmController);

  AlgorithmController.$inject = ['$scope', 'Algorithm', 'TickValidation'];

  function AlgorithmController($scope, Algorithm, TickValidation) {
    //temp place holders
    $scope.algSelections = ['K Nearest Neighbors','Logistic Regression','Naive Bayes','Neural Networks','Random Forests'];
    $scope.selection = $scope.algSelections[0];
    //-----------------------------------------
    //init a start date
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 7);
    //-----------------------------------------
    $scope.data = {
      startDate: firstDate,
      endDate: new Date(),
      ticker: 'GOOG',
      algorithm: $scope.selection,
      userId: angular.fromJson(localStorage.getItem('profile')).identities[0].user_id
    };

    $scope.log = function() {
      $scope.isLoading = true;
      localStorage.setItem('userId', $scope.data.userId);
      Algorithm.post($scope.data).success(function(data) {
        // console.log(data);
        Algorithm.get(
          {params: {userId: $scope.data.userId}}
        ).success(function(data) {
          // console.log('simulations: ',data);
          localStorage.setItem('data', angular.toJson(data));
          $scope.isLoading = false;
          Algorithm.redirect();
        });
      });
    };

    $scope.tickTest = function() {
     return TickValidation.isValid($scope.data.ticker);
    };

  }

})();