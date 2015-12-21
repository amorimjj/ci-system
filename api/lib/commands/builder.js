'use strict';

let builder = {

    pool: [],

    add: function(build, io) {

        this.pool.push(build);

        if ( this.pool.length === 1 )
            build.status = 'running';

        runner(io);

    }

}

let runner = function(io) {

    setTimeout(function(){

        if ( builder.pool.length == 0 )
            return;

        let build = builder.pool[0];
        build.status = 'running';
        build.progress+=5;

        if ( build.progress >= 50 )
            build.step = 2;

        if ( build.changelist % 4 === 0 && build.progress > 20 ) {
            build.status = 'failed';
            builder.pool.shift();
        }

        if ( build.changelist % 5 === 0 && build.progress > 70 ) {
            build.status = 'failed';
            builder.pool.shift();
        }

        if ( build.progress === 100 ) {
            build.status = 'passed';
            build.step = 3;
            builder.pool.shift();
        }

        io.emit('message', build);

        runner(io);

    }, 2000);
}

module.exports = builder;
