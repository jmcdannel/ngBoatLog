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
  .controller('LogEntryController', function (
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
        var sectionTimer = false;

    $scope.rundate = new Date();
    $rootScope.pageTitle = 'Add Log Entry';
    $scope.days = '1';
    $scope.numruns = '1';
    $scope.addRun = addRun;
    $scope.$watch('section', loadRun);
    $scope.$watch('rundate', loadFlow);

    function loadRun() {
        if(sectionTimer){
          $timeout.cancel(sectionTimer)
        }
        sectionTimer = $timeout(function(){
          if ($scope.section) {
            run = new Run($scope.section);

            run.$loaded(function(run) {
              if (run.$value === null) {
                return;
              }
              //load run properties
              $scope.miles = run.miles;
              $scope.vertical = run.vertical;
              $scope.river = run.river;
              //load run flow
              loadFlow();
            });
          }
        }, 250);
    }

    function loadFlow() {
      if (run === null) {
        return;
      }
      var date = $scope.rundate;
      date.setSeconds(0);
      date.setMilliseconds(0);
      date.setMinutes(0);
      run.getFlow($scope.rundate).then(function(result) {
        $scope.flow = result.flow;
        FoundationApi.publish('usgs-notifications', 'clearall');
        FoundationApi.publish('usgs-notifications', {
          content: 'Flow as of ' + result.datetime.toLocaleString()
        });
      });
    }

    // $scope.section = 'asdf';
    // $scope.river = 'asdf';
    // $scope.days = '1';
    // $scope.numruns = '1';
    // $scope.miles = '1';
    // $scope.vertical = '1'
    // $scope.flow = '12'
    // $scope.notes = 'asdf';

    function addRun() {

      var runData = getRunData();

      var log = new UserLog(currentAuth.uid); //TODO: change to log entry factory
      log.$add(runData);

      if (run.$value === null) {
        run.river = runData.river;
        run.miles = runData.miles;
        run.vertical = runData.vertical;
        run.$save();
      }
      reset();
      $state.go('log');
    }

    function getRunData() {
      return {
        rundate: new Date($scope.rundate).getTime(),
        section: $scope.section,
        river: $scope.river,
        days: $scope.days,
        numruns: $scope.numruns,
        miles: $scope.miles,
        vertical: $scope.vertical,
        flow: $scope.flow,
        notes: $scope.notes || null,
        timestamp: Firebase.ServerValue.TIMESTAMP
      };
    }

    function reset() {
      $scope.rundate = '';
      $scope.section = '';
      $scope.river = '';
      $scope.days = '1';
      $scope.numruns = '1';
      $scope.miles = '';
      $scope.vertical = ''
      $scope.flow = ''
      $scope.notes = '';
    }

  });

})();
