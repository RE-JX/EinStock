// All the Angular modules we'll be using, including premade as well as our own modules we've created for views on our app
var scrollerCtrl = function($scope, $location, $anchorScroll) {
  $scope.scrollDown = function() {
    $location.hash('navbar');
    $anchorScroll();
  }
};

angular.module('einstock', [
    'einstock.services',
    'einstock.dashboard',
    'einstock.algorithm',
    'einstock.welcome',
    'ngRoute',
    'ngMaterial',
    'ngAria',
    'highcharts-ng',
    'chart.js'
  ])
  .controller('scrollerController', scrollerCtrl)
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
