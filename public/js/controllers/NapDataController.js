angular.module('app')
    .controller('NapDataController', function($scope, moment, $interval, NapService, $firebaseObject, $firebaseArray) {
        $scope.getNapData = function() {
            NapService.getNaps()
                .then(function(response) {
                    console.log('Nap Arr Data\n', response);
                    $scope.naps = response;
                }, function(error) {
                    console.log(error);
                })
        };
        $scope.getNapData();
    });
