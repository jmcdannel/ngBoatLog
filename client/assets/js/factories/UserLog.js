(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('UserLog', ['$firebaseArray', 'Ref',
    function($firebaseArray, Ref) {
      // create a new service based on $firebaseArray
      var UserLog = $firebaseArray.$extend({
        getTotals: function() {
          return  {
            days: _.sumBy(this.$list, function(o) { return parseInt(o.days); }),
            runs: _.sumBy(this.$list, function(o) { return parseInt(o.numruns); }),
            miles: _.sumBy(this.$list, function(o) { return parseInt(o.miles); }),
            feet: _.sumBy(this.$list, function(o) { return parseInt(o.vertical); }),
          };
        }
      });

      return function(userID) {
        return new UserLog(Ref.child('user_logs').child(userID).orderByChild('rundate'));
      }
    }
  ]);

})();
