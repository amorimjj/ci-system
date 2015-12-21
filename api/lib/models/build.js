"use strict";

let builds = [
    { 'changelist': 432464, 'owner': 'JTuck', 'startedAt': '2014-04-17T09:42:00.000Z', 'status': 'passed', 'progress': 100, 'step' : 3  },
    { 'changelist': 432463, 'owner': 'Dora', 'startedAt': '2014-04-17T07:40:00.000Z', 'status': 'failed', 'progress': 40, 'step' : 1  },
    { 'changelist': 432462, 'owner': 'Samy', 'startedAt': '2014-04-17T06:42:00.000Z', 'status': 'passed', 'progress': 100, 'step' : 3  },
    { 'changelist': 432461, 'owner': 'JTuck', 'startedAt': '2014-04-17T04:28:00.000Z', 'status': 'failed', 'progress': 28, 'step' : 1  },
    { 'changelist': 432460, 'owner': 'Samy', 'startedAt': '2014-04-17T03:14:00.000Z', 'status': 'passed', 'progress': 100, 'step' : 3  },
    { 'changelist': 432459, 'owner': 'Dora', 'startedAt': '2014-04-17T01:14:00.000Z', 'status': 'failed', 'progress': 80, 'step' : 2  }
];

let getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let loader = function(build) {
    build.loaded = true;
    build.endedAt = '2014-04-17T03:14:00.000Z';
    build.download = { debug: '1234.zip', release: '2345.zip'};
    build.unitTest = { tests: getRandomInt(300, 350), skip: getRandomInt(1, 30), elapsedTime: '4:30'};
    build.funcionalTest = { tests: getRandomInt(14321, 18000), skip: getRandomInt(1000, 3000), elapsedTime: '3:30'};
}

let Build = {

  changelist: 432465,
  owner: '',

  find: function (callback) {
    callback(null, builds.slice(0, 100));
  },

  get: function(id, callback) {
      let build = builds.find(function(b) {
          return b.changelist = id;
      });

      if ( ! build.loaded )
        loader(build);

      callback(null, build);
  },

  save : function(callback) {
    let build = { 'changelist': this.changelist++, 'owner': this.owner, 'startedAt': new Date(), 'progress': 0, 'status': 'pending', 'step' : 1 };
    builds.unshift(build);
    callback(null, build);
  }
};

module.exports = Build;
