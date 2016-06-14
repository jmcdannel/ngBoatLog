(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('LogEntry', ['$firebaseObject', 'Ref', 'USGSFlow',
    function($firebaseObject, Ref, USGSFlow) {
      // create a new service based on $firebaseArray
      var LogEntry = $firebaseObject.$extend({

      });

      return function(userID, entryID) {
        return new LogEntry(Ref.child('user_logs').child(userID).child(entryID));
      }
    }
  ]);

})();
