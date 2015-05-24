System.register(["angular2/angular2", "grid_list", "angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view"], function($__export) {
  "use strict";
  var bootstrap,
      MdGridList,
      MdGridTile,
      Component,
      Directive,
      View,
      DemoApp;
  function main() {
    bootstrap(DemoApp);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      bootstrap = $__m.bootstrap;
    }, function($__m) {
      MdGridList = $__m.MdGridList;
      MdGridTile = $__m.MdGridTile;
    }, function($__m) {
      Component = $__m.Component;
      Directive = $__m.Directive;
    }, function($__m) {
      View = $__m.View;
    }],
    execute: function() {
      DemoApp = (function() {
        function DemoApp() {
          console.log('fuck');
          this.tile3RowSpan = 3;
          this.tile3ColSpan = 3;
        }
        return ($traceurRuntime.createClass)(DemoApp, {}, {});
      }());
      Object.defineProperty(DemoApp, "annotations", {get: function() {
          return [new Component({selector: 'demo-app'}), new View({
            templateUrl: './demo_app.html',
            directives: [MdGridList, MdGridTile]
          })];
        }});
    }
  };
});
