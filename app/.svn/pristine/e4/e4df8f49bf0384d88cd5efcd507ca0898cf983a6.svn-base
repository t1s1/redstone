/*
 * Title
 * Displays course title
 */

define(['../directives', '../services/courseOutline'], function (directives) {
  'use strict';

  directives.directive('cwwScreenTitle', ['packageDirPath', function(packageDirPath) {
    return {
      controller: ['$scope', '$location', 'StateManager', 'CourseOutline', function($scope, $location, StateManager, CourseOutline) {
        var screenId;
        var node;

        // watch when value of location changes and change content to match
        $scope.$watch(function pathWatch() {
          return $location.path();
        },
        function pathWatchAction(fileName) {
          // extract screenId from path
          screenId = fileName.substring(fileName.lastIndexOf('/')+1);
          node = StateManager.getNodeById(screenId);

          StateManager.getCurrent().then(function(currentNode) {
            $scope.screenTitle = currentNode.title;
          });       
        });
        

      }],
      templateUrl: packageDirPath+'screenTitle/screenTitle.html'
    };
  }]);
});