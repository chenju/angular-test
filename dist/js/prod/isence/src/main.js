System.register(["angular2/src/di/annotations_impl", "angular2/angular2", "loadAsset"], function($__export) {
  "use strict";
  var Injectable,
      Component,
      View,
      bootstrap,
      If,
      loadAsset,
      Main,
      SettingService,
      GreetingService;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      If = $__m.If;
    }, function($__m) {
      loadAsset = $__m.loadAsset;
    }],
    execute: function() {
      Main = (function() {
        function Main(service) {
          console.log(service.pageW);
        }
        return ($traceurRuntime.createClass)(Main, {
          init: function() {
            console.log('fuck');
          },
          onResize: function(event) {
            console.log(event.target);
            this.name = 1;
          }
        }, {});
      }());
      $__export("Main", Main);
      Object.defineProperty(Main, "annotations", {get: function() {
          return [new Component({
            selector: 'myapp',
            injectables: [SettingService],
            hostListeners: {'window:resize': 'onResize($event)'}
          }), new View({
            template: "<loading></loading>\n               <wrapper *If=\"name==1\">AAA</wrapper>",
            directives: [If, loadAsset]
          })];
        }});
      Object.defineProperty(Main, "parameters", {get: function() {
          return [[SettingService]];
        }});
      SettingService = (function() {
        function SettingService() {
          this.greeting = 'hello';
          this.pageH = document.documentElement.clientHeight;
          this.pageW = document.documentElement.clientWidth;
        }
        return ($traceurRuntime.createClass)(SettingService, {}, {});
      }());
      Object.defineProperty(SettingService, "annotations", {get: function() {
          return [new Injectable()];
        }});
      GreetingService = (function() {
        function GreetingService() {
          this.greeting = 'hello';
        }
        return ($traceurRuntime.createClass)(GreetingService, {}, {});
      }());
      Object.defineProperty(GreetingService, "annotations", {get: function() {
          return [new Injectable()];
        }});
      bootstrap(Main);
    }
  };
});
