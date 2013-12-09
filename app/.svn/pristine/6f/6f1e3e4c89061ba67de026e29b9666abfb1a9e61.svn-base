/*
 * CourseOutline
 * Gets course outline, stores and manipulates result
 */
define(['../services', './courseOutlineLoader'], function (services) {
  'use strict';
  
  services.service('CourseOutline', ['CourseOutlineLoader', function(CourseOutlineLoader) {
    var courseOutline;
    // set this to determine the deepest level to be shown
    var maxDepth = 1;

    // creates object from loaded JSON outline, and adds properties
    function iterateOutline(outlineContentLevel, levelNum) {
      var content = outlineContentLevel.content;

      for (var i = 0; i <= content.length - 1; i++) {
        // if there is a content node
        if(content[i].content !== undefined) {
          // we can drop down a level and iterate that too
          iterateOutline(content[i], levelNum+1);
        }
        // store level of this node
        content[i].level = levelNum;
        // local reference
        content[i].maxDepth = maxDepth;
        // "selected" shows which is currently active
        content[i].selected = false;
        // store reference to parent
        content[i].parent = outlineContentLevel;
        // store index for linear navigation
        content[i].index = i;
      }
      // go back up a level now that we're done with this one
      levelNum--;
    }

    return {
      getOutline: function() {
        return new CourseOutlineLoader().then(function(outline) {
          iterateOutline(outline, 0);
          // store local copy
          courseOutline = outline;
          return courseOutline;
        });
      }
    };
  }]);
});