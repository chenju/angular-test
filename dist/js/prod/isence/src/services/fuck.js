"use strict";
var $__angular2_47_angular2__;
var Component = ($__angular2_47_angular2__ = require("angular2/angular2"), $__angular2_47_angular2__ && $__angular2_47_angular2__.__esModule && $__angular2_47_angular2__ || {default: $__angular2_47_angular2__}).ComponentAnnotation;
var Fuck = (function() {
  function Fuck() {
    this.name = 'Fuck';
    var $__1 = this;
    setTimeout((function() {
      $__1.name = "Fuck the World";
      console.log($__1.name);
    }), 1000);
  }
  return ($traceurRuntime.createClass)(Fuck, {}, {});
}());
Object.defineProperty(Fuck, "annotations", {get: function() {
    return [new Component({selector: 'hello'})];
  }});
Object.defineProperties(module.exports, {
  Fuck: {get: function() {
      return Fuck;
    }},
  __esModule: {value: true}
});
