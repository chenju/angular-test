System.register(["angular2/angular2", "Component/progress-circular/progress_circular", "angular2/src/dom/dom_adapter", "main", "angular2/src/core/annotations_impl/visibility"], function($__export) {
  "use strict";
  var Component,
      View,
      bootstrap,
      If,
      ViewContainerRef,
      MdProgressCircular,
      DOM,
      Main,
      Parent,
      loadAsset;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      If = $__m.If;
      ViewContainerRef = $__m.ViewContainerRef;
    }, function($__m) {
      MdProgressCircular = $__m.MdProgressCircular;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Main = $__m.Main;
    }, function($__m) {
      Parent = $__m.Parent;
    }],
    execute: function() {
      loadAsset = (function() {
        function loadAsset(b) {
          this.loaded = 0, this.s = 60;
          this.progress = 0;
          this.startload();
          this.o(b);
          this.visible = true;
        }
        return ($traceurRuntime.createClass)(loadAsset, {
          step: function(s) {
            this.progress += s;
          },
          startload: function() {
            var src = ['img/arrow_down.png'];
            this.t = src.length;
            for (var i = 0; i < this.t; ++i)
              this.loadimg(src[i]);
          },
          loadimg: function(e) {
            var r = new Image;
            var self = this;
            r.onload = function() {
              ++self.loaded;
              self.step(parseInt(self.loaded / self.t) * 100);
            };
            r.src = e;
          },
          o: function(b) {
            var $__0 = this;
            0 >= this.s ? this.loaded / this.t > .5 ? (b.init(), this.hide()) : (alert("加载图片失败，请返回刷新尝试!")) : (this.s -= .5, this.loaded == this.t ? (b.init(), this.hide()) : setTimeout((function() {
              $__0.o(b);
            }), 500));
          },
          hide: function() {
            var $__0 = this;
            setTimeout((function() {
              $__0.visible = false;
            }), 500);
          }
        }, {});
      }());
      $__export("loadAsset", loadAsset);
      Object.defineProperty(loadAsset, "annotations", {get: function() {
          return [new Component({selector: 'loading'}), new View({
            template: '<md-progress-circular [value]="progress" [hidden]="!visible"><md-progress-circular>',
            directives: [If, MdProgressCircular]
          })];
        }});
      Object.defineProperty(loadAsset, "parameters", {get: function() {
          return [[Main]];
        }});
      Object.defineProperty(loadAsset.prototype.step, "parameters", {get: function() {
          return [[$traceurRuntime.type.number]];
        }});
      Object.defineProperty(loadAsset.prototype.loadimg, "parameters", {get: function() {
          return [[String]];
        }});
      Object.defineProperty(loadAsset.prototype.o, "parameters", {get: function() {
          return [[Main]];
        }});
    }
  };
});
