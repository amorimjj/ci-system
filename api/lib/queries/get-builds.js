'use strict';

const Q = require('q'),
  Build = require('./../models/build');

let getBuilds = {

      'execute': function () {

          let defered = Q.defer();
          Build.find(function (err, data) {
                  if (err) return defered.reject(err);
                  defered.resolve(data);
              });

          return defered.promise;
      }
}

module.exports = getBuilds;
