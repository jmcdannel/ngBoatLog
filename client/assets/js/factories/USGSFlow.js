(function() {
  'use strict';
  angular.module('boatlogApp')
    .factory('USGSFlow', function($http, $q, $firebaseObject, Ref) {

      var USGS_API_URL = 'http://waterservices.usgs.gov/nwis/iv/';
      var flow = null;
      var lastImport = $firebaseObject(Ref.child('usgsimport'));

      function _loadFlows(runs) {
        lastImport.$loaded(function() {
          if (_isExpired()) {
            console.log('Log expired on: ', new Date(lastImport.$value));
            //TODO: refactor into single request
            runs.$loaded(function(runs) {
              _.each(runs, function(run, idx) {
                if (run.usgsSite) {
                  _getFlow(run.usgsSite, run.usgsUnit).then(function(result) {
                    run.flow = result.flow;
                    run.flowUpdated = result.datetime.getTime();
                    runs.$save(run);
                  });
                } else if (run.usgsFormula) {
                  _calcFlow(run.usgsFormula, run.usgsUnit).then(function(result) {
                    run.flow = result.flow;
                    run.flowUpdated = result.datetime.getTime();
                    runs.$save(run);
                  });
                }
              });

              lastImport.$value = new Date().getTime();
              lastImport.$save();

            });
          }
        });
      }

      function _isExpired() {
        var now, lastUpdated, expiry;
        //return true;
        console.log('lastImport', new Date(lastImport.$value));
        if (!lastImport.$value) {
          return true;
        }

        now = new Date();
        lastUpdated = new Date(lastImport.$value);
        expiry = 1000*60*15; //15 min

        return (now.getTime() - lastUpdated.getTime() > expiry);
      }

      function _getFlow(siteId, unitType, options) {
        var defered = $q.defer();
        var options = options || {};
        var period = options.period || 'PT2H';
        var params = {
          format: 'json',
          site: siteId,
          parameterCd: _getUnitParam(unitType)
        };
        if (options.date) {
          angular.extend(params, _getDateRange(options.date));
        } else {
          angular.extend(params, { period: period });
        }

        var handleResponse = function(data) {
          var flows = data.value.timeSeries[0].values[0].value;

          if (options.range) {
            defered.resolve(flows);
          } else {
            defered.resolve({
              flow: flows[flows.length-1].value,
              datetime: new Date(flows[flows.length-1].dateTime)
            });
          }


        }

        $http({
          url: USGS_API_URL,
          method: 'GET',
          params: params
        }).success(handleResponse);

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
          var calculatedFlow =  parseFloat(initialSiteFlow.flow);
          var currentOperator;
          siteFlows.shift();

          siteFlows.forEach(function(site) {
            currentOperator = operators[operatorIdx];
            if (currentOperator === '-') {
              calculatedFlow -= parseFloat(site.flow);
            } else if (currentOperator === '+') {
              calculatedFlow +=  parseFloat(site.flow);
            }
          });

          defered.resolve({flow: calculatedFlow, datetime: initialSiteFlow.datetime});
        });
        return defered.promise;
      }

      function _getUnitParam(unitType) {
        return (unitType === 'cfs') ? '00060' : '00065';
      }

      function _getDateRange(date) {
        //TODO: make utility
        var startDate, endDate;
        var currentMinutes = date.getMinutes();

        date.setSeconds(0);
        date.setMilliseconds(0);
        startDate = new Date(date.getTime());
        endDate = new Date(date.getTime());

        if (currentMinutes <= 15) {
          startDate.setMinutes(0);
          endDate.setMinutes(15);
        } else if (currentMinutes <= 30) {
          startDate.setMinutes(15);
          endDate.setMinutes(30);
        } else if (currentMinutes <= 45) {
          startDate.setMinutes(30);
          endDate.setMinutes(45);
        } else {
          startDate.setMinutes(45);
          endDate.setMinutes(0);
          endDate.setHours(date.getHours() + 1);
        }

        return {
          startDT: startDate.toISOString(),
          endDT: endDate.toISOString()
        }
      }

      return {
        getFlow: _getFlow,
        loadFlows: _loadFlows,
        calculateFlow: _calcFlow
      };

    });

})();
