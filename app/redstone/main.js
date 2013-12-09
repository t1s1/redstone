/*
 * MAIN
 *
 * Everything is loaded through here, using RequireJS
 * Should not need to be edited, except when adding new framework resources
 * When you do, make sure you add a shim (see others for examples) for non-Require js
 * Also, app.js will need to be edited in order to use angular plug-ins
 *  
 */
require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    angular: '../bower_components/angular/angular',
    angularAnimate: '../bower_components/angular-animate/angular-animate',
    angularLocalStorage: '../bower_components/angular-local-storage/angular-local-storage',
    angularCookies: '../bower_components/angular-cookies/angular-cookies',
    angularResource: '../bower_components/angular-resource/angular-resource',
    angularTouch: '../bower_components/angular-touch/angular-touch',
  },
  // shims add RequireJS module wrappers to non-Require JS files
  shim: {
    angular: {
      exports: 'angular'
    },
    angularAnimate: {
      deps: ['angular']
    },
    angularLocalStorage: {
      deps: ['angular']
    },
    angularCookies: {
      deps: ['angular']
    },
    angularResource: {
      deps: ['angular']
    },
    angularTouch: {
      deps: ['angular']
    }
  }
});

// loads redstoneApp.js module, which gives Angular app reference
require(['jquery', 'angular', 'app'], function ($, ng, app) {
  'use strict';
  // using jQuery to make sure we're ready to go
  $(function() {
    // bootstraps to manually start angular app, gives it root and module(s)
    ng.bootstrap(document, ['app']);
  });  
});
