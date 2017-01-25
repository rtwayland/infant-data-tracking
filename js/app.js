angular.module('app', ['ui.router', 'angularMoment', 'firebase'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
    })
        .state('naps', {
            url: '/naps',
            templateUrl: './views/naps.html',
            controller: 'NapController'
        })
});
