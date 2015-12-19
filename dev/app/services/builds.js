(function(){
  'use strict';

  var Builds = function () {

      var builds = [
          { 'changelist': 432464, 'owner': 'JTuck', 'startedAt': '2014-04-17T09:42:00.000Z', 'status': 'pending', 'step' : 'build'  },
          { 'changelist': 432463, 'owner': 'Dora', 'startedAt': '2014-04-17T07:40:00.000Z', 'status': 'running', 'step' : 'build'  },
          { 'changelist': 432462, 'owner': 'Samy', 'startedAt': '2014-04-17T06:42:00.000Z', 'status': 'passed', 'step' : 'ft'  },
          { 'changelist': 432461, 'owner': 'JTuck', 'startedAt': '2014-04-17T04:28:00.000Z', 'status': 'failed', 'step' : 'build'  },
          { 'changelist': 432460, 'owner': 'Samy', 'startedAt': '2014-04-17T03:14:00.000Z', 'status': 'passed', 'step' : 'ft'  },
          { 'changelist': 432459, 'owner': 'Dora', 'startedAt': '2014-04-17T01:14:00.000Z', 'status': 'failed', 'step' : 'ut'  }
      ];

      return {
          find: function() {
              return builds;
          }
      };
  };

  angular.module('ci-system')
     .service('Builds', [Builds]);

})();
