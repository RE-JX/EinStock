// Services is where we're going to set the data manipulation for our entire web app, we may choose to modularize if this gets too crazy
(function() {
  'use strict'

  angular
    .module('einstock.services', [])
    .factory('Algorithm', Algorithm)
    .factory('DashboardData', DashboardData)
    .factory('UserData', UserData)


  Algorithm.$inject = ['$http', '$location'];
  DashboardData.$inject = ['$http'];

  function Algorithm($http, $location) {
    return {
      post: function(data) {
        return $http.post('/api/data/knn', data);
        // console.log(data); //just for testing purposes
      },
      redirect: function() {
        $location.path('/dashboard')
      }
    }
  };

  function DashboardData($http) {
    return {
      get: function(data) {
        return $http.get('/api/data/knn', data);
      }
    }
  };

  function UserData($http) {
    return {
      post: function(data) {
        return $http.post('/api/user', data);
      }
    }
  };

})();


