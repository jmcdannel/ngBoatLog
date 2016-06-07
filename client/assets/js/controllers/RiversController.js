(function() {
  'use strict';

/**
 * @ngdoc function
 * @name boatlogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the boatlogApp
 */
angular.module('boatlogApp')
  .controller('RiversController', function ($scope, $rootScope, Runs, currentAuth) {

    $rootScope.pageTitle = 'Rivers';
    $scope.riverList = new Runs();

  });

})();
