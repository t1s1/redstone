/*
 * LinearNav
 * Handles Back/Next navigation
 */

define(['../directives', '../services/stateManager'], function (directives) {
  'use strict';

  directives.directive('cwwLinearNav', ['packageDirPath', function(packageDirPath) {
    return {
      controller: ['$scope', 'StateManager', function($scope, StateManager) {

        $scope.NextDisabled = function() {
          return StateManager.onLastNode();
        };

        $scope.BackDisabled = function() {
          return StateManager.onFirstNode();
        };

        $scope.Next = function() {
          StateManager.findNextNode();
        };

        $scope.Back = function() {
          StateManager.findPreviousNode();
        };

      }],
      templateUrl: packageDirPath+'linearNav/linearNav.html'
    };
  }]);
});