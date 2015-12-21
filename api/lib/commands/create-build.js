'use strict';

const Q = require('q'),
  Build = require('./../models/build');

let createBuilder = {

      'execute': function (owner) {

          Build.owner = owner;

          let defered = Q.defer();
          Build.save(function (err, data) {
              if (err) return defered.reject(err);
              defered.resolve(data);
          });

          return defered.promise;
      }
}

module.exports = createBuilder;
