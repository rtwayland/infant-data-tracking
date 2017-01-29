angular.module('app')
    .controller('NapDataController', function($scope, moment, $interval, NapService, $firebaseObject, $firebaseArray) {

        $scope.today = getDateFilterString();

        /**************** GET NAP DATA ****************/
        $scope.getNapData = function() {
            NapService.getNaps()
                .then(function(response) {
                    console.log('Nap Arr Data\n', response);
                    $scope.naps = response;
                }, function(error) {
                    console.log(error);
                })
        };
        /**************** GET DATE FILTER STRING ****************/
        function getDateFilterString() {
            var theDate = new Date();
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Oct', 'Sept', 'Nov', 'Dec'];
            var theMonth = months[theDate.getMonth()];
            var theDay = theDate.getDate().toString();
            var theYear = theDate.getFullYear().toString();

            return theMonth + ' ' + theDay + ' ' + theYear;
        }

        $scope.getNapData();
    });
