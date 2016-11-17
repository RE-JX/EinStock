// Services is where we're going to set the data manipulation for our entire web app, we may choose to modularize if this gets too crazy
(function() {
  'use strict'

  angular
    .module('einstock.services', [])
    .factory('Algorithm', Algorithm)

  Algorithm.$inject = ['$http', '$location'];
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
  }

})();


