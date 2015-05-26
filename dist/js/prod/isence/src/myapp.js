System.register(["angular2/angular2", "angular2/src/core/annotations_impl/annotations"], function($__export) {
  "use strict";
  var Component,
      View,
      bootstrap,
      If,
      ElementRef,
      onChange,
      onAllChangesDone,
      Directive,
      MyApp,
      ClassSet,
      Tooltip;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      If = $__m.If;
      ElementRef = $__m.ElementRef;
      onChange = $__m.onChange;
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      Directive = $__m.Directive;
    }],
    execute: function() {
      MyApp = (function() {
        function MyApp() {
          console.log('fuck');
        }
        return ($traceurRuntime.createClass)(MyApp, {}, {});
      }());
      $__export("MyApp", MyApp);
      Object.defineProperty(MyApp, "annotations", {get: function() {
          return [new Component({selector: 'myapp'}), new View({
            template: "<div layout=\"auto\"></div>\n\t          <div tooltip=\"some text here\"></div>",
            directives: [Tooltip]
          })];
        }});
      ClassSet = (function() {
        function ClassSet() {}
        return ($traceurRuntime.createClass)(ClassSet, {onAllChangesDone: function() {
            console.log('run');
          }}, {});
      }());
      Object.defineProperty(ClassSet, "annotations", {get: function() {
          return [new Directive({
            selector: '[layout]',
            lifecycle: [onAllChangesDone]
          })];
        }});
      Tooltip = (function() {
        function Tooltip() {}
        return ($traceurRuntime.createClass)(Tooltip, {
          onMouseEnter: function() {
            console.log(this.text);
          },
          onMouseLeave: function() {}
        }, {});
      }());
      Object.defineProperty(Tooltip, "annotations", {get: function() {
          return [new Directive({
            selector: '[tooltip]',
            properties: {'text': 'tooltip'},
            hostListeners: {
              'mouseover': 'onMouseEnter()',
              'onmouseleave': 'onMouseLeave()'
            }
          })];
        }});
      bootstrap(MyApp);
    }
  };
});
