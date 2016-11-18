(function () {
  'use strict';

  angular
    .module('einstock.login')
    .controller('LoginController', LoginController);

  function LoginController(authService) {
    var vm = this;
    vm.authService = authService;
  }
})();