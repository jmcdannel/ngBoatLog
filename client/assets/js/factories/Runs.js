(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('Runs', ['$firebaseArray', 'Ref', 'USGSFlow',
    function($firebaseArray, Ref, USGSFlow) {
      // create a new service based on $firebaseArray
      var Runs = $firebaseArray.$extend({

      });

      return function() {
        var runs = new Runs(Ref.child('runs'));
        USGSFlow.loadFlows(runs);
        return runs;
      }
    }
  ]);

})();
