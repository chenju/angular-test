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
      Main,
      ClassSet,
      Mdsence,
      Mdpage,
      SetStyle,
      SettingService,
      GreetingService;
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
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }],
    execute: function() {
      Main = (function() {
        function Main(set) {
          this.set = set;
          this.senceWidth = set.pageW;
          this.senceHeight = set.pageH;
          this.pageCount = 1;
          this.setSize();
          this.aaa = "aaa";
        }
        return ($traceurRuntime.createClass)(Main, {
          init: function() {
            console.log('fuck');
          },
          onResize: function(event) {
            this.setSize();
          },
          set pageCount(value) {
            this._pageCount = value;
            this.setSize();
          },
          get pageCount() {
            return this._pageCount;
          },
          setSize: function() {
            var h = this.pageCount * document.documentElement.clientHeight;
            this.senceHeight = (h + "px");
            this.senceWidth = (document.documentElement.clientWidth + "px");
          },
          onChange: function(_) {
            this.setSize();
          },
          transformForValue: function(value) {
            var scale = value / 100;
            var translateX = (value - 100) / 2;
            return ("translateX(" + translateX + "%) scale(" + scale + ", 1)");
          }
        }, {});
      }());
      $__export("Main", Main);
      Object.defineProperty(Main, "annotations", {get: function() {
          return [new Component({
            selector: 'myapp',
            injectables: [SettingService],
            hostListeners: {'window:resize': 'onResize($event)'}
          }), new View({
            templateUrl: 'demo.html',
            directives: [loadAsset, Mdsence, Mdpage, SetStyle]
          })];
        }});
      Object.defineProperty(Main, "parameters", {get: function() {
          return [[SettingService]];
        }});
      ClassSet = (function() {
        function ClassSet() {}
        return ($traceurRuntime.createClass)(ClassSet, {onAllChangesDone: function() {
            console.log('run');
          }}, {});
      }());
      Object.defineProperty(ClassSet, "annotations", {get: function() {
          return [new Directive({
            selector: '[layout]',
            lifecycle: [onAllChangesDone]
          })];
        }});
      Mdsence = (function() {
        function Mdsence(m) {
          this.pages = [];
          this.m = m;
          this.aaa = "aaa";
        }
        return ($traceurRuntime.createClass)(Mdsence, {
          layoutPages: function() {
            var p = this.pages.length;
            this.m.pageCount = p;
            var h = 100 / p;
            console.log(p);
            for (var i = 0; i < this.pages.length; i++) {
              var page = this.pages[i];
              var top = h * i;
              page.styleWidth = "100%";
              page.styleHeight = (h + "%");
              page.styleTop = (top + "%");
            }
          },
          onAllChangesDone: function() {
            this.layoutPages();
          },
          addPage: function(page) {
            ListWrapper.push(this.pages, page);
          }
        }, {});
      }());
      $__export("Mdsence", Mdsence);
      Object.defineProperty(Mdsence, "annotations", {get: function() {
          return [new Directive({
            selector: 'md-sence',
            lifecycle: [onAllChangesDone]
          })];
        }});
      Object.defineProperty(Mdsence, "parameters", {get: function() {
          return [[Main]];
        }});
      Object.defineProperty(Mdsence.prototype.addPage, "parameters", {get: function() {
          return [[Mdpage]];
        }});
      Mdpage = (function() {
        function Mdpage(pageList, layout) {
          this.pageList = pageList;
          this.aaa = "aaa";
          this.pagerow = 1;
        }
        return ($traceurRuntime.createClass)(Mdpage, {
          set pagerow(value) {
            this._pagerow = isString(value) ? NumberWrapper.parseInt(value, 10) : value;
          },
          get pagerow() {
            return this._rowspan;
          },
          set layout(v) {
            console.log(v + "set");
            this._layout = v;
          },
          set layout1(v) {
            console.log(v + "b");
          },
          get layout() {
            console.log("get");
            return this._layout;
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
              'layout1': 'layout1',
              'layout2': 'layout2',
              'layout': 'layout'
            },
            hostProperties: {
              'styleHeight': 'style.height',
              'styleWidth': 'style.width',
              'styleTop': 'style.top'
            },
            lifecycle: [onChange]
          })];
        }});
      Object.defineProperty(Mdpage, "parameters", {get: function() {
          return [[Mdsence, new Parent()], [$traceurRuntime.type.string, new Attribute('layout')]];
        }});
      SetStyle = (function() {
        function SetStyle(page) {
          this.layout = page.layout;
          this.page = page;
          console.log(this.layout);
          console.log("???");
        }
        return ($traceurRuntime.createClass)(SetStyle, {
          set widt(value) {
            this.styleWidth = value;
          },
          onChange: function(_) {
            this.layout = this.page.layout;
            console.log(this.layout);
          }
        }, {});
      }());
      $__export("SetStyle", SetStyle);
      Object.defineProperty(SetStyle, "annotations", {get: function() {
          return [new Directive({
            selector: '[w]',
            properties: {'widt': 'w'},
            hostProperties: {
              'styleHeight': 'style.height',
              'styleWidth': 'style.width',
              'styleTop': 'style.top'
            },
            lifecycle: [onChange]
          })];
        }});
      Object.defineProperty(SetStyle, "parameters", {get: function() {
          return [[Mdpage, new Ancestor]];
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
      GreetingService = (function() {
        function GreetingService() {
          this.greeting = 'hello';
        }
        return ($traceurRuntime.createClass)(GreetingService, {}, {});
      }());
      Object.defineProperty(GreetingService, "annotations", {get: function() {
          return [new Injectable()];
        }});
      bootstrap(Main);
    }
  };
});
