// All the Angular modules we'll be using, including premade as well as our own modules we've created for views on our app
(function() {
  'use strict'

  angular.module('einstock', [
    'einstock.services',
    'einstock.dashboard',
    'einstock.algorithm',
    'einstock.welcome',
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngAria',
    'chart.js',
  ])

  // Pass off scrolling function to FAB button on main banner
  .controller('ScrollerController', ScrollerController)
    // This is an Angular Material Theme setting for color schemes
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        // .primaryPalette('indigo')
        // .accentPalette('orange')
    })
    // This is where we are routing our views
    .config(function($routeProvider, $httpProvider) {
      $routeProvider
        .when('/dashboard', {
          templateUrl: '/dashboard/dashboard.html',
        })
        .when('/algorithm', {
          templateUrl: '/algorithm/algorithm.html'
        })
        .when('/welcome', {
          templateUrl: '/welcome/welcome.html'
        })
        // Right now the default page is set to the algorithm selector view
        .otherwise({
          redirectTo: '/welcome'
        })
    });

  //Scroller Controller defined here
  function ScrollerController($scope, $location, $anchorScroll) {
    $scope.scrollDown = function() {
      $location.hash('navbar');
      $anchorScroll();
    }
  };
})();

