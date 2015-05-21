System.register(["angular2/angular2", "services/fuck", "component/progress-circular/progress_circular"], function($__export) {
  "use strict";
  var Component,
      View,
      bootstrap,
      If,
      Fuck,
      MdProgressCircular,
      Hello;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      If = $__m.If;
    }, function($__m) {
      Fuck = $__m.Fuck;
    }, function($__m) {
      MdProgressCircular = $__m.MdProgressCircular;
    }],
    execute: function() {
      Hello = (function() {
        function Hello() {
          setTimeout((function() {
            var a = new loadAsset(init);
          }), 1000);
        }
        return ($traceurRuntime.createClass)(Hello, {init: function() {
            console.log(fuck);
          }}, {});
      }());
      $__export("Hello", Hello);
      Object.defineProperty(Hello, "annotations", {get: function() {
          return [new Component({selector: 'hello'}), new View({
            template: "<span *if=\"name\">Hello, {{name}}!</span>\n               <loading></loading>",
            directives: [If, loadAsset]
          })];
        }});
      bootstrap(Hello);
    }
  };
});
