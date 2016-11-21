(function () {
  'use strict';

  angular
    .module('einstock.authService', [])
    .service('authService', authService);

  authService.$inject = ['lock', 'authManager', 'UserData'];

  function authService(lock, authManager, UserData) {
    function login() {
      lock.show();
    };

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      });
      // Posts user data to the datbase upon registration
      UserData.post(localStorage.getItem('id_token')).success(function(data) {
        console.log(data);
      })
    };

    //Logout function to remove token from user
    function logout() {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
    };

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  };
})();