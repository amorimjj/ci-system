describe('List Controller Test', function() {

    beforeEach(module('ci-system'));

    describe('Build Socket interaction test', function() {

        var SocketBuilds = {
            on: function() {}
        }

        it('should create a listener to new builds', inject(function($controller) {
          spyOn(SocketBuilds, 'on');
          $controller('ListCtrl', {$scope: {}, Builds: { find: function() { } }, SocketBuilds: SocketBuilds});
          expect(SocketBuilds.on).toHaveBeenCalledWith('message', jasmine.any(Function));
        }));
    });

    describe('Methods test', function() {

        var SocketBuilds, Builds, scope, build;

        beforeEach(function(){
            SocketBuilds        = { on: function() { } },
            Builds              = { find: function() { }, get: function() { return { then: function(call) { call() }}} },
            scope               = {}
            build               = { unitTest: {} };
        });

        describe('ShowDetails test', function() {

            it('when build status is passed should set selected as true', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.status = 'passed';
              scope.showDetails(build);
              expect(build.selected).toBe(true);
            }));

            it('when build status is passed and selected is true should set selected as false', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.selected = true;
              build.status = 'passed';
              scope.showDetails(build);
              expect(build.selected).toBe(false);
            }));

            it('when build status is passed selectedBuild should be setted as build instance', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.status = 'passed';
              scope.showDetails(build);
              expect(scope.selectedBuild).toBe(build);
            }));

            it('when build status is failed should set selected as true', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.status = 'failed';
              scope.showDetails(build);
              expect(build.selected).toBe(true);
            }));

            it('when build status is failed selectedBuild should be setted as build instance', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.status = 'failed';
              scope.showDetails(build);
              expect(scope.selectedBuild).toBe(build);
            }));

            it('when build status is failed and selected is true should set selected as false', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.selected = true;
              build.status = 'failed';
              scope.showDetails(build);
              expect(build.selected).toBe(false);
            }));

            it('when build status is pending cant change selected value', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.selected = false;
              build.status = 'pending';
              scope.showDetails(build);
              expect(build.selected).toBe(false);
            }));

            it('when build status is running cant change selected value', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.selected = false;
              build.status = 'running';
              scope.showDetails(build);
              expect(build.selected).toBe(false);
            }));
        });

        describe('CalcPerc test', function() {
            it('when build status is passed should calc percent', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.status = 'passed';
              build.unitTest.skip = 20;
              build.unitTest.tests = 100;
              var perc = scope.calcPerc(build, 'unitTest');
              expect(perc).toEqual(80);
            }));

            it('when build status inst passed should return 0', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.status = 'running';
              build.unitTest.skip = 20;
              build.unitTest.tests = 100;
              var perc = scope.calcPerc(build, 'unitTest');
              expect(perc).toEqual(0);
            }));
        });

        describe('GetClassByBuild test', function() {
            it('when build status is passed and selected is false should return passed as class', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.status = 'passed';
              var className = scope.getClassByBuild(build);
              expect(className).toEqual('passed');
            }));

            it('when build status is passed and selected is true should return "passed selected" as class', inject(function($controller) {
              $controller('ListCtrl', {$scope: scope, Builds: Builds, SocketBuilds: SocketBuilds});
              build.status = 'passed';
              build.selected = true;
              var className = scope.getClassByBuild(build);
              expect(className).toEqual('passed selected');
            }));
        });
    });
});
