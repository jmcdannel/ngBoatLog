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
    USGSFlow,
    Ref,
    FoundationApi,
    currentAuth) {

    var run = null;

    $scope.rundate = new Date();
    $rootScope.pageTitle = 'Add Log Entry';
    $scope.days = '1';
    $scope.numruns = '1';

    var sectionTimer = false;
    $scope.$watch('section', function(){
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
    });

    $scope.$watch('rundate', loadFlow);

    function loadFlow() {
      if (run === null) {
        return;
      }
      run.getFlow($scope.rundate).then(function(result) {
        $scope.flow = result.flow;
        console.log(result.datetime, result.flow);
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

    $scope.addRun = function() {

      var runData = {
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

      var log = new UserLog(currentAuth.uid);
      log.$add(runData);


      Ref.child('runs').child(runData.section).once('value', function(snapshot) {

        if(snapshot.val() === null) {
          snapshot.ref().set({
            river: runData.river,
            miles: runData.miles,
            vertical: runData.vertical
          });

        }
      });

      $scope.rundate = '';
      $scope.section = '';
      $scope.river = '';
      $scope.days = '1';
      $scope.numruns = '1';
      $scope.miles = '';
      $scope.vertical = ''
      $scope.flow = ''
      $scope.notes = '';

      $state.go('log');

    };
  });

})();
