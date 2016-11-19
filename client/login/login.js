(function () {
  'use strict';

  angular
    .module('einstock.login', [])
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService'];

  function LoginController(authService) {
    var vm = this;
    vm.authService = authService;
  }
})();