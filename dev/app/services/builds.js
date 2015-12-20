(function(){
  'use strict';

  var Builds = function () {

      var builds = [
          { 'changelist': 432464, 'owner': 'JTuck', 'startedAt': '2014-04-17T09:42:00.000Z', 'status': 'pending', 'progress': 0, 'step' : 1  },
          { 'changelist': 432463, 'owner': 'Dora', 'startedAt': '2014-04-17T07:40:00.000Z', 'status': 'running', 'progress': 40, 'step' : 1  },
          { 'changelist': 432462, 'owner': 'Samy', 'startedAt': '2014-04-17T06:42:00.000Z', 'status': 'passed', 'progress': 100, 'step' : 3  },
          { 'changelist': 432461, 'owner': 'JTuck', 'startedAt': '2014-04-17T04:28:00.000Z', 'status': 'failed', 'progress': 28, 'step' : 1  },
          { 'changelist': 432460, 'owner': 'Samy', 'startedAt': '2014-04-17T03:14:00.000Z', 'status': 'passed', 'progress': 100, 'step' : 3  },
          { 'changelist': 432459, 'owner': 'Dora', 'startedAt': '2014-04-17T01:14:00.000Z', 'status': 'failed', 'progress': 80, 'step' : 2  }
      ];

      return {
          find: function() {
              return builds;
          },
          get: function(build) {
              build.endedAt = '2014-04-17T03:14:00.000Z';
              build.download = { debug: '1234.zip', release: '2345.zip'};
              build.unitTest = { tests: 342, skip: 3, elapsedTime: '4:30'};
              build.funcionalTest = { tests: 14321, skip: 2000, elapsedTime: '3:30'};
          }
      };
  };

  angular.module('ci-system')
     .service('Builds', [Builds]);

})();
