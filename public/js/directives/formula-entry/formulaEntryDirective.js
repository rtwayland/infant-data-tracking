angular.module('app')
    .directive('formulaEntry', function() {
        return {
            restrict: 'E',
            templateUrl: '/js/directives/formula-entry/formula-entry.html',
            scope: {

            },
            link: function(scope, elem, attrs) {

            },
            controller: function($scope) {
                $scope.manualEntry = false;

                var obj = {
                    amount: $scope.ozAmount,
                    timestamp: $scope.timeFed
                };

            }
        };
    });
