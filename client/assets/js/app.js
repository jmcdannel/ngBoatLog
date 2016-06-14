(function() {
  'use strict';

  angular.module('boatlogApp', [
    'ui.router',
    'ngAnimate',
    'autocomplete',
    'chart.js',

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

  var requireAuth = { 'currentAuth': ['Auth', function(Auth) { return Auth.$requireSignIn(); }] };

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
        abstract: true,
        template: '<ui-view/>'
      })
      .state('log.edit', {
        url: '/edit/:entry',
        templateUrl: 'templates/log-edit.html',
        controller: 'LogEditController',
        resolve: requireAuth
      })
      .state('log.detail', {
        url: '/entry/:entry',
        templateUrl: 'templates/log.detail.html',
        controller: 'LogDetailController',
        resolve: requireAuth
      })
      .state('log.current', {
        url: '/view',
        params: {
          year: new Date().getFullYear().toString()
        },
        templateUrl: 'templates/log.html',
        controller: 'LogController',
        resolve: requireAuth
      })
      .state('log.byyear', {
        url: '/year/:year',
        templateUrl: 'templates/log.html',
        controller: 'LogController',
        resolve: requireAuth
      })
      .state('log-entry', {
        url: '/log/add',
        templateUrl: 'templates/log-entry.html',
        controller: 'LogEntryController',
        resolve: requireAuth
      })
      .state('rivers', {
        url: '/rivers',
        templateUrl: 'templates/runs.html',
        controller: 'RunsController',
        resolve: requireAuth
      })
      .state('run-entry', {
        url: '/rivers/add',
        templateUrl: 'templates/run-entry.html',
        controller: 'RunEntryController',
        resolve: requireAuth
      })
      .state('run-edit', {
        url: '/rivers/edit/:run',
        templateUrl: 'templates/run-edit.html',
        controller: 'RunEditController',
        resolve: requireAuth
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
