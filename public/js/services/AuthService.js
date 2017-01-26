angular.module('app')
    .factory('AuthService', function($firebaseAuth, rootRef) {
        return $firebaseAuth();
    });
