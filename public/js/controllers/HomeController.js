angular.module('app')
    .controller('HomeController', function($scope, $state, $timeout, AuthService, rootRef) {
        $scope.logout = function() {
            AuthService.$signOut();

            $timeout(function() {
                $state.go('login');
            }, 500);
        };
    });
