(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('Run', ['$firebaseObject', 'Ref', 'USGSFlow',
    function($firebaseObject, Ref, USGSFlow) {
      // create a new service based on $firebaseArray
      var Runs = $firebaseObject.$extend({
        getFlow: function(date) {
          return USGSFlow.getFlow(this.usgsSite, this.usgsUnit, date);
        }
      });

      return function(section) {
        return new Runs(Ref.child('runs').child(section));
      }
    }
  ]);

})();
