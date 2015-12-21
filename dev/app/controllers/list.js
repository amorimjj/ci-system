(function(){

  'use strict';

  var ListCtrl = function($scope, Builds, SocketBuilds) {

      $scope.selectedBuild = {};
      $scope.builds = Builds.find();

      SocketBuilds.on('message', function (buildMessage) {

          var build = $scope.builds.find(function(build) {
              return build.changelist === buildMessage.changelist;
          });

          if ( ! build )
            return $scope.builds.unshift(buildMessage);

         build.progress = buildMessage.progress;
         build.status = buildMessage.status;
         build.step = buildMessage.step;

      });

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

          if ( build.status !== 'passed' && build.status !== 'failed')
            return;

          Builds.get(build).then(function(){
              build.selected = !build.selected;

              if ( build ===  $scope.selectedBuild )
                return;

              $scope.selectedBuild.selected = false;
              $scope.selectedBuild = build;

          });

      };

      $scope.calcPerc = function(build, property) {
          if ( build.status !== 'passed' )
            return 0;

        return (1 - (build[property].skip/build[property].tests)) * 100;
      };
  };

  angular.module('ci-system')
     .controller('ListCtrl', ['$scope', 'Builds', 'SocketBuilds', ListCtrl]);

})();
