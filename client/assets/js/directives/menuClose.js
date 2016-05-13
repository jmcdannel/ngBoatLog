(function() {
  'use strict';

  angular.module('boatlogApp')
    .directive('menuClose', function() {
      return {
          restrict: 'AC',
          link: function($scope, $element) {
              $element.bind('click', function() {
                  var drawer = angular.element(document.querySelector('.mdl-layout__drawer'));
                  var overlay = angular.element(document.querySelector('.mdl-layout__obfuscator'));
                  if(drawer) {
                      drawer.toggleClass('is-visible');
                  }
                  if(overlay) {
                      overlay.toggleClass('is-visible');
                  }
              });
          }
      };
  });
  
})();
