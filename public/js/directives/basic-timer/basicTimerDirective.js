angular.module('app')
    .directive('basicTimer', function() {
        return {
            restrict: 'E',
            templateUrl: '/js/directives/basic-timer/basic-timer.html',
            scope: {
                // name: '@'
            },
            link: function($scope, elem, attrs) {
                setInterval(function() {
                    $scope.getTimes();
                    $('#basic-timer .hours').text($scope.hours);
                    $('#basic-timer .minutes').text($scope.minutes);
                    $('#basic-timer .seconds').text($scope.seconds);
                }, 100);
            },
            controller: function($scope, moment, $interval, NapService) {
                $scope.timerInitiated = false;
                $scope.timerRunning = false;
                $scope.timerStopped = true;
                var timeElapsed = 0;
                var totalTime = 0;
                var beginning;
                var stop = null;

                /************* START *************/
                $scope.startTimer = function() {
                    $scope.timerInitiated = true;
                    $scope.timerRunning = true;
                    $scope.timerStopped = false;
                    if (!stop) {
                        beginning = new Date();
                        $scope.dateStamp = beginning;
                        stop = $interval(function() {
                            var now = new Date();
                            timeElapsed = now.getTime() - beginning.getTime();
                        }, 50);
                    }
                };

                /************* STOP *************/
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

                /************* CANCEL *************/
                $scope.cancelTimer = function() {
                    timeElapsed = 0;
                    totalTime = 0;
                    $scope.timerInitiated = false;
                    $scope.timerRunning = false;
                    $scope.timerStopped = true;
                };
                /************* GET TOTAL TIME *************/
                var getTotalTime = function() {
                    return totalTime + timeElapsed;
                }
                /************* GET TIMES (for view display) *************/
                $scope.getTimes = function() {
                    var ms = getTotalTime();
                    var temp = moment.duration(ms);
                    $scope.hours = temp.hours();
                    $scope.minutes = temp.minutes();
                    $scope.seconds = temp.seconds();
                };

                /************* SUBMIT TIME *************/
                $scope.submitTime = function() {
                    var entryObj = {
                        duration: getTotalTime(),
                        timestamp: $scope.dateStamp.toString()
                    };

                    NapService.submitTime(entryObj)
                        .then(function() {
                            $scope.cancelTimer();
                        });
                };


                // End of controller
            }
            // End of return
        };
        // End of directive
    });
