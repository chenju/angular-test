System.register(["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view", "angular2/src/facade/lang", "angular2/src/facade/math"], function($__export) {
  "use strict";
  var Component,
      onChange,
      View,
      isPresent,
      isBlank,
      Math,
      MdProgressCircular;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      onChange = $__m.onChange;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      Math = $__m.Math;
    }],
    execute: function() {
      MdProgressCircular = (function() {
        function MdProgressCircular() {
          this.value_ = 0;
        }
        return ($traceurRuntime.createClass)(MdProgressCircular, {
          get value() {
            return this.value_;
          },
          set value(v) {
            if (isPresent(v)) {
              this.value_ = MdProgressCircular.clamp(v);
            }
          }
        }, {clamp: function(v) {
            return Math.max(0, Math.min(100, v));
          }});
      }());
      $__export("MdProgressCircular", MdProgressCircular);
      Object.defineProperty(MdProgressCircular, "annotations", {get: function() {
          return [new Component({
            selector: 'md-progress-circular',
            properties: {'value': 'value'},
            hostProperties: {'value': 'value'}
          }), new View({templateUrl: 'component/progress-circular/progress_circular.html'})];
        }});
    }
  };
});
