"format register";
System.register("xiaoan/module", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var test = 'es6';
  var MyClass = (function() {
    function MyClass() {
      console.log('ES6 Class!');
    }
    return ($traceurRuntime.createClass)(MyClass, {}, {});
  }());
  Object.defineProperties(module.exports, {
    test: {get: function() {
        return test;
      }},
    MyClass: {get: function() {
        return MyClass;
      }},
    __esModule: {value: true}
  });
  global.define = __define;
  return module.exports;
});

System.register("xiaoan/hello", ["xiaoan/module", "angular2/angular2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var $__module__,
      $__angular2_47_angular2__;
  var $__0 = ($__module__ = require("xiaoan/module"), $__module__ && $__module__.__esModule && $__module__ || {default: $__module__}),
      test = $__0.test,
      MyCLass = $__0.MyCLass;
  var $__1 = ($__angular2_47_angular2__ = require("angular2/angular2"), $__angular2_47_angular2__ && $__angular2_47_angular2__.__esModule && $__angular2_47_angular2__ || {default: $__angular2_47_angular2__}),
      Component = $__1.ComponentAnnotation,
      View = $__1.ViewAnnotation,
      bootstrap = $__1.bootstrap,
      If = $__1.If;
  var Hello = (function() {
    function Hello() {
      this.name = 'World';
      var $__2 = this;
      console.log(test);
      new MyClass();
      setTimeout((function() {
        $__2.name = 'NEW World';
      }), 2000);
    }
    return ($traceurRuntime.createClass)(Hello, {}, {});
  }());
  Object.defineProperty(Hello, "annotations", {get: function() {
      return [new Component({selector: 'hello'}), new View({
        template: "<span *if=\"name\">Hello, {{name}}!</span>",
        directives: [If]
      })];
    }});
  bootstrap(Hello);
  Object.defineProperties(module.exports, {
    Hello: {get: function() {
        return Hello;
      }},
    __esModule: {value: true}
  });
  global.define = __define;
  return module.exports;
});

//# sourceMappingURL=main.js.map