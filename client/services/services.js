// Services is where we're going to set the data manipulation for our entire web app, we may choose to modularize if this gets too crazy
(function() {
  'use strict'

  angular
    .module('einstock.services', [])
    .factory('Algorithm', Algorithm)

  Algorithm.$inject = ['$http'];
  function Algorithm($http) {
        return {
          post: function(data) {
            return $http.post('/api/data', data);
            // console.log(data); //just for testing purposes
          }
        }
      }

})();


