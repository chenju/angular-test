System.register(["angular2/src/di/annotations_impl", "angular2/angular2", "loadAsset", "angular2/src/core/annotations_impl/visibility", "angular2/src/facade/collection", "angular2/src/facade/math", "angular2/src/facade/lang", "angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/di"], function($__export) {
  "use strict";
  var Injectable,
      Component,
      View,
      bootstrap,
      If,
      ElementRef,
      onChange,
      onAllChangesDone,
      CSSClass,
      EventEmitter,
      loadAsset,
      Parent,
      Ancestor,
      ListWrapper,
      Math,
      StringWrapper,
      isPresent,
      isString,
      NumberWrapper,
      RegExpWrapper,
      Directive,
      Attribute,
      isBlank,
      ImgView,
      Img,
      setStyle;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      If = $__m.If;
      ElementRef = $__m.ElementRef;
      onChange = $__m.onChange;
      onAllChangesDone = $__m.onAllChangesDone;
      CSSClass = $__m.CSSClass;
      EventEmitter = $__m.EventEmitter;
    }, function($__m) {
      loadAsset = $__m.loadAsset;
    }, function($__m) {
      Parent = $__m.Parent;
      Ancestor = $__m.Ancestor;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Math = $__m.Math;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      isString = $__m.isString;
      NumberWrapper = $__m.NumberWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
      isBlank = $__m.isBlank;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }],
    execute: function() {
      ImgView = (function() {
        function ImgView() {
          this.path = "http://www.pagefilp.com/~darkwingcj/monster/(C80)/";
          this.prefix = "(M)mon11_";
          this.pagNum = 1;
        }
        return ($traceurRuntime.createClass)(ImgView, {
          changePath: function($event) {
            if ($event.which === 13) {
              this.path = $event.target.value;
              this.pagNum = 1;
            }
          },
          changePrefix: function($event) {
            if ($event.which === 13) {
              this.prefix = $event.target.value;
              this.pagNum = 1;
            }
          }
        }, {});
      }());
      $__export("ImgView", ImgView);
      Object.defineProperty(ImgView, "annotations", {get: function() {
          return [new Component({
            selector: 'myapp',
            hostListeners: {'window:resize': 'onResize($event)'}
          }), new View({
            template: "<input #path (keyup)=\"changePrefix($event)\"></input>\n              <input #prefix (keyup)=\"changePath($event)\"></input>\n                <md-imgView>\n               </md-imgView>",
            directives: [Img]
          })];
        }});
      Img = (function() {
        function Img(m) {
          this.getUrl = '';
          this.m = m;
        }
        return ($traceurRuntime.createClass)(Img, {
          down: function(e) {
            if (e.layerX > 284) {
              this.goNext();
            } else {
              this.goPrev();
            }
          },
          goNext: function() {
            this.gotoPage(parseInt(this.m.pagNum + 1));
          },
          goPrev: function() {
            var n = this.m.pagNum - 1;
            if (n > 0)
              this.gotoPage(parseInt(n));
          },
          gotoPage: function(n) {
            this.m.pagNum = n;
            if (n < 10)
              this.imgUrl = this.m.path + this.m.prefix + "0" + n + ".jpg";
            else
              this.imgUrl = this.m.path + this.m.prefix + n + ".jpg";
            this.getUrl = ("url('" + this.imgUrl + "')");
            this.w = "1000px";
            console.log(this.getUrl);
          }
        }, {});
      }());
      $__export("Img", Img);
      Object.defineProperty(Img, "annotations", {get: function() {
          return [new Component({
            selector: 'md-imgView',
            hostListeners: {"^mousedown": "down($event)"}
          }), new View({
            template: "<div show=\"true\" bg='{{getUrl}}' class='image'>{{getUrl}}</div>",
            directives: [setStyle]
          })];
        }});
      Object.defineProperty(Img, "parameters", {get: function() {
          return [[ImgView]];
        }});
      setStyle = (function() {
        function setStyle(img) {
          this.styleBackgroundImage = img.getUrl;
          img.div = this;
        }
        return ($traceurRuntime.createClass)(setStyle, {}, {});
      }());
      $__export("setStyle", setStyle);
      Object.defineProperty(setStyle, "annotations", {get: function() {
          return [new Directive({
            selector: '[show]',
            properties: {'styleBackgroundImage': 'bg'},
            hostProperties: {'styleBackgroundImage': 'style.backgroundImage'}
          })];
        }});
      Object.defineProperty(setStyle, "parameters", {get: function() {
          return [[Img, new Parent]];
        }});
      bootstrap(ImgView);
    }
  };
});
