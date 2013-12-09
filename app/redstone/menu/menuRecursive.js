/*
 * MenuRecursive (cwwRecursive)
 * Used in navigation menu tree
 */
define(['../directives', './menuTree'], function (directives) {
  'use strict';

  directives.directive('cwwRecursive', ['$compile', function($compile) {
    return {
      // allow all kinds of declarations in HTML
      restrict: 'EACM',
      // high priority so this compile function will be called before that of other directives
      priority: 100000,
      // ngRepeat requires compile function to modify DOM - tElement refers to <cww-recursive>
      compile: function(tElement) {
        // strip out <span cww-tree>
        var contents = tElement.contents().remove();
        var compiledContents;
        // executes cloned template with recursive compiling of cwwTree
        return function(scope, iElement) {
          // compile cwwTree if not already done
          if(!compiledContents) {
            compiledContents = $compile(contents);
          }
          // adds new compiled element with clone bound to scope
          iElement.append(compiledContents(scope, function(clone) { return clone; }));
        };
      }
    };
  }]);
});