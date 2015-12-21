/* global angular */

(function () {

    'use strict';

    angular
        .module('ci-system', ['ngRoute','ngResource', 'btford.socket-io', 'ngAnimate']);

    var httpInterceptorErrorHandler = function($q) {
        return {
            responseError: function (response) {
                //TODO: Show warning
                return $q.reject(response);
            }
        };
    };

    var appConfig = function ($routeProvider, $httpProvider, $locationProvider) {

        $httpProvider.interceptors.push(['$q', httpInterceptorErrorHandler]);

        $routeProvider
            .when('/', {
                templateUrl: 'app/views/list.html',
                controller: 'ListCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    };

    angular
        .module('ci-system')
        .config(['$routeProvider', '$httpProvider', '$locationProvider', appConfig]);

})();
