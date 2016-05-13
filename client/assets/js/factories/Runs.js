(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('Runs', ['$firebaseArray', 'Ref',
    function($firebaseArray, Ref) {
      // create a new service based on $firebaseArray
      var Runs = $firebaseArray.$extend({

      });

      return function() {
        return new Runs(Ref.child('runs'));
      }
    }
  ]);

})();
