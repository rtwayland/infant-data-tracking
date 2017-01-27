angular.module('app')
    .directive('visualizeDataNav', function() {
        return {
            restrict: 'E',
            templateUrl: '/js/directives/visualize-data-nav/visualize-data-nav.html',
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
