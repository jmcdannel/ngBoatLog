(function() {
  'use strict';

  angular.module('boatlogApp')
    .config(['$routeProvider', 'SECURED_ROUTES', function($routeProvider, SECURED_ROUTES) {
      // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
      // unfortunately, a decorator cannot be use here because they are not applied until after
      // the .config calls resolve, so they can't be used during route configuration, so we have
      // to hack it directly onto the $routeProvider object
      $routeProvider.whenAuthenticated = function(path, route) {
        route.resolve = route.resolve || {};
        route.resolve.user = ['Auth', function(Auth) {
          return Auth.$requireAuth();
        }];
        $routeProvider.when(path, route);
        SECURED_ROUTES[path] = true;
        return $routeProvider;
      };
    }])

    // configure views; whenAuthenticated adds a resolve method to ensure users authenticate
    // before trying to access that route
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/home.html',
          controller: 'LogController'
        })
        .when('/log/add', {
          templateUrl: 'templates/log-entry.html',
          controller: 'LogEntryController'
        })

        .when('/templates', {
          templateUrl: 'views/login.html',
          controller: 'LoginController'
        })
        .whenAuthenticated('/account', {
          templateUrl: 'templates/account.html'
        })
        .otherwise({redirectTo: '/'});
    }])

    /**
     * Apply some route security. Any route's resolve method can reject the promise with
     * "AUTH_REQUIRED" to force a redirect. This method enforces that and also watches
     * for changes in auth status which might require us to navigate away from a path
     * that we can no longer view.
     */
    .run(['$rootScope', '$location', 'Auth', 'SECURED_ROUTES', 'loginRedirectPath',
      function($rootScope, $location, Auth, SECURED_ROUTES, loginRedirectPath) {
        // watch for login status changes and redirect if appropriate
        Auth.$onAuth(check);

        // some of our routes may reject resolve promises with the special {authRequired: true} error
        // this redirects to the login page whenever that is encountered
        $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
          if( err === 'AUTH_REQUIRED' ) {
            $location.path(loginRedirectPath);
          }
        });

        function check(user) {
          if( !user && authRequired($location.path()) ) {
            $location.path(loginRedirectPath);
          }
        }

        function authRequired(path) {
          return SECURED_ROUTES.hasOwnProperty(path);
        }
      }
    ])

    // used by route security
    .constant('SECURED_ROUTES', {});
});
