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
      Emitter,
      Main,
      Mdsence,
      Mdpage,
      SetStyle,
      SettingService,
      GetTouch,
      pageDivStyle;
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
      Emitter = (function() {
        function Emitter() {
          this.listener = null;
        }
        return ($traceurRuntime.createClass)(Emitter, {emit: function(data) {
            if (this.listener) {
              return this.listener(data);
            }
            ;
          }}, {});
      }());
      Main = (function() {
        function Main(set, tc) {
          this.set = set;
          this.tc = tc;
          this.senceWidth = set.pageW;
          this.senceHeight = set.pageH;
          this.pageCount = 1;
          this.pagNum = 0;
          this.loadvisible = true;
          this.setSize();
          this.play = new Emitter();
        }
        return ($traceurRuntime.createClass)(Main, {
          init: function() {
            this.loadvisible = false;
            this.pages[0].init();
          },
          onResize: function(event) {
            console.log(event);
            this.setSize();
          },
          gotoPage: function(t, n) {
            console.log("fuck");
          },
          set pageCount(value) {
            this._pageCount = value;
            this.setSize();
          },
          get pageCount() {
            return this._pageCount;
          },
          pageInit: function(n) {
            var n = 0;
            this.pages[n].init();
          },
          pageUnInit: function() {
            var n = 0;
            this.pages[n].uninit();
          },
          setSize: function() {
            var h = this.pageCount * document.documentElement.clientHeight;
            this.senceHeight = (h + "px");
            this.senceWidth = (document.documentElement.clientWidth + "px");
          },
          onChange: function(_) {
            this.setSize();
          }
        }, {});
      }());
      $__export("Main", Main);
      Object.defineProperty(Main, "annotations", {get: function() {
          return [new Component({
            selector: 'myapp',
            injectables: [SettingService, GetTouch],
            hostListeners: {'window:resize': 'onResize($event)'}
          }), new View({
            templateUrl: 'demo.html',
            directives: [loadAsset, Mdsence, Mdpage, SetStyle]
          })];
        }});
      Object.defineProperty(Main, "parameters", {get: function() {
          return [[SettingService], [GetTouch]];
        }});
      Mdsence = (function() {
        function Mdsence(m, tc) {
          this.pages = [];
          this.m = m;
          this.position = 0;
          this.o_y = 0;
          this.c_y = 0;
          this.tc = tc;
          this.n = 0;
          this.r = 0;
          this.mainTransform = 'translate3d(0,0,0)';
        }
        return ($traceurRuntime.createClass)(Mdsence, {
          layoutPages: function() {
            var p = this.pages.length;
            this.m.pageCount = p;
            this.m.pages = this.pages;
            this.m.gotoPage = this.movePage;
            var h = 100 / p;
            this.pageH = document.documentElement.clientHeight;
            for (var i = 0; i < this.pages.length; i++) {
              var page = this.pages[i];
              var top = h * i;
              page.styleWidth = "100%";
              page.styleHeight = (h + "%");
              page.styleTop = (top + "%");
            }
          },
          onTouchStart: function(e) {
            this.r = parseInt(this.get_transform_value(this.mainTransform, 'translate3d', 1));
            this.tc.TOUCH = "start";
            var i = e.changedTouches;
            if (!!i) {
              var s = i[0];
              this.c_y = s.pageY;
            }
            e.preventDefault();
          },
          onTouchMove: function(e) {
            if ("start" != this.tc.TOUCH && "move" != this.tc.TOUCH)
              return ;
            e.preventDefault();
            var s = e.changedTouches;
            if (!!s) {
              var o = s[0];
              this.n = o.pageY - this.c_y;
              this.mainTransform = this.transformForValue((this.r + this.n));
            }
            this.tc.TOUCH = 'move';
          },
          onTouchEnd: function(e) {
            var $__0 = this;
            var s = parseInt(this.get_transform_value(this.mainTransform, 'translate3d', 1)) || this.r,
                o = s - this.r,
                f = this.m.pagNum;
            if ("start" == this.tc.TOUCH && o != 0)
              return ;
            if (Math.abs(o) > 80) {
              o > 0 && this.r < 0 ? f = this.m.pagNum - 1 : o < 0 && Math.abs(this.r - this.pageH) < parseInt(this.m.senceHeight) && (f = this.m.pagNum + 1), console.log(this.m.senceHeight + "fuck1"), console.log(f + "fuck"), this.movePage(this.m.pagNum, f);
              return ;
            }
            if (0 == o)
              return ;
            this.transition = "top .2s linear";
            this.mainTransform = this.transformForValue(parseInt(-this.m.pagNum * this.pageH));
            setTimeout((function() {
              $__0.transition = "";
            }), 500);
          },
          movePage: function(t, n, r) {
            var $__0 = this;
            console.log('fuck');
            var s = r ? "" : "keep",
                o = r ? 0 : 600;
            this.transition = "transform .4s linear";
            this.mainTransform = this.transformForValue(parseInt(-n * this.pageH));
            setTimeout((function() {
              t != n && ($__0.pages[n] && $__0.pages[n].init(), $__0.pages[t] && $__0.pages[t].uninit()), $__0.transition = "", $__0.m.pagNum = n;
            }), 500);
          },
          onAllChangesDone: function() {
            this.layoutPages();
          },
          addPage: function(page) {
            ListWrapper.push(this.pages, page);
          },
          get_transform_value: function(e, t) {
            t = t.replace(/\-/g, "\\-");
            var n = [0];
            if (arguments.length > 2)
              for (var r = 2; r < arguments.length; ++r)
                n[r - 2] = arguments[r];
            if ("none" == e || "" == e)
              return null;
            var i = new RegExp(t + "\\(([^\\)]+)\\)", "ig"),
                s = e.match(i),
                o = [],
                u = [];
            if (s && s.length > 0) {
              s = s[0], o = s.replace(i, "$1").split(",");
              for (var r = 0; r < n.length; ++r)
                u.push(o[n[r]]);
            }
            return u.length == 1 && (u = u[0]), u;
          },
          transformForValue: function(value) {
            var translate3d = value;
            return ("translate3d(0," + translate3d + "px,0)");
          }
        }, {});
      }());
      $__export("Mdsence", Mdsence);
      Object.defineProperty(Mdsence, "annotations", {get: function() {
          return [new Directive({
            selector: 'md-sence',
            lifecycle: [onAllChangesDone],
            hostListeners: {
              '^touchstart': 'onTouchStart($event)',
              '^touchmove': 'onTouchMove($event)',
              '^touchend': 'onTouchEnd($event)'
            },
            hostProperties: {
              'mainTransform': 'style.transform',
              'transition': 'style.transition',
              'ClassMap': 'attr.class'
            },
            injectables: [SettingService, GetTouch]
          })];
        }});
      Object.defineProperty(Mdsence, "parameters", {get: function() {
          return [[Main], [GetTouch]];
        }});
      Object.defineProperty(Mdsence.prototype.addPage, "parameters", {get: function() {
          return [[Mdpage]];
        }});
      Mdpage = (function() {
        function Mdpage(pageList, layout) {
          this.pageList = pageList;
          this.pagerow = 1;
          this.divs = [];
        }
        return ($traceurRuntime.createClass)(Mdpage, {
          set pagerow(value) {
            this._pagerow = isString(value) ? NumberWrapper.parseInt(value, 10) : value;
          },
          get pagerow() {
            return this._rowspan;
          },
          init: function() {
            for (var i = 0; i < this.divs.length; i++) {
              this.divs[i].init();
            }
          },
          uninit: function() {
            for (var i = 0; i < this.divs.length; i++) {
              this.divs[i].uninit();
            }
          },
          addDiv: function(div) {
            ListWrapper.push(this.divs, div);
          },
          onChange: function(_) {
            if (!this.isRegisteredWithGridList) {
              this.pageList.addPage(this);
              this.isRegisteredWithGridList = true;
            }
          }
        }, {});
      }());
      $__export("Mdpage", Mdpage);
      Object.defineProperty(Mdpage, "annotations", {get: function() {
          return [new Directive({
            selector: 'md-page',
            properties: {
              'pagerow': 'pagerow',
              'layout': 'layout'
            },
            hostProperties: {
              'styleHeight': 'style.height',
              'styleWidth': 'style.width',
              'styleTop': 'style.top'
            },
            hostListeners: {
              'mouseover': 'onMouseOver(event)',
              'mousedown': 'onMouseDown(event)'
            },
            lifecycle: [onChange]
          })];
        }});
      Object.defineProperty(Mdpage, "parameters", {get: function() {
          return [[Mdsence, new Parent()], [$traceurRuntime.type.string, new Attribute('layout')]];
        }});
      Object.defineProperty(Mdpage.prototype.addDiv, "parameters", {get: function() {
          return [[SetStyle]];
        }});
      SetStyle = (function() {
        function SetStyle(page, set) {
          this.page = page;
          this.set = set;
        }
        return ($traceurRuntime.createClass)(SetStyle, {
          onAllChangesDone: function() {},
          getInit: function() {
            console.log('aaaaa');
            return this.page.init;
          },
          init: function() {
            var that = this;
            setTimeout(function() {
              that.ClassMap = that.orgClass + ' ' + that.addClass;
            }, this.delay);
            console.log(this.addClass);
            console.log(this.background);
            console.log(this.delay);
          },
          uninit: function() {
            this.ClassMap = this.orgClass;
          },
          onChange: function(_) {
            this.ClassMap = this.orgClass;
            var mode = this.page.layout;
            if (mode == "abs") {} else {
              var h = this.set.pageH,
                  w = this.set.pageW,
                  fh = 1008 / h,
                  fw = 640 / w;
              this.styleHeight = this.styleHeight / fh + 'px';
              this.styleWidth = this.styleWidth / fh + 'px';
              this.styleTop = this.styleTop / fh + 'px';
              this.styleLeft = this.styleLeft / fh + 'px';
            }
            if (!isBlank(this.background)) {
              if (/^(http|file|\/\/)/gi.test(this.background) || /\.(svg|png|jpg|jpeg|gif|bmp)$/gi.test(this.background)) {
                this.styleBackgroundImage = 'url(' + this.background + ')';
              } else {
                this.styleBackground = this.background;
              }
            }
            if (!this.isRegisteredWithGridList) {
              this.page.addDiv(this);
              this.isRegisteredWithGridList = true;
            }
          }
        }, {});
      }());
      $__export("SetStyle", SetStyle);
      Object.defineProperty(SetStyle, "annotations", {get: function() {
          return [new Directive({
            selector: '[w]',
            properties: {
              'styleWidth': 'w',
              'styleHeight': 'h',
              'styleTop': 'top',
              'styleLeft': 'left',
              'background': 'bg',
              'addClass': 'addclass',
              'delay': 'delay',
              'orgClass': 'class',
              'inited': 'init'
            },
            hostProperties: {
              'styleHeight': 'style.height',
              'styleWidth': 'style.width',
              'styleTop': 'style.top',
              'styleLeft': 'style.left',
              'styleBackground': 'style.backgroundColor',
              'styleBackgroundImage': 'style.backgroundImage',
              'ClassMap': 'attr.class'
            },
            lifecycle: [onChange]
          })];
        }});
      Object.defineProperty(SetStyle, "parameters", {get: function() {
          return [[Mdpage, new Ancestor], [SettingService]];
        }});
      SettingService = (function() {
        function SettingService() {
          this.greeting = 'hello';
        }
        return ($traceurRuntime.createClass)(SettingService, {
          get pageH() {
            return document.documentElement.clientHeight;
          },
          get pageW() {
            return document.documentElement.clientWidth;
          }
        }, {});
      }());
      Object.defineProperty(SettingService, "annotations", {get: function() {
          return [new Injectable()];
        }});
      GetTouch = (function() {
        function GetTouch() {
          if (('ontouchstart' in document.createElement("div"))) {
            this.touchstart = "touchstart", this.touchend = "touchend", this.touchmove = "touchmove";
            console.log(this.touchstart);
          } else {
            this.touchstart = "mousedown";
            this.touchend = "mouseup";
            this.touchmove = "mousemove";
          }
          this.TOUCH = 'stop';
          var that = this;
        }
        return ($traceurRuntime.createClass)(GetTouch, {}, {});
      }());
      Object.defineProperty(GetTouch, "annotations", {get: function() {
          return [new Injectable()];
        }});
      pageDivStyle = (function() {
        function pageDivStyle() {}
        return ($traceurRuntime.createClass)(pageDivStyle, {}, {});
      }());
      bootstrap(Main);
    }
  };
});
