angular.module('app')
    .controller('LoginController', function($scope, $state, AuthService) {
        $scope.anonLogin = function() {
            AuthService.$signInAnonymously()
                .then(function() {
                    $state.go('home');
                }, function(error) {
                    $scope.errorMessage = error.code;
                })
        };

        $scope.googleLogin = function() {
            AuthService.$signInWithPopup('google')
                .then(function() {
                    $state.go('home');
                }, function(error) {
                    $scope.errorMessage = error.code;
                })
        };
    });
