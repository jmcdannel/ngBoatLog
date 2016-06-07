(function() {
  'use strict';

  angular.module('boatlogApp')
    .directive('riverList', function(UserLog) {
      return {
          restrict: 'E',
          templateUrl: 'templates/directive.river-list.html',
          scope: {
            rivers: '='
          },
          link: function($scope, $element) {
            
          }
      };
  });

})();
