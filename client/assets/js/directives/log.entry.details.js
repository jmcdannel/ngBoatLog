(function() {
  'use strict';

  angular.module('boatlogApp')
    .directive('logEntryDetails', function(UserLog) {
      return {
          restrict: 'E',
          templateUrl: 'templates/directive.log.entry.details.html',
          scope: {
            entry: '=',
            run: '='
          },
          link: function($scope, $element) {

          }
      };
  });

})();
