(function() {
  'use strict';

/**
 * @ngdoc function
 * @name boatlogApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the boatlogApp
 */
angular.module('boatlogApp')
  .controller('HomeController', function ($scope, $rootScope, $firebaseArray, currentAuth) {

    $rootScope.pageTitle = 'Home';

  });

  })();
