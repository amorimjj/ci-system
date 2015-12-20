(function(){

  'use strict';

  var ListCtrl = function($scope, Builds) {

      $scope.selectedBuild = {};
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

      $scope.getClassByBuild = function(build) {

          var classes = [build.status];

          if ( build.selected )
            classes.push('selected');

          return classes.join(' ');

      };

      $scope.showDetails = function(build) {

          build.selected = !build.selected;

          Builds.get(build);

          if ( build ===  $scope.selectedBuild )
            return;

          $scope.selectedBuild.selected = false;
          $scope.selectedBuild = build;
      }
  };

  angular.module('ci-system')
     .controller('ListCtrl', ['$scope', 'Builds', ListCtrl]);

})();
