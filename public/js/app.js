angular.module('app', ['ui.router', 'angularMoment', 'firebase'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/visualize-data/naps', '/visualize-data/naps/today');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './views/home.html'
            })
            .state('enter-data', {
                url: '/enter-data',
                templateUrl: './views/enter-data.html'
            })
            .state('visualize-data', {
                url: '/visualize-data',
                templateUrl: './views/visualize-data.html'
            })
            // Enter data children
            .state('enter-data.naps', {
                url: '/naps',
                templateUrl: './views/enter-data/naps.html'
                // resolve: {
                //     currentAuth: function(AuthService) {
                //         return AuthService.$requireSignIn();
                //     }
                // },
                // controller: 'NapController'
            })
            .state('enter-data.feedings', {
                url: '/feedings',
                templateUrl: './views/enter-data/feedings.html'
                // controller: 'NapController'
            })
            .state('enter-data.diapers', {
                url: '/diapers',
                templateUrl: './views/enter-data/diapers.html'
                // controller: 'NapController'
            })
            .state('enter-data.nighttime', {
                url: '/nighttime',
                templateUrl: './views/enter-data/nighttime.html'
                // controller: 'NapController'
            })
            // Visualize data children
            .state('visualize-data.naps', {
                url: '/naps',
                templateUrl: './views/visualize-data/naps.html',
                controller: 'NapDataController'
            })
            .state('visualize-data.feedings', {
                url: '/feedings',
                templateUrl: './views/visualize-data/feedings.html'
                // controller: 'NapController'
            })
            .state('visualize-data.diapers', {
                url: '/diapers',
                templateUrl: './views/visualize-data/diapers.html'
                // controller: 'NapController'
            })
            .state('visualize-data.nighttime', {
                url: '/nighttime',
                templateUrl: './views/visualize-data/nighttime.html'
                // controller: 'NapController'
            })
            .state('visualize-data.week-view', {
                url: '/week-view',
                templateUrl: './views/visualize-data/week-view.html'
                // controller: 'NapController'
            })
            // Naps children
            .state('visualize-data.naps.today', {
                url: '/today',
                templateUrl: './views/visualize-data/naps/nap-data-today.html'
            })
            .state('visualize-data.naps.all', {
                url: '/all',
                templateUrl: './views/visualize-data/naps/nap-data-all.html'
            })
            .state('visualize-data.naps.visual', {
                url: '/visual',
                templateUrl: './views/visualize-data/naps/nap-data-visual.html'
            });
        // .state('login', {
        //     url: '/login',
        //     templateUrl: './views/login.html',
        //     resolve: {
        //         currentAuth: function(AuthService) {
        //             // console.log('In resolve');
        //             return AuthService.$waitForSignIn();
        //         }
        //     },
        //     controller: 'LoginController'
        // })
    });
