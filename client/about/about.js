(function() {
  'use strict'

  angular.module('einstock.about', [
      'ngMaterial'
    ])
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope'];

  //Welcome controller for static welcome page
  function AboutController($scope) {
    $scope.about = "We are a team of software engineers who are fascinated by the financial markets and the idea of using maching learning to predict everyday events. So we created Einstock for stock market predictions using NodeJS and several machine learning algorithms.";
    $scope.disclaimer = "*The Einstock app is for educational purposes only. We do not provide any market advisory services and are not responsible for any users' trading gains or losses.*";

  };
})();