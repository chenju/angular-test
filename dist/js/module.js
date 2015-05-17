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
