/*
 * Comm
 * Communicates with server, or local storage if unavailable
 */

define(['../services', './SCORM_12'], function (services) {
  'use strict';
  
  services.service('Comm', ['localStorageService', 'SCORM_12', function(localStorageService, LMS) {
    // set to true when LMS is found
    var LMSAvailable = false;

    // bookmark to current screen
    function setLocation(screenId) {
      if(LMSAvailable) {
        LMS.doSetLocation(screenId);
        // commit to save
        LMS.doLMSCommit();
      }
      // use local storage
      else {
        saveData('loc', screenId);
      }
    }

    // get bookmarked location
    function getLocation() {
      var loc;
      if(LMSAvailable) {
        loc = LMS.doGetLocation();
      }
      // get from local storage
      else {
        loc = retrieveData('loc');
      }
      return loc;
    }

    // get information about student if available
    function getStudentData() {
      var studentDataObj = {};
      if(LMSAvailable) {
        studentDataObj = {
          id: LMS.doGetStudentId(),
          name: LMS.doGetStudentName()
        }
      }
      else {
        studentDataObj = {
          id: 'id not available', 
          name: 'name not available'
        }
      }
      return studentDataObj;
    }

    // save generic data to local storage
    function saveData(key, value) {
      if(localStorageService.isSupported) {
        localStorageService.add(key, value);
      }
      // use cookies
      else {
        localStorageService.cookie.add(key, value);
      }
    }

    // get generic data from local storage
    function retrieveData(key) {
      var value;
      if(localStorageService.isSupported) {
        value = localStorageService.get(key);
      }
      // use cookies
      else {
        value = localStorageService.cookie.get(key);
      }
      return value;
    }

    // first call to LMS, to see if it's there
    function initializeLMS() {
      if(LMS.doLMSInitialize() === 'true') {
        LMSAvailable = true;
        // change status right away - we don't want default of "not attempted"
        LMS.doSetLessonStatus("incomplete");
      }
      return LMSAvailable;
    }

    // on starting session with LMS
    function entry() {
      if(LMSAvailable) {
        return LMS.doGetEntry();
      }
    }

    // ending session with LMS
    function exit(status) {
      if(LMSAvailable) {
        if(status === "completed"){
          LMS.doExit("logout");
        } 
        // any other status means we may not be done
        else {
          LMS.doExit("suspend");
        }
        LMS.doSetLessonStatus(status);
      }
    }

    // last call to LMS, to clean up
    function finish() {
      if(LMSAvailable) {
        LMS.doLMSFinish();
      }
    }

    return {
      initLMS: function () {
        return initializeLMS();
      },
      setSessionData: function(data) {
        for (var prop in data) {
          saveData(prop, data[prop]);
        }
      },
      setLocation: function(screenId) {
        setLocation(screenId);
      },
      getLocation: function() {
        return getLocation();
      },
      getSessionData: function(key) {
        return retrieveData(key);
      },
      getStudentNameAndId: function() {
        return getStudentData();
      },
      getEntry: function() {
        return entry();
      },
      saveAndClose: function(screenId, completionStatus) {
        setLocation(screenId);
        exit(completionStatus);
        finish();
      }
    };
  }]);
});