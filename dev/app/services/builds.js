(function(){
  'use strict';

  var Builds = function ($resource, $q) {

      var resource = $resource('/api/build/:buildId', {buildId:'@id'});

      var justResolve = function(build) {
          var deferred = $q.defer();
          deferred.resolve(build);
          return deferred.promise;
      };

      return {
          find: function() {
              return resource.query();
          },
          get: function(build) {

              if ( build.loaded )
                return justResolve(build);

              return resource.get({buildId:build.changelist}, function(resp) {
                  build.endedAt = resp.endedAt;
                  build.download = resp.download;
                  build.unitTest = resp.unitTest;
                  build.funcionalTest = resp.funcionalTest;
              }).$promise;
          }
      };
  };

  angular.module('ci-system')
     .service('Builds', ['$resource', '$q', Builds]);

})();
