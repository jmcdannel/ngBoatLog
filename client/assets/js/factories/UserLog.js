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
        },
        getByYear: function(year) {
          var thisYear = new Date(2016,1,1);
          var runsByYear = _.filter(this.$list, function(o) {
            return (o.rundate > thisYear.getTime());
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
            console.log(d.getFullYear());
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
