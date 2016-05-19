(function() {
  'use strict';

  angular.module('boatlogApp')
    .directive('logTable', function(UserLog) {
      return {
          restrict: 'E',
          templateUrl: 'templates/directive.log-table.html',
          scope: {
            runs: '='
          },
          link: function($scope, $element) {
            // console.log($scope);
            // var log = new UserLog($scope.auth.uid, $scope.mode);
            //
            // log.$loaded(function(runs) {
            //   console.log('log loaded', runs);
            //   $scope.runs = _.reverse(runs);
            //   $scope.totals = runs.getTotals();
            // });
          }
      };
  });

})();
