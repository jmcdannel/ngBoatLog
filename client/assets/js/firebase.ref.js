angular.module('firebase.ref', ['firebase', 'firebase.config'])
  .factory('Ref', ['$window', 'FBURL', function($window, FBURL) {
    'use strict';

    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyBKSJM5kpK9WF8t4n7gvpBm6DKeHE0Z-eI',
      authDomain: 'boatlog.firebaseapp.com',
      databaseURL: 'https://boatlog.firebaseio.com',
      storageBucket: 'project-4291141116046287608.appspot.com',
    };
    firebase.initializeApp(config);
    var rootRef = firebase.database().ref();
    return rootRef;
  }]);
