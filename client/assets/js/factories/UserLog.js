(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('UserLog', ['$firebaseArray', 'Ref',
    function($firebaseArray, Ref) {
      // create a new service based on $firebaseArray
      var UserLog = $firebaseArray.$extend({

        getTotals: function(year) {
          var list = (year === 'All') ? this.$list : this.getByYear(year);
          return  {
            days: _.sumBy(list, function(o) { return parseInt(o.days); }),
            runs: _.sumBy(list, function(o) { return parseInt(o.numruns); }),
            miles: _.sumBy(list, function(o) { return parseInt(o.miles); }),
            feet: _.sumBy(list, function(o) { return parseInt(o.vertical); }),
          };
        },

        getByYear: function(year) {
          var runsByYear = _.filter(this.$list, function(o) {
            var runDate = new Date(o.rundate);
            return (runDate.getFullYear() == year);
          });
          return _.reverse(runsByYear);
        },

        getLast(count) {
          return _.take(this.$list, count);
        },

        getYears: function() {
          var years = [];
          _.each(this.$list, function(o) {
            var d = new Date(o.rundate);
            years.push(d.getFullYear());
          });
          return _.reverse(_.uniq(years));
        }

      });

      return function(userID) {
        return new UserLog(Ref.child('user_logs').child(userID)
          .orderByChild('rundate'));
      }
    }
  ]);

})();
