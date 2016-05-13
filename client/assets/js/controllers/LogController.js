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
  .controller('LogController', function ($scope, $rootScope, UserLog, currentAuth) {

    $rootScope.pageTitle = 'Log';
    var log = new UserLog(currentAuth.uid);
    
    log.$loaded(function(runs) {
      $scope.runs = _.reverse(runs);
      $scope.totals = runs.getTotals();
    });


  });

  })();
