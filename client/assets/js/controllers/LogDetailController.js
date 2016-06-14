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
  .controller('LogDetailController', function (
    $scope,
    $rootScope,
    $stateParams,
    LogEntry,
    Run,
    currentAuth) {

    $rootScope.pageTitle = 'View Log Entry';
    $scope.entry = new LogEntry(currentAuth.uid, $stateParams.entry);
    $scope.entry.$loaded(entryLoaded);

    function entryLoaded() {
      $scope.rundate = new Date($scope.entry.rundate);
      $scope.run = new Run($scope.entry.section);
      $scope.run.$loaded(runLoaded);
    }

    function runLoaded() {
      $scope.run.getChart().then(function(data) {

        var flows = _.map(data, function(o) { return o.value; });
        var dates = _.map(data, function(o) { return o.dateTime; });
        var labels = [];
        for(var idx = 0, max = dates.length; idx < max; idx++) {
          var d = new Date(dates[idx]);
          labels.push(d.getDate());
        }
        labels = _.uniq(labels);
        console.log(flows, labels);
        $scope.chartData = data;
        $scope.labels = labels;
        $scope.series = ['Current Flow'];
        $scope.data = [
          flows
        ];
      });

    }

  });

})();
