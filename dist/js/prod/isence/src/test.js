System.register(["angular2/angular2", "Component/progress-circular/progress_circular"], function($__export) {
  "use strict";
  var Component,
      View,
      bootstrap,
      If,
      MdProgressCircular,
      Test;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      If = $__m.If;
    }, function($__m) {
      MdProgressCircular = $__m.MdProgressCircular;
    }],
    execute: function() {
      Test = (function() {
        function Test() {}
        return ($traceurRuntime.createClass)(Test, {init: function() {
            console.log('fuck');
          }}, {});
      }());
      $__export("Test", Test);
      Object.defineProperty(Test, "annotations", {get: function() {
          return [new Component({selector: 'myapp'}), new View({
            template: '<md-progress-circular [value]="progress"><md-progress-circular>',
            directives: [If, MdProgressCircular]
          })];
        }});
      bootstrap(Test);
    }
  };
});
