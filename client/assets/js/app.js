(function() {
  'use strict';

  angular.module('boatlogApp', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',

    //firebase
    'firebase',
    'firebase.auth',
    'firebase.ref'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'templates/home.html',
          controller: 'HomeController',
          resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            'currentAuth': ['Auth', function(Auth) {
              // $waitForAuth returns a promise so the resolve waits for it to complete
              return Auth.$waitForSignIn();
            }]
          }
      })
      .state('log', {
        url: '/log',
        templateUrl: 'templates/log.html',
        controller: 'LogController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .state('log-entry', {
        url: '/log/add',
        templateUrl: 'templates/log-entry.html',
        controller: 'LogEntryController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .state('rivers', {
        url: '/rivers',
        templateUrl: 'templates/rivers.html',
        controller: 'RiversController',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          'currentAuth': ['Auth', function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      });
      $urlRouterProvider.otherwise('/');
  }

  run.$inject = ['$rootScope', '$state'];
  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === 'AUTH_REQUIRED') {
        $state.go('home');
      }
    });
    FastClick.attach(document.body);

  }

})();
