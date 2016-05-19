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
  .controller('HomeController', function ($scope, $rootScope, UserLog, currentAuth) {

    $rootScope.pageTitle = 'Home';

    $scope.isLoggedIn = (currentAuth !== null);
    $scope.currentAuth = currentAuth;
    if ($scope.isLoggedIn) {
      var log = new UserLog(currentAuth.uid);

      log.$loaded(function(runs) {
        $scope.runs = runs.getLast(5);
        $scope.totals = runs.getTotals();
      });


    }

  });

  })();
