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
  .controller('LogController', function ($scope, $rootScope, $state, $stateParams, UserLog, currentAuth) {

    $rootScope.pageTitle = 'Log';
    $scope.year = $stateParams.year;

    var log = new UserLog(currentAuth.uid);

    log.$loaded(function() {
      if ($scope.year === 'All') {
        $scope.runs = _.reverse(log);
      } else {
        $scope.runs = log.getByYear($scope.year);
      }

      $scope.totals = log.getTotals($scope.year);
      $scope.years = log.getYears();
    });


  });

  })();
