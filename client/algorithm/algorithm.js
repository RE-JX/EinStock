(function() {
  'use strict'

  angular
    .module('einstock.algorithm', [
      'ngMaterial',
      'ngMessages'
    ])

    //this will be the controller to create new campaigns
    .controller('AlgorithmController', AlgorithmController);

  AlgorithmController.$inject = ['Algorithm', 'TickValidation'];

  function AlgorithmController(Algorithm, TickValidation) {
    var vm = this;
    //Algorithm Selections
    vm.algSelections = [
      'K Nearest Neighbors',
      'Logistic Regression',
      'Naive Bayes',
      'Neural Networks',
      'Random Forests',
      'Support Vector Machine'
    ];
    //Model
    vm.selection = vm.algSelections[0];
    //-----------------------------------------
    //init a start date for test period
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 7);
    //-----------------------------------------
    vm.data = {
      startDate: firstDate,
      endDate: new Date(),
      ticker: 'GOOG',
      algorithm: vm.selection,
      userId: angular.fromJson(localStorage.getItem('profile')).identities[0].user_id
    };

    vm.log = function() {
      vm.isLoading = true;
      Algorithm.post(vm.data).success(function(data) {
        console.log(data);
        Algorithm.get(
          {params: {userId: vm.data.userId}}
        ).success(function(data) {
          console.log('simulations: ', data);
          localStorage.setItem('data', angular.toJson(data));
          vm.isLoading = false;
          Algorithm.redirect();
        });
      });
    };

    vm.tickTest = function() {
     return TickValidation.isValid(vm.data.ticker);
    };

  }

})();