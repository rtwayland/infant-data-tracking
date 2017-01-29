angular.module('app')
    .directive('visualizeDataNapsNav', function() {
        return {
            restrict: 'E',
            templateUrl: '/js/directives/visualize-data-naps-nav/visualize-data-naps-nav.html',
            scope: {

            },
            link: function(scope, elem, attrs) {
                $('nav li').on('click', function(event) {
                    // event.preventDefault();
                    $(this).children('a').addClass('current');
                    $(this).siblings('li').children('a').removeClass('current');
                });
            }
        };
    });
