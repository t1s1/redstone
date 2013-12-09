/*
 * MenuTree (cwwTree)
 * Handles display of individual items in navigation menu
 */
define(['../directives', '../services/stateManager'], function (directives) {
  'use strict';

  directives.directive('cwwTree',  ['packageDirPath', function(packageDirPath) {
    return {
      controller: ['$scope', 'StateManager', function($scope, StateManager) {
        // sets selected item as current node
        $scope.setSelection = StateManager.setCurrent;
      }],
      // sets thisNode variable in menuTree.html to equal cwwTree, so the scope of this directive applies
      scope: {'thisNode': '=cwwTree'},
      templateUrl: packageDirPath+'menu/menuTree.html'
    };
  }]);
});