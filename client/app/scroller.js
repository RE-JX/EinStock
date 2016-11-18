(function() {
  'use strict';

  angular
    .module('einstock.scroller', [])
    // Pass off scrolling function to FAB button on main banner
    .controller('ScrollerController', ScrollerController)

  ScrollerController.$inject = ['$scope', '$location', '$anchorScroll'];

  //Scroller Controller defined here
  function ScrollerController($scope, $location, $anchorScroll) {
    $scope.scrollDown = function() {
      $location.hash('navbar');
      $anchorScroll();
    }
  };

})();
