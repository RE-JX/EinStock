var welcomeCtrl = function($scope) {
  $scope.how = "Have you ever wanted to learn about high frequency trading? What about combining the powers of technology available in Machine Learning to see if you have the winning formula to beat the stock market?";
  $scope.disclaimer = "*Don't Trade with our algorithms. This is for educational purposes only.*";
}

angular.module('einstock.welcome', [
  'ngMaterial'
  ])
  .controller('welcomeController', welcomeCtrl)