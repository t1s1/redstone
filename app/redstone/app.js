/*
 * Angular framework components loaded and referenced here
 * This is where RequireJS loads and defines the Angular app
 */
define([
  'angular',
  'angularAnimate', 
  'angularLocalStorage', 
  'angularCookies', 
  'angularResource',
  'angularTouch',
  'services',
  './services/index',
  /* add or remove functional modules below */
  './content/content',
  './menu/menu',
  './linearNav/linearNav',
  './title/title',
  './screenTitle/screenTitle'
], 
function (ng) {
  'use strict';
  // returns reference to main app by name, and all the injected dependencies
  return ng.module('app', [
    'ngAnimate',
    'LocalStorageModule',
    'ngCookies',
    'ngResource',
    'ngTouch',
    'app.services',
    'app.directives'
  ]);
});