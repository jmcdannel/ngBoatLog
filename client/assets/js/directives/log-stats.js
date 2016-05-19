(function() {
  'use strict';

  angular.module('boatlogApp')
    .directive('logStats', function(UserLog) {
      return {
          restrict: 'E',
          templateUrl: 'templates/directive.log-stats.html',
          scope: {
            totals: '='
          },
          link: function($scope, $element) {

          }
      };
  });

})();
