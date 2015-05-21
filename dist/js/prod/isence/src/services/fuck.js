System.register(["angular2/angular2"], function($__export) {
  "use strict";
  var Component,
      Fuck;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
    }],
    execute: function() {
      Fuck = (function() {
        function Fuck() {
          this.name = 'Fuck';
          var $__0 = this;
          setTimeout((function() {
            $__0.name = "Fuck the World";
            console.log($__0.name);
          }), 1000);
        }
        return ($traceurRuntime.createClass)(Fuck, {}, {});
      }());
      $__export("Fuck", Fuck);
      Object.defineProperty(Fuck, "annotations", {get: function() {
          return [new Component({selector: 'hello'})];
        }});
    }
  };
});
