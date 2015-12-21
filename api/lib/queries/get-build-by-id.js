'use strict';

const Q = require('q'),
  Build = require('./../models/build');

let getBuildById = {

      'execute': function (id) {

          let defered = Q.defer();
          Build.get(id, function (err, data) {
              if (err) return defered.reject(err);
              defered.resolve(data);
          });

          return defered.promise;
      }
}

module.exports = getBuildById;
