(function() {
  'use strict'

  angular.module('einstock.machine', [
      'ngMaterial'
    ])
    .controller('MachineController', MachineController)

  MachineController.$inject = ['$scope'];

  //Welcome controller for static welcome page
  function MachineController($scope) {
    $scope.about = "Machine learning is a type of artificial intelligence (AI) that provides computers with the ability to learn without being explicitly programmed. Machine learning focuses on the development of computer programs that can teach themselves to grow and change when exposed to new data.";
    $scope.typesummary = "Machine learning tasks are typically classified into three broad categories, depending on the nature of the learning signal or feedback available to a learning system. These are:"
    $scope.types = ["Supervised learning: The computer is presented with example inputs and their desired outputs, given by a teacher, and the goal is to learn a general rule that maps inputs to outputs.", "Unsupervised learning: No labels are given to the learning algorithm, leaving it on its own to find structure in its input. Unsupervised learning can be a goal in itself (discovering hidden patterns in data) or a means towards an end (feature learning).", "Reinforcement learning: A computer program interacts with a dynamic environment in which it must perform a certain goal (such as driving a vehicle), without a teacher explicitly telling it whether it has come close to its goal. Another example is learning to play a game by playing against an opponent."];

    $scope.methods = "";
  }
})();
