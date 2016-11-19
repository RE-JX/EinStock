// All the Angular modules we'll be using, including premade as well as our own modules we've created for views on our app
(function() {
  'use strict'

  angular.module('einstock', [
    'einstock.services',
    'einstock.dashboard',
    'einstock.algorithm',
    'einstock.welcome',
    'einstock.authService',
    'einstock.run',
    'einstock.scroller',
    'einstock.login',
    'ngMaterial',
    'ngMessages',
    'ngAria',
    'chart.js',
    'auth0.lock',
    'angular-jwt',
    'ui.router'
  ])

  // This is an Angular Material Theme setting for color schemes
  .config(mdTheme)

  // This is where we are routing our views
  .config(function($stateProvider, lockProvider, $urlRouterProvider) {

    // Right now the default page is set to the algorithm selector view
    $urlRouterProvider.otherwise('/login');

    //routes under the header
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/dashboard/dashboard.html'
      })
      .state('algorithm', {
        url: '/algorithm',
        templateUrl: '/algorithm/algorithm.html'
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: '/welcome/welcome.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });

    //auth0 login initializer
    lockProvider.init({
      clientID: 'FcVikV153yHFMA0dKqDNA12cATurOR86',
      domain: 'gsuppy.auth0.com'
    });
  })

  function mdTheme ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
  };
})();
