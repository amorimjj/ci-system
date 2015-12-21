(function(){
  'use strict';

  var SocketBuilds = function (socketFactory) {
    return socketFactory();
  };

  angular.module('ci-system')
     .factory('SocketBuilds', ['socketFactory', SocketBuilds]);

})();
