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
  .controller('RunEntryController', function (
    $scope,
    $rootScope,
    $firebaseArray,
    $firebaseObject,
    $state,
    $timeout,
    UserLog,
    Run,
    FoundationApi,
    currentAuth) {

    var run = null;
    $rootScope.pageTitle = 'Add Run';
    $scope.USGSUnit = 'cfs'; //default to CFS
    $scope.addRun = addRun;

    function addRun() {

      var runData = getRunData();
      console.log(runData);

      run = new Run($scope.section);

      run.$loaded(function() {
        if (run.$value === null) {
          angular.extend(run, runData);
          console.log(run);
          run.$save();
        }
        reset();
        $state.go('rivers');
      });
    }

    function getRunData() {
      var runData = {
        section: $scope.section,
        river: $scope.river,
        miles: $scope.miles,
        vertical: $scope.vertical
      };

      if ($scope.USGSFlowType === 'SiteID') {
        angular.extend(runData, {
          usgsUnit: $scope.USGSUnit,
          usgsSite: $scope.usgsID
        });
      } else if ($scope.USGSFlowType === 'Formula') {
        angular.extend(runData, {
          usgsUnit: $scope.USGSUnit,
          usgsFormula: $scope.usgsID
        });
      }

      console.log($scope.USGSFlowType, $scope.usgsID, $scope.USGSUnit);



      return runData;
    }

    function reset() {
      $scope.section = '';
      $scope.river = '';
      $scope.miles = '';
      $scope.vertical = '';
    }

  });

})();
