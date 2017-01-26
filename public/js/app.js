angular.module('app', ['ui.router', 'angularMoment', 'firebase'])
.run(function($rootScope, $state) {
  console.log('in run');
    $rootScope.$on('$routeChangeError', function(e, next, prev, error) {
      console.log('in rootScope');
        if (error === 'AUTH_REQUIRED') {
          console.log('in error');
            $state.go('login');
        }
    });
})
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
            })
            .state('naps', {
                url: '/naps',
                templateUrl: './views/naps.html',
                resolve: {
                    currentAuth: function(AuthService) {
                        return AuthService.$requireSignIn();
                    }
                },
                controller: 'NapController'
            })
            .state('login', {
                url: '/login',
                templateUrl: './views/login.html',
                resolve: {
                    currentAuth: function(AuthService) {
                        // console.log('In resolve');
                        return AuthService.$waitForSignIn();
                    }
                },
                controller: 'LoginController'
            })
    });
