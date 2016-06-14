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
  .controller('LogEditController', function (
    $scope,
    $rootScope,
    $state,
    $stateParams,
    LogEntry,
    currentAuth) {

    $rootScope.pageTitle = 'Edit Log Entry';
    $scope.entry = new LogEntry(currentAuth.uid, $stateParams.entry);
    $scope.entry.$loaded(function() {
      $scope.rundate = new Date($scope.entry.rundate);
    });

    $scope.saveEntry = saveEntry;

    //TODO: load flow if date is changed
    //TODO: load river data if rsection is changed
    function saveEntry() {
      $scope.entry.rundate = new Date($scope.rundate).getTime();
      $scope.entry.$save();
      $state.go('log.current');
    }

  });

})();
