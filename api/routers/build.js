'use strict';

const getBuilds = require('./../lib/queries/get-builds'),
    getBuildById = require('./../lib/queries/get-build-by-id'),
    createBuild = require('./../lib/commands/create-build'),
    builder = require('./../lib/commands/builder');

let build = function(app, io) {

  app.get('/api/build', function(req, res){
    getBuilds
      .execute()
      .then(function(messages) {
        res.json(messages);
      });
  });

  app.get('/api/build/:id', function(req, res){
    getBuildById
      .execute(req.params.id)
      .then(function(builds) {
        res.json(builds);
      });
  });

  app.post('/api/build', function(req, res) {
    createBuild
      .execute(req.body.owner)
      .then(function(build){
          builder.add(build, io);
          io.emit('message', build);
          res.status(201).json({ message: 'created'});
      });
  });

};

module.exports = build;
