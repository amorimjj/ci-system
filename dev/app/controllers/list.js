(function(){

  'use strict';

  var ListCtrl = function($scope, Builds) {

      $scope.builds = Builds.find();

      $scope.getGlyphiconStatusByStatus = function(status) {
          return {
              'pending' : 'glyphicon-option-horizontal',
              'running' : 'glyphicon-refresh',
              'passed'  : 'glyphicon-ok-circle',
              'failed'  : 'glyphicon-remove-circle'
          }[status];
      };

      $scope.getGlyphiconStepByStatus = function(status) {
          return {
              'pending' : 'glyphicon-option-horizontal',
              'running' : 'glyphicon-refresh',
              'passed'  : 'glyphicon-ok',
              'failed'  : 'glyphicon-failed'
          }[status];
      };
  };

  angular.module('ci-system')
     .controller('ListCtrl', ['$scope', 'Builds', ListCtrl]);

})();
