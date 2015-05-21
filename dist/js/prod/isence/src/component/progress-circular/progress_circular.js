System.register(["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view"], function($__export) {
  "use strict";
  var Component,
      View,
      MdProgressCircular;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      View = $__m.View;
    }],
    execute: function() {
      MdProgressCircular = (function() {
        function MdProgressCircular() {}
        return ($traceurRuntime.createClass)(MdProgressCircular, {}, {});
      }());
      $__export("MdProgressCircular", MdProgressCircular);
      Object.defineProperty(MdProgressCircular, "annotations", {get: function() {
          return [new Component({selector: 'md-progress-circular'}), new View({templateUrl: 'angular2_material/src/components/progress-circular/progress_circular.html'})];
        }});
    }
  };
});
