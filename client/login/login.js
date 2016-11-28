(function () {
  'use strict';

  angular
    .module('einstock.login', [])
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService', '$scope'];

  function LoginController(authService, $scope) {
    var vm = this;
    vm.authService = authService;
    $scope.isLoggedIn = localStorage.getItem("id_token") !== null ? true : false;
    $scope.buttonSwitch = function() {
      $scope.isLoggedIn = !$scope.isLoggedIn;
    }
  }
})();