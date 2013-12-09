/*
* StateManager
* Handles state of navigation/progress
*/
define(['../services', './courseOutline', './comm'], function (services) {
  'use strict';

  services.service('StateManager', ['CourseOutline', 'Comm', '$rootScope', '$location', '$window', '$q', function(CourseOutline, Comm, $rootScope, $location, $window, $q) {
    var courseOutline;
    // stores visibly selected menu item
    var selectedNode;
    // stores current node (could be sub of selected)
    var currentNode;
    // can be set to "complete"
    var completionStatus = 'incomplete';
    // this is set to true when we try to establish communication, so we don't keep trying
    var LMSCommInitialized = false;
    // this may be loaded from external JSON file someday...
    var config = {
      markCompleteOnFinalScreen: true
    }

    // handles user closing the window
    $window.addEventListener('unload', function() {
      Comm.saveAndClose(currentNode.id, completionStatus);
    });

    // initialize LMS, if present
    function initLMS() {
      if(!LMSCommInitialized) {
        // initialize LMS, then do something if necessary
        if(Comm.initLMS()) {
          //console.log('name: '+Comm.getStudentNameAndId().name);
          //console.log('entry: '+Comm.getEntry());
        }
        else {
          // no LMS, but hey we tried
        }
        LMSCommInitialized = true;
      }
      return LMSCommInitialized;
    }

    // set selected node and set current node
    function setSelection(newNode) {

      // recursively check parents until we find one that can show selection
      function setSelectedOnParent(thisNode) {
        // maxDepth cannot show selection, but one above it can
        if (thisNode.level < thisNode.maxDepth) {
          selectedNode = thisNode;
        }
        // go up a level if possible
        else if (thisNode.parent) {
          setSelectedOnParent(thisNode.parent);
        }
      }

      // if this node is not currently selected
      if(currentNode !== newNode) {
        currentNode = newNode;
        // clear old selection flag
        if(selectedNode) {
          selectedNode.selected = false;
        }
        // find node to show selection on
        setSelectedOnParent(currentNode);
      }

      // set flag
      selectedNode.selected = true;
      // set page location
      $location.path('/'+currentNode.id);
      // store location
      Comm.setLocation(currentNode.id);

      return courseOutline;
    }

    // find the first node of the outline to select and display

    function setInitialNode() {
      var storedLocation = Comm.getLocation();
      var initialNode;

      // if there is a storedLocation, set initialNode to it
      initialNode = storedLocation && findNodeById(storedLocation);
      // initialNode might be undefined: if so, set it to first page of content
      initialNode = !initialNode ? courseOutline.content[0] : initialNode;

      return initialNode;
    }

    // given the screenId, get reference to node
    function findNodeById(screenId) {
      var node;
      var found = false;

      // search recursively
      function searchOutline(outlineContentLevel, levelNum) {
        var content = outlineContentLevel.content;
        // dive in
        if (!found) {
          for (var i = 0; i <= content.length - 1; i++) {
            //need to drop one more level?
            if(content[i].content !== undefined) {
              searchOutline(content[i], levelNum+1);
            }
            // is this the correct one?
            if (content[i].id === screenId) {
              node = content[i];
              // yes it is
              found = true;
            }
          }
          // move up a level after looping through this one
          levelNum--;
        }
      }

      if(courseOutline !== undefined) { searchOutline(courseOutline, 0); }

      return node;
    }

    // get the next node, which may mean going into the next lesson, for example
    function findNext() {
      // initialize to where we are
      var thisNode = currentNode;

      // looks for next node, recursively searching up the tree
      function recurseToFindNext(node, thisNode) {
        // if there is no parent node
        if(!node.parent) {
          // means no sibling, so no next node - this is it
          return thisNode;
        }
        // if there is a parent node, and we're the last node
        if(!node.parent.content[node.index +1]) {
          // move up a level to check next highest branch
          thisNode = recurseToFindNext(node.parent, thisNode);
        }
        // if we're not the last node
        else {
          // just set this to the next node
          thisNode = node.parent.content[node.index+1];
        }
        return thisNode;
      }

      // if there are children to this node
      if(thisNode.content !== undefined) {
        // we want to go to the first one of them
        setSelection(thisNode.content[0]);
      }
      // we are the last children
      else {
        // set to the next node
        thisNode = recurseToFindNext(thisNode, thisNode);
        setSelection(thisNode);
      }
    }
    
    // get the previous node
    function findPrevious() {
      // initialize to where we are
      var thisNode = currentNode;

      // searches for the the last node of the deepest branch (useful when moving back)
      function recurseToFindLastOfDeepest(node, thisNode) {
        // if there is content
        if(node.content !== undefined) {
          // recurse into the last node
          thisNode = recurseToFindLastOfDeepest(node.content[node.content.length-1], thisNode);
        }
        // no content
        else {
          // no point in going on, we're done
          thisNode = node;
        }
        return thisNode;
      }

      // if this is first node
      if(thisNode.index === 0) {
        // we want the parent node (e.g. intro)
        if(thisNode.parent !== undefined) {
          thisNode = thisNode.parent;
        }
        // uh-oh, we're at the top level
        else {
          // drop to last child of previous branch and check that
          thisNode = recurseToFindLastOfDeepest(thisNode[thisNode.index-1], thisNode);
        }
      }
      // not the first
      else {
        // just go back one and check
        thisNode = recurseToFindLastOfDeepest(thisNode.parent.content[thisNode.index-1], thisNode);
      }
      setSelection(thisNode);
    }

    // returns boolean indicating if we are on the first node of the course
    function onFirst() {
      var first = false;

      // initialize to where we are
      var thisNode = currentNode;

      // if we get something
      if(thisNode !== undefined) {
        // if this is the first node
        if(thisNode.index === 0) {
          // and we're at the top level
          if(!thisNode.parent.id) {
            // must be the first node
            first = true;
          }
        }
      }
      return first;
    }


    // returns boolean indicating if we are on the last node of the course
    // also, marks as complete when on last screen
    function onLast() {
      var last = false;
      // initialize to where we are
      var thisNode = currentNode;

      // checks to see if this is the very last node in the course
      function isLastCheck(node) {
        var isLast;

        // if we are at the top level
        if(!node.parent) {
          // we're done, because we already know there is no content
          isLast = true;
        }
        else {
          // if there is a parent node, and we're the last node at this level
          if(!node.parent.content[node.index +1]) {
            // we must recurse up a level
            isLast = isLastCheck(node.parent);
          }
          // not the last node
          else {
            isLast = false;
          }
        }
        return isLast;
      }
      
      // if we get something
      if(thisNode !== undefined) {
        // if there is content
        if(thisNode.content !== undefined) {
          // content always means there are more nodes after this one
          last = false;
        }
        // no content could mean we're at the last node
        else {
          // if not, see if this is this the last one?
          if(isLastCheck(thisNode)) {
            last = true;
            // if we are supposed to mark as complete when on last screen, now is the time
            if(config.markCompleteOnFinalScreen) {
              markComplete();
            }
          }
        }
      }
      return last;
    }

    // marks complete when called
    function markComplete() {
      completionStatus = 'completed';
    }


    return {
      init: function() {
        // we need to make sure the course outline is loaded AND arranged
        return CourseOutline.getOutline().then(function(outline) {
          // Check to see if courseOutline is already set
           if(!courseOutline) {
            // This is thefirst time init has been called, so initialize everything
            courseOutline = outline;
            return setSelection(setInitialNode(initLMS()));
          }
          // init has been run before, just hand off outline object
          else {
            return courseOutline;
          }
          
        });
      },
      getOutline: function() {
        var deferred = $q.defer();

        if (!courseOutline) {
          return this.init().then(function(outline) {
            courseOutline = outline;

            return courseOutline;
          });
        }
        else {
          deferred.resolve(courseOutline);
          return deferred.promise;
        }
        
      },
      setCurrent: function(node) {
        setSelection(node);
      },
      getCurrent: function() {
        return this.getOutline().then(function(outline) {
          return currentNode;
         });
      },
      findPreviousNode: function() {
        findPrevious();
      },
      findNextNode: function() {
        findNext();
      },
      onFirstNode: function() {
        return onFirst();
      },
      onLastNode: function() {
        return onLast();
      },
      getNodeById: function(screenId) {
        return findNodeById(screenId);
      }
    };
  }]);
});