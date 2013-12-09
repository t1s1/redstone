/*
 * Menu
 * Navigation menu for course
 */

define(['../directives', './menuTree', './menuRecursive', '../services/stateManager'], function (directives) {
  'use strict';

  directives.directive('cwwMenu', ['packageDirPath', function(packageDirPath) {
    return {
      controller: ['$scope', 'StateManager', function($scope, StateManager) {
        // call StateManager service to get outline (which loads and serves it)
        StateManager.getOutline().then(function(outline) {
          // assign outline to menu
          $scope.CourseOutline = outline;
        });
      }],
      templateUrl: packageDirPath+'menu/menu.html'
    };
  }]);
});