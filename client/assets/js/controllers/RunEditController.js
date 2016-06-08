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
  .controller('RunEditController', function (
    $scope,
    $rootScope,
    $state,
    $stateParams,
    Run,
    FoundationApi,
    currentAuth) {

    $scope.run = new Run($stateParams.run);;
    $rootScope.pageTitle = 'Edit Run';
    $scope.USGSUnit = 'cfs'; //default to CFS
    $scope.saveRun = saveRun;

    $scope.run.$loaded(function() {
      if ($scope.run.usgsSite) {
        $scope.USGSFlowType = 'SiteID';
        $scope.USGSUnit = $scope.run.usgsUnit;
        $scope.usgsValue = $scope.run.usgsSite;
      } else if ($scope.run.usgsFormula) {
        $scope.USGSFlowType = 'Formula';
        $scope.USGSUnit = $scope.run.usgsUnit;
        $scope.usgsValue = $scope.run.usgsFormula;
      } else {
        $scope.USGSFlowType = '';
      }
    });

    console.log($stateParams);

    function saveRun() {

      if ($scope.USGSFlowType === 'SiteID') {
        $scope.run.usgsUnit = $scope.USGSUnit;
        $scope.run.usgsSite = $scope.usgsValue;
      } else if ($scope.USGSFlowType === 'Formula') {
        $scope.run.usgsUnit = $scope.USGSUnit;
        $scope.run.usgsFormula = $scope.usgsValue;
      }
      $scope.run.$save();
      $state.go('rivers');

    }

  });

})();
