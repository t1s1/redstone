/*
 * Title
 * Displays course title
 */

define(['../directives', '../services/courseOutline'], function (directives) {
  'use strict';

  directives.directive('cwwTitle', ['packageDirPath', function(packageDirPath) {
    return {
      controller: ['$scope', 'StateManager', function($scope, StateManager) {
        StateManager.getOutline().then(function(outline) {
          $scope.title = outline.title;
        });
      }],
      templateUrl: packageDirPath+'title/title.html'
    };
  }]);
});