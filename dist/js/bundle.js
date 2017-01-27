'use strict';

angular.module('app', ['ui.router', 'angularMoment', 'firebase']).run(function ($rootScope, $state) {
    console.log('in run');
    $rootScope.$on('$routeChangeError', function (e, next, prev, error) {
        console.log('in rootScope');
        if (error === 'AUTH_REQUIRED') {
            console.log('in error');
            $state.go('login');
        }
    });
}).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/'
    }).state('naps', {
        url: '/naps',
        templateUrl: './views/naps.html',
        resolve: {
            currentAuth: function currentAuth(AuthService) {
                return AuthService.$requireSignIn();
            }
        },
        controller: 'NapController'
    }).state('login', {
        url: '/login',
        templateUrl: './views/login.html',
        resolve: {
            currentAuth: function currentAuth(AuthService) {
                // console.log('In resolve');
                return AuthService.$waitForSignIn();
            }
        },
        controller: 'LoginController'
    });
});
"use strict";

var svg = d3.select("svg"),
    margin = 20,
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var color = d3.scaleLinear().domain([-1, 5]).range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"]).interpolate(d3.interpolateHcl);

var pack = d3.pack().size([diameter - margin, diameter - margin]).padding(2);

d3.json("Objects/infant-data-packing.json", function (error, root) {
    if (error) throw error;

    root = d3.hierarchy(root).sum(function (d) {
        return d.size;
    }).sort(function (a, b) {
        return b.value - a.value;
    });

    var focus = root,
        nodes = pack(root).descendants(),
        view;

    var circle = g.selectAll("circle").data(nodes).enter().append("circle").attr("class", function (d) {
        return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
    }).style("fill", function (d) {
        return d.children ? color(d.depth) : null;
    }).on("click", function (d) {
        if (focus !== d) zoom(d), d3.event.stopPropagation();
    });

    var text = g.selectAll("text").data(nodes).enter().append("text").attr("class", "label").style("fill-opacity", function (d) {
        return d.parent === root ? 1 : 0;
    }).style("display", function (d) {
        return d.parent === root ? "inline" : "none";
    }).text(function (d) {
        return d.data.name;
    });

    var node = g.selectAll("circle,text");

    svg.style("background", color(-1)).on("click", function () {
        zoom(root);
    });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
        var focus0 = focus;
        focus = d;

        var transition = d3.transition().duration(d3.event.altKey ? 7500 : 750).tween("zoom", function (d) {
            var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
            return function (t) {
                zoomTo(i(t));
            };
        });

        transition.selectAll("text").filter(function (d) {
            return d.parent === focus || this.style.display === "inline";
        }).style("fill-opacity", function (d) {
            return d.parent === focus ? 1 : 0;
        }).on("start", function (d) {
            if (d.parent === focus) this.style.display = "inline";
        }).on("end", function (d) {
            if (d.parent !== focus) this.style.display = "none";
        });
    }

    function zoomTo(v) {
        var k = diameter / v[2];
        view = v;
        node.attr("transform", function (d) {
            return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
        });
        circle.attr("r", function (d) {
            return d.r * k;
        });
    }
});
'use strict';

angular.module('app').controller('HomeController', function ($scope, $state, $timeout, AuthService, rootRef) {
    $scope.logout = function () {
        AuthService.$signOut();

        $timeout(function () {
            $state.go('login');
        }, 500);
    };
});
'use strict';

angular.module('app').controller('LoginController', function ($scope, $state, AuthService, currentAuth) {
    console.log(currentAuth);
    $scope.loggedIn = !!currentAuth;
    $scope.anonLogin = function () {
        AuthService.$signInAnonymously().then(function () {
            $state.go('home');
        }, function (error) {
            $scope.errorMessage = error.code;
        });
    };

    $scope.googleLogin = function () {
        AuthService.$signInWithPopup('google').then(function () {
            $state.go('home');
        }, function (error) {
            $scope.errorMessage = error.code;
        });
    };
});
'use strict';

angular.module('app').controller('NapController', function ($scope, moment, $interval, NapService) {
    $scope.getTimeElapsed = function () {
        $scope.timeElapsed = $scope.generateTimeElapsed($scope.startTime, $scope.endTime);
    };

    var stop;
    $scope.startTimer = function () {
        $scope.beginning = new moment();
        stop = $interval(function () {
            $scope.timer = $scope.generateTimeElapsed($scope.beginning, new moment());
        }, 1000);
    };
    $scope.stopTimer = function () {
        $scope.ending = new moment();
        if ($scope.beginning) {
            $interval.cancel(stop);
            $scope.timerResult = $scope.generateTimeElapsed($scope.beginning, $scope.ending);
        }
    };

    $scope.generateTimeElapsed = function (startTime, endTime) {
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
'use strict';

angular.module('app').factory('AuthService', function ($firebaseAuth, rootRef) {
    return $firebaseAuth();
});
'use strict';

angular.module('app').factory('rootRef', function () {
  return firebase.database().ref();
});
'use strict';

angular.module('app').service('NapService', function ($firebaseObject) {
    var rootRef = firebase.database().ref().child('data');
    var syncObject = $firebaseObject(rootRef);

    this.submitTime = function (time) {
        console.log(object);
    };
});
"use strict";
'use strict';

angular.module('app').directive('basicTimer', function () {
    return {
        restrict: 'E',
        templateUrl: '/js/directives/basic-timer/basic-timer.html',
        scope: {},
        link: function link($scope, elem, attrs) {
            setInterval(function () {
                $scope.getTimes();
                $('#basic-timer .hours').text($scope.hours);
                $('#basic-timer .minutes').text($scope.minutes);
                $('#basic-timer .seconds').text($scope.seconds);
            }, 500);
        },
        controller: function controller($scope, moment, $interval) {
            $scope.timerInitiated = false;
            $scope.timerRunning = false;
            $scope.timerStopped = true;
            var timeElapsed = 0;
            var totalTime = 0;
            var beginning;
            var stop = null;

            $scope.startTimer = function () {
                $scope.timerInitiated = true;
                $scope.timerRunning = true;
                $scope.timerStopped = false;
                if (!stop) {
                    beginning = new Date();
                    stop = $interval(function () {
                        var now = new Date();
                        timeElapsed = now.getTime() - beginning.getTime();
                    }, 500);
                }
            };

            $scope.stopTimer = function () {
                $scope.timerRunning = false;
                $scope.timerStopped = true;
                if (stop) {
                    $interval.cancel(stop);
                    stop = null;
                    totalTime += timeElapsed;
                    timeElapsed = 0;
                }
            };

            $scope.cancelTimer = function () {
                timeElapsed = 0;
                totalTime = 0;
                $scope.timerInitiated = false;
                $scope.timerRunning = false;
                $scope.timerStopped = true;
            };

            $scope.getTimes = function () {
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
//# sourceMappingURL=bundle.js.map
