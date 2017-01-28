angular.module('app')
    .controller('NapController', function($scope, moment, $interval, NapService, $firebaseObject, $firebaseArray) {
        // var root = firebase.database().ref('data');
        // var naps = root.child('naps');
        // // var rootData = $firebaseObject(root);
        // var napData = $firebaseObject(naps);
        //
        //
        //
        //
        // napData.$loaded()
        //     .then(function() {
        //         // console.log('Naps\n', napData);
        //         napData.data = [];
        //         napData.data.push({
        //             duration: "2700000",
        //             timestamp: "2017-01-27T22:41:46.753Z"
        //         });
        //
        //         napData.$save();
        //     })
        //     .catch(function(err) {
        //         console.error(err);
        //     });




        // console.log('Root\n', rootData);
        // console.log('Naps\n', napData);
        $scope.submitTime = function() {
            NapService.submitTime($scope.timerResult);
        };

    });
