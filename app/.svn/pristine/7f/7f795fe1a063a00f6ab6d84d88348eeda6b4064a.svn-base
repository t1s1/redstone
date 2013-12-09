/*
 * CourseOutlineJSON
 * Returns reference to course outline resource, in JSON format
 */
define(['../services'], function (services) {
  'use strict';
  
  services.factory('CourseOutlineJSON', ['$resource', function($resource) {
    // change this path if folder or file is renamed or moved
    return $resource('./content/courseOutline.json');
  }]);
});