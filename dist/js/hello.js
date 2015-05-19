"use strict";
var $__angular2_47_angular2__,
    $__fuck__;
var $__0 = ($__angular2_47_angular2__ = require("angular2/angular2"), $__angular2_47_angular2__ && $__angular2_47_angular2__.__esModule && $__angular2_47_angular2__ || {default: $__angular2_47_angular2__}),
    Component = $__0.ComponentAnnotation,
    View = $__0.ViewAnnotation,
    bootstrap = $__0.bootstrap,
    If = $__0.If;
var Fuck = ($__fuck__ = require("fuck"), $__fuck__ && $__fuck__.__esModule && $__fuck__ || {default: $__fuck__}).Fuck;
var Hello = (function() {
  function Hello() {
    this.name = 'World';
    var $__2 = this;
    setTimeout((function() {
      var a = new Fuck();
      $__2.name = a.name;
    }), 1000);
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
