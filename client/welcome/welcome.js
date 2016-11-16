var welcomeCtrl = function($scope) {
  $scope.how = "Have you ever wanted to learn about high frequency trading? What about combining the powers of technology available in Machine Learning to see if you have the winning formula to beat the stock market?";
  $scope.disclaimer = "*Don't Trade with our algorithms. This is for educational purposes only.*";
  $scope.about = "We are a team of software engineers who were fascinated by the idea of the machine learning capabilities available to us to capture possible predictions for everyday events. We were able to create a fullstack Javascript application using Node and neural networks to create a machine learning algorithm for stock trading."
}

angular.module('einstock.welcome', [
  'ngMaterial'
  ])
  .controller('welcomeController', welcomeCtrl)