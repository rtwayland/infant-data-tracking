angular.module('app')
    .directive('basicTimer', function() {
        return {
            restrict: 'E',
            templateUrl: '/js/directives/basic-timer/basic-timer.html',
            scope: {

            },
            link: function($scope, elem, attrs) {
                setInterval(function() {
                    $scope.getTimes();
                    $('#basic-timer .hours').text($scope.hours);
                    $('#basic-timer .minutes').text($scope.minutes);
                    $('#basic-timer .seconds').text($scope.seconds);
                }, 50);
            },
            controller: function($scope, moment, $interval) {
                $scope.timerInitiated = false;
                $scope.timerRunning = false;
                $scope.timerStopped = true;
                var timeElapsed = 0;
                var totalTime = 0;
                var beginning;
                var stop = null;

                $scope.startTimer = function() {
                    $scope.timerInitiated = true;
                    $scope.timerRunning = true;
                    $scope.timerStopped = false;
                    if (!stop) {
                        beginning = new Date();
                        stop = $interval(function() {
                            var now = new Date();
                            timeElapsed = now.getTime() - beginning.getTime();
                        }, 50);
                    }
                };

                $scope.stopTimer = function() {
                    $scope.timerRunning = false;
                    $scope.timerStopped = true;
                    if (stop) {
                        $interval.cancel(stop);
                        stop = null;
                        totalTime += timeElapsed;
                        timeElapsed = 0;
                    }
                };

                $scope.cancelTimer = function() {
                  timeElapsed = 0;
                  totalTime = 0;
                  $scope.timerInitiated = false;
                  $scope.timerRunning = false;
                  $scope.timerStopped = true;
                };

                $scope.getTimes = function() {
                    var ms = totalTime + timeElapsed;
                    var temp = moment.duration(ms);
                    $scope.hours = temp.hours();
                    $scope.minutes = temp.minutes();
                    $scope.seconds = temp.seconds();
                };

                // End of controller
            }
            // End of return
        };
        // End of directive
    });
