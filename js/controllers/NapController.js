angular.module('app')
    .controller('NapController', function($scope, moment, $interval, NapService) {
        $scope.getTimeElapsed = function() {
            $scope.timeElapsed = $scope.generateTimeElapsed($scope.startTime, $scope.endTime);
        };


        var stop;
        $scope.startTimer = function() {
            $scope.beginning = new moment();
            stop = $interval(function() {
                $scope.timer = $scope.generateTimeElapsed($scope.beginning, new moment());
            }, 1000)
        };
        $scope.stopTimer = function() {
            $scope.ending = new moment();
            if ($scope.beginning) {
                $interval.cancel(stop);
                $scope.timerResult = $scope.generateTimeElapsed($scope.beginning, $scope.ending);
            }
        };


        $scope.generateTimeElapsed = function(startTime, endTime) {
            if (startTime && endTime) {
                var start = moment(startTime, "HH:mm:ss a");
                var end = moment(endTime, "HH:mm:ss a");
                var duration = moment.duration(end.diff(start));
                var hours = parseInt(duration.hours());
                var minutes = parseInt(duration.minutes());
                var seconds = duration.seconds();

                if (hours) {
                    return hours + ' hr ' + minutes + ' min';
                } else if (minutes) {
                    return minutes + ' min ' + seconds + ' sec';
                } else {
                    return seconds + ' sec';
                }
            }
        };

        $scope.submitTime = function () {
          NapService.submitTime($scope.timerResult);
        };

    });
