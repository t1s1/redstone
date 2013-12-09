/*
 * CourseOutlineLoader
 * Loads course outline asynchronously
 */
define(['../services', './courseOutlineJSON'], function (services) {
  'use strict';
  
  services.factory('CourseOutlineLoader', ['CourseOutlineJSON', '$q', function(CourseOutlineJSON, $q) {
    return function() {
      // for asynchronous loading
      var loader = $q.defer();

      // get JSON as resource from CourseOutlineJSON service
      CourseOutlineJSON.get(
        function(CourseOutlineJSON) {
          // load JSON, and hand off 
          loader.resolve(CourseOutlineJSON);
        }, 
        function() {
          // never seen this
          loader.reject('Unable to fetch course outline');
        });
      // creates and returns new promise
      return loader.promise;
    };
  }]);
});