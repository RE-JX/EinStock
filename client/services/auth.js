(function () {
  'use strict';

  angular
    .module('einstock.authService', [])
    .service('authService', authService);

  authService.$inject = ['lock', 'authManager', 'UserData', '$q', '$timeout'];

  function authService(lock, authManager, UserData, $q, $timeout) {
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
      function getId () {
        return $timeout(function() {
          return localStorage.getItem('id_token');
        }, 2000);
        return deferred.promise;
      };

      var promise = getId();
      promise.then(function(id) {
        var token = {
          userid: id
        };
        console.log(token);

        UserData.post(angular.toJson(token)).success(function(data) {
          console.log(data);
        })
      });
    };

    //Logout function to remove token from user
    function logout() {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
      document.location.reload(true);
    };

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  };
})();