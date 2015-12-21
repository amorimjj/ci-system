/*jshint multistr: true */
(function(){

    'use strict';

    var CiProgressBar = function () {

        return {
            restrict: 'A',
            scope: {
                status: '=',
                step: '=',
                perc: '=',
                max: '='
            },
            link: function (scope, element) {

                element.addClass('progress');

                var getPercWhenIsNotRunning = function() {

                    if ( scope.step === 1 || scope.step === 2 && scope.max === 100)
                        return 0;

                    return '100%';
                };

                scope.getClass = function() {

                    return {
                        'running' : 'active',
                        'passed' : 'progress-bar-success',
                        'failed' : 'progress-bar-danger'
                    }[scope.status];

                };

                scope.getWidth = function() {

                    if ( scope.status ===  'pending')
                        return 0;

                    if ( scope.status !== 'running')
                        return getPercWhenIsNotRunning();

                    if ( scope.max === 100 && scope.perc < 50 )
                        return 0;

                    return (scope.perc/scope.max) * 100 + '%';

                };

            },
            template: '<div ng-class="getClass()" \
                class="progress-bar progress-bar-striped" \
                role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" ng-style="{ width: getWidth() }"></div>'
        };
    };

  angular.module('ci-system')
     .directive('ciProgressBar', [CiProgressBar]);

})();
