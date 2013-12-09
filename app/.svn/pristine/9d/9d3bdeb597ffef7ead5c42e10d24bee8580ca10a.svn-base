/*
 * Content
 * Handles loading of course content
 */

define(['../directives'], function (directives) {
  'use strict';

  directives.directive('cwwContent', ['packageDirPath', function(packageDirPath) {
    return {
      controller: ['$scope', '$location', function($scope, $location) {

        // watch when value of location changes and change content to match
        $scope.$watch(function pathWatch() {
          return $location.path();
        },
        function pathWatchAction(fileName) {
          // if we get a value
          if(fileName !== undefined && fileName !== '') {
            // create relative path from it and assign
            $scope.screenFile = './content/'+fileName+'.html';
          }
          // no value? set it to nothing
          else {
            $scope.screenFile = '';
          }
          
        });
      }],
      templateUrl: packageDirPath+'content/content.html'
    };
  }]);
});