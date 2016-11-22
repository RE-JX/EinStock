// All the Angular modules we'll be using, including premade as well as our own modules we've created for views on our app
(function() {
  'use strict'

  angular.module('einstock', [
    'einstock.services',
    'einstock.dashboard',
    'einstock.algorithm',
    'einstock.welcome',
    'einstock.machine',
    'einstock.authService',
    'einstock.run',
    'einstock.scroller',
    'einstock.login',
    'einstock.validation',
    'ngMaterial',
    'ngMessages',
    'ngAria',
    'chart.js',
    'auth0.lock',
    'angular-jwt',
    'ui.router'
  ])

  .config(mdTheme)
  .config(routes)
  .config(auth)

  mdTheme.$inject = ['$mdThemingProvider'];
  routes.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];
  auth.$inject = ['$httpProvider', 'jwtOptionsProvider'];

  // This is an Angular Material Theme setting for color schemes
  function mdTheme ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
  };

  // This is where we are routing our views
  function routes ($stateProvider, lockProvider, $urlRouterProvider, $rootScope, $state) {

    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      if (localStorage.getItem('id_token') == null) {
        $location.replace().path('/login')
      } else {
        $urlRouterProvider.otherwise('/welcome');
      }
    })

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController'
      })
      .state('algorithm', {
        url: '/algorithm',
        templateUrl: 'algorithm/algorithm.html',
        controller: 'AlgorithmController'
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeController'
      })
      .state('machine', {
        url: '/machine_learning',
        templateUrl: 'machine/machine.html',
        controller: 'MachineController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });

    //auth0 login initializer
    lockProvider.init({
      clientID: 'FcVikV153yHFMA0dKqDNA12cATurOR86',
      domain: 'gsuppy.auth0.com'
    });

    // Right now the default page is set to the algorithm selector view
    console.log(localStorage.getItem('id_token'));

    //End of routing
    };

    //Auth0 Configuration
    function auth($httpProvider, jwtOptionsProvider) {
    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function () {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');
  };
})();
