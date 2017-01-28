angular.module('app')
    .directive('manualTimeEntry', function() {
        return {
            restrict: 'E',
            templateUrl: '/js/directives/manual-time-entry/manual-time-entry.html',
            scope: {

            },
            link: function(scope, elem, attrs) {

            },
            controller: function($scope, moment, NapService) {
                $scope.fillerDate = new Date();
                $scope.fillerSTime = new Date('1970-01-01T20:00:00.000Z');
                $scope.fillerETime = new Date('1970-01-01T21:00:00.000Z');

                $scope.submitTime = function(valid) {
                    if (valid) {
                        $scope.correctDate = combineDatesAndTime($scope.entryDate, $scope.entryStartTime);

                        var entryObj = {
                            duration: getTimeElapsed($scope.entryStartTime, $scope.entryEndTime),
                            timestamp: $scope.correctDate.toString()
                        };

                        NapService.submitTime(entryObj)
                            .then(function() {
                                $scope.entryDate = $scope.fillerDate;
                                $scope.entryStartTime = $scope.fillerSTime;
                                $scope.entryEndTime = $scope.fillerETime;
                            });

                    }
                };

                function combineDatesAndTime(date, time) {
                    var pos1 = date.toISOString().indexOf('T');
                    var firstHalf = date.toISOString().slice(0, pos1);
                    var pos2 = time.toISOString().indexOf('T');
                    var secondHalf = time.toISOString().slice(pos2);
                    var combinedString = firstHalf + secondHalf;

                    return new Date(combinedString);
                }

                function getTimeElapsed(startTime, endTime) {
                    if (startTime && endTime) {
                        var start = moment(startTime, "HH:mm:ss a");
                        var end = moment(endTime, "HH:mm:ss a");
                        var duration = moment.duration(end.diff(start));

                        return duration._milliseconds;
                    }
                }
                // End of controller
            }
        };
    });
