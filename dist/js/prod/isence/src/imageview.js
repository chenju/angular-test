System.register(["angular2/src/di/annotations_impl", "angular2/angular2", "loadAsset", "angular2/src/core/annotations_impl/visibility", "angular2/src/facade/collection", "angular2/src/facade/math", "angular2/src/facade/lang", "angular2/src/core/annotations_impl/annotations", "angular2/di"], function($__export) {
  "use strict";
  var Injectable,
      Component,
      View,
      bootstrap,
      If,
      NgFor,
      ElementRef,
      onChange,
      onAllChangesDone,
      CSSClass,
      EventEmitter,
      QueryList,
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
      Query,
      Inject,
      resolveForwardRef,
      bind,
      Attribute,
      forwardRef,
      isBlank,
      Lock,
      ImgView,
      TextDirective,
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
      NgFor = $__m.NgFor;
      ElementRef = $__m.ElementRef;
      onChange = $__m.onChange;
      onAllChangesDone = $__m.onAllChangesDone;
      CSSClass = $__m.CSSClass;
      EventEmitter = $__m.EventEmitter;
      QueryList = $__m.QueryList;
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
      Query = $__m.Query;
      Inject = $__m.Inject;
    }, function($__m) {
      resolveForwardRef = $__m.resolveForwardRef;
      bind = $__m.bind;
      Attribute = $__m.Attribute;
      forwardRef = $__m.forwardRef;
    }],
    execute: function() {
      Lock = (function() {
        function Lock() {
          this.name = 'lock';
        }
        return ($traceurRuntime.createClass)(Lock, {}, {});
      }());
      Object.defineProperty(Lock, "annotations", {get: function() {
          return [new Directive({selector: 'lock'})];
        }});
      ImgView = (function() {
        function ImgView() {
          this.path = "http://www.pagefilp.com/~darkwingcj/monster/";
          this.prefix = "";
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
            template: "<input #path (keyup)=\"changePrefix($event)\"></input>\n              <input #prefix (keyup)=\"changePath($event)\"></input>\n                <md-imgView>\n               </md-imgView>\n               <div text='1'></div>\n               <lock></lock>",
            directives: [Img]
          })];
        }});
      TextDirective = (function() {
        function TextDirective() {}
        return ($traceurRuntime.createClass)(TextDirective, {}, {});
      }());
      Object.defineProperty(TextDirective, "annotations", {get: function() {
          return [new Directive({
            selector: '[text]',
            properties: ['text']
          }), new Injectable()];
        }});
      Img = (function() {
        function Img(m, lock) {
          console.log(locks);
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
          preLoad: function(n, t) {},
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
          return [[ImgView], [Lock, new Inject(forwardRef((function() {
            return Lock;
          })))]];
        }});
      setStyle = (function() {
        function setStyle(img) {
          this.styleBackgroundImage = img.getUrl;
          img.div = this;
        }
        return ($traceurRuntime.createClass)(setStyle, {}, {});
      }());
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
