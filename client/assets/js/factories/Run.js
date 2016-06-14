(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('Run', ['$firebaseObject', 'Ref', 'USGSFlow',
    function($firebaseObject, Ref, USGSFlow) {
      // create a new service based on $firebaseArray
      var Runs = $firebaseObject.$extend({
        getFlow: function(date) {
          if (this.usgsSite) {
            return USGSFlow.getFlow(this.usgsSite, this.usgsUnit, {date: date});
          } else if (this.usgsFormula) {
            return USGSFlow.calculateFlow(this.usgsFormula, this.usgsUnit, {date: date});
          }
        },
        getChart: function() {
          console.log(this);
          if (this.usgsSite) {
            return USGSFlow.getFlow(this.usgsSite, this.usgsUnit, {period: 'P1W', range: true});
          } else if (this.usgsFormula) {
            return USGSFlow.calculateFlow(this.usgsFormula, this.usgsUnit, {period: 'P1W', range: true});
          }
        }
      });

      return function(section) {
        return new Runs(Ref.child('runs').child(section));
      }
    }
  ]);

})();
