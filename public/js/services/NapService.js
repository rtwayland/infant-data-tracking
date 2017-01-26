angular.module('app')
    .service('NapService', function($firebaseObject) {
        var rootRef = firebase.database().ref().child('data');
        var syncObject = $firebaseObject(rootRef);

        this.submitTime = function(time) {
          console.log(object);
        };
    });
