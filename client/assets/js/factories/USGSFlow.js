(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('USGSFlow', function($http, $q) {

      var flow = null;
      function _getFlow(siteId, unitType, date) {
        var defered = $q.defer();
        var unitParam = (unitType === 'cfs') ? '00060' : '00065';
        date.setSeconds(0);
        date.setMilliseconds(0);
        date.setHours(12);
        date.setMinutes(0);
        var startDate = date;
        date.setMinutes(15);
        var endDate = date;


        $http({
          url: 'http://waterservices.usgs.gov/nwis/iv/',
          method: 'GET',
          params: {
            format: 'json',
            site: siteId,
            parameterCd: unitParam,
            startDT: startDate.toISOString(),
            endDT: endDate.toISOString()
          }
        }).success(function(data) {
          flow = data.value.timeSeries[0].values[0].value[0];

          defered.resolve({
            flow: flow.value,
            datetime: new Date(flow.dateTime)
          });

        });
        return defered.promise;
      }

      function _calcFlow(formula, unitType, date) {
        var defered = $q.defer();
        var formulaParts = formula.split(' ');
        var sites = [], operators = [];

        formulaParts.forEach(function(part){
          if (part === '-' || part === '+') {
            operators.push(part);
          } else {
            sites.push(_getFlow(part, unitType, date));
          }
        });

        $q.all(sites).then(function(siteFlows) {
          var operatorIdx = 0;
          var initialSiteFlow = siteFlows[0];
          var calculatedFlow = initialSiteFlow.flow;
          var currentOperator;
          siteFlows.shift();
          
          siteFlows.forEach(function(site) {
            currentOperator = operators[operatorIdx];
            if (currentOperator === '-') {
              calculatedFlow -= site.flow;
            } else if (currentOperator === '+') {
              calculatedFlow += site.flow;
            }
          });

          defered.resolve({flow: calculatedFlow, datetime: initialSiteFlow.datetime});
        });
        return defered.promise;
      }

      return {
        getFlow: _getFlow,
        calculateFlow: _calcFlow
      };

    });

})();
