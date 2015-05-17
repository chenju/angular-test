"use strict";
if (typeof __decorate !== "function")
  __decorate = function(decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
      case 2:
        return decorators.reduceRight(function(o, d) {
          return (d && d(o)) || o;
        }, target);
      case 3:
        return decorators.reduceRight(function(o, d) {
          return (d && d(target, key)), void 0;
        }, void 0);
      case 4:
        return decorators.reduceRight(function(o, d) {
          return (d && d(target, key, o)) || o;
        }, desc);
    }
  };
if (typeof __metadata !== "function")
  __metadata = function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var angular2_1 = require("angular2/angular2");
var setting_1 = require("./setting");
var progress_linear_1 = require("./src/component/progress-linear/progress_linear");
var Constants = (function() {
  function Constants() {}
  Object.defineProperty(Constants, "Default", {
    get: function() {
      return {
        appName: "My App",
        appVersion: 2.0,
        baseUrl: "http://localhost:3048",
        Action: {
          None: 0,
          Registering: 1,
          Authenticating: 2
        }
      };
    },
    enumerable: true,
    configurable: true
  });
  return Constants;
})();
var ChildComponent = (function() {
  function ChildComponent() {
    this.name = setting_1.Settings.Default.appName;
  }
  ChildComponent = __decorate([angular2_1.Component({selector: 'wrapper'}), angular2_1.View({template: "<section>\n                <div class=\"h_wrp\">\n                   <h1>Hello {{name }}</h1>\n                </div>\n              </section>"}), __metadata('design:paramtypes', [])], ChildComponent);
  return ChildComponent;
})();
var MyAppComponent = (function() {
  function MyAppComponent() {
    this.name = 'Alice';
  }
  MyAppComponent = __decorate([angular2_1.Component({selector: 'my-app'}), angular2_1.View({
    template: "<h1>Hello {{ name }}</h1>\n    <loading-progress class=\"loading_bg\"></loading-progress>\n    <wrapper></wrapper>",
    directives: [ChildComponent, progress_linear_1.MdProgressLinear]
  }), __metadata('design:paramtypes', [])], MyAppComponent);
  return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);
