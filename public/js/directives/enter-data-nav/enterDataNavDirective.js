angular.module('app')
    .directive('enterDataNav', function() {
        return {
            restrict: 'E',
            templateUrl: '/js/directives/enter-data-nav/enter-data-nav.html',
            scope: {

            },
            link: function(scope, elem, attrs) {
                $('.navbar li').on('click', function(event) {
                    // event.preventDefault();
                    $(this).children('a').addClass('current');
                    $(this).siblings('li').children('a').removeClass('current');
                });
            }
        };
    });
