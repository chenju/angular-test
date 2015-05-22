System.register(["angular2/angular2", "Component/progress-circular/progress_circular", "hello"], function($__export) {
  "use strict";
  var Component,
      View,
      bootstrap,
      If,
      MdProgressCircular,
      Hello,
      loadAsset;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      If = $__m.If;
    }, function($__m) {
      MdProgressCircular = $__m.MdProgressCircular;
    }, function($__m) {
      Hello = $__m.Hello;
    }],
    execute: function() {
      loadAsset = (function() {
        function loadAsset(b) {
          this.s = 60;
          this.progress = 0;
          b.init();
        }
        return ($traceurRuntime.createClass)(loadAsset, {
          step: function(s) {
            this.progress += s;
          },
          startload: function() {
            var src = [];
            t = src.length;
            for (var i = 0; i < t; ++i)
              loadImg(src[i]);
          },
          loadimg: function(e) {
            var r = new Image;
            r.onload = function() {
              ++loaded, step(parseInt(n / t * 100));
            }, r.src = e;
          },
          o: function() {
            0 >= s ? loaded / t > .5 ? u() : alert("加载图片失败，请返回刷新尝试!") : (s -= .5, loaded == t ? u() : setTimeout(o, 500));
          }
        }, {});
      }());
      $__export("loadAsset", loadAsset);
      Object.defineProperty(loadAsset, "annotations", {get: function() {
          return [new Component({selector: 'loading'}), new View({
            template: '<md-progress-circular [value]="progress"><md-progress-circular>',
            directives: [If, MdProgressCircular]
          })];
        }});
      Object.defineProperty(loadAsset, "parameters", {get: function() {
          return [[Hello]];
        }});
      Object.defineProperty(loadAsset.prototype.step, "parameters", {get: function() {
          return [[$traceurRuntime.type.number]];
        }});
      Object.defineProperty(loadAsset.prototype.loadimg, "parameters", {get: function() {
          return [[String]];
        }});
    }
  };
});
