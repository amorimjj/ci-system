/* global angular */

(function () {

  'use strict';

  angular
        .module('ci-system', ['ngRoute','ngResource', 'btford.socket-io', 'ngAnimate']);


  var appConfig = function ($routeProvider, $locationProvider) {

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
    .config(['$routeProvider', '$locationProvider', appConfig]);

})();
