(function () {
  'use strict';

  angular
    .module('einstock.authService', [])
    .service('authService', authService);

  authService.$inject = ['lock', 'authManager', 'UserData', '$q', '$timeout'];

  function authService(lock, authManager, UserData, $q, $timeout) {
    function login() {
      console.log('login function is called');
      lock.show();
    };

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        lock.getProfile(authResult.idToken, function(err, profile) {
          if(err) console.log(err);
          console.log('profileId:', profile.identities[0].user_id);
          var token = {
            userId: profile.identities[0].user_id
          };
          UserData.post(angular.toJson(token)).success(function(data) {

            console.log(data);
          });
          localStorage.setItem('profile', JSON.stringify(profile));
        })

      });

      // Posts user data to the datbase upon registration

      // UserData.post(angular.toJson(token)).success(function(data) {

      //   console.log(data);
      // })

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

        // UserData.post(angular.toJson(token)).success(function(data) {
          // console.log(data);
        // })
      });
    };

    //Logout function to remove token from user
    function logout() {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
      location.reload();
    };

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  };
})();