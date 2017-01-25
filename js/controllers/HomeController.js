angular.module('app')
    .controller('HomeController', function($scope, rootRef) {
      rootRef.on('value', function() {
        console.log('connected');
      });
    });
