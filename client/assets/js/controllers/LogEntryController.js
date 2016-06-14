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
    Runs,
    FoundationApi,
    currentAuth) {

    var run = null;
    var sectionTimer = false;

    var runs = new Runs();
    var runNames = [];

    runs.$loaded(function() {

      _.each(runs, function(run) {
        runNames.push(run.$id);
      });
      $scope.runs = runNames;
      console.log(runNames);
    });

    $rootScope.mainCssClass = 'blur-bg-1';

    $scope.rundate = new Date();
    $scope.rundate.setHours(12);
    $scope.rundate.setMinutes(0);
    $scope.rundate.setSeconds(0);
    $scope.rundate.setMilliseconds(0);
    $scope.runtime = $scope.rundate;
    $rootScope.pageTitle = 'Add Log Entry';
    $scope.days = '1';
    $scope.numruns = '1';
    $scope.addRun = addRun;
    $scope.$watch('section', loadRun);
    $scope.$watch('rundate', loadFlow);
    $scope.$watch('runtime', loadFlow);

    // gives another movie array on change
    $scope.updateRuns = function(typed){
      var filteredRuns = _.filter(runNames, function(runName) {
        return (runName.indexOf(typed) >= 0);
      });
      $scope.runs = filteredRuns;
      console.log('filteredRuns', filteredRuns);

        // MovieRetriever could be some service returning a promise
        // $scope.newmovies = MovieRetriever.getmovies(typed);
        // $scope.newmovies.then(function(data){
        //   $scope.movies = data;
        // });
        // runs.$loaded(function() {
        //   var filteredRuns = _.filter(runs, function(run) {
        //     console.log(un.$id, typed, run.$id.indexOf(typed));
        //     return (run.$id.indexOf(typed) > 0);
        //   });
        //$scope.runs.$loaded;
    }

    //TODO: debounce
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

    //TODO: debounce
    function loadFlow() {
      if (run === null) {
        return;
      }
      var date = new Date($scope.rundate);
      date.setSeconds(0);
      date.setMilliseconds(0);
      date.setMinutes($scope.runtime.getMinutes());
      date.setHours($scope.runtime.getHours());
      run.getFlow($scope.rundate).then(function(result) {
        $scope.flow = result.flow;
        FoundationApi.publish('usgs-notifications', 'clearall');
        FoundationApi.publish('usgs-notifications', {
          content: 'Flow as of ' + result.datetime.toLocaleString()
        });
      });
    }

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
        notes: $scope.notes || null
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
