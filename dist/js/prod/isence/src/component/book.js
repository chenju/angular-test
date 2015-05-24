System.register(["angular2/angular2", "angular2/src/dom/dom_adapter", "angular2/src/core/annotations_impl/annotations"], function($__export) {
  "use strict";
  var Component,
      View,
      bootstrap,
      If,
      ElementRef,
      DOM,
      Directive,
      _nextPageId,
      Mdbook,
      MdPage,
      MdPageContent;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      If = $__m.If;
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Directive = $__m.Directive;
    }],
    execute: function() {
      _nextPageId = 0;
      Mdbook = (function() {
        function Mdbook() {
          var pageElement = this._createHostElement();
          DOM.appendChild(DOM.query('wrapper'), pageElement);
          DOM.addClass(pageElement, 'md-page');
        }
        return ($traceurRuntime.createClass)(Mdbook, {_createHostElement: function() {
            var hostElement = DOM.createElement('md-page');
            hostElement.id = ("Mdbook" + _nextPageId++);
            return hostElement;
          }}, {});
      }());
      $__export("Mdbook", Mdbook);
      Object.defineProperty(Mdbook, "annotations", {get: function() {
          return [new Directive({selector: 'wrapper'})];
        }});
      MdPage = (function() {
        function MdPage() {
          console.log('mdpage');
        }
        return ($traceurRuntime.createClass)(MdPage, {}, {});
      }());
      $__export("MdPage", MdPage);
      Object.defineProperty(MdPage, "annotations", {get: function() {
          return [new Component({selector: 'md-page'}), new View({template: "<md-page-hwrp><</md-page-hwrp>"})];
        }});
      MdPageContent = (function() {
        function MdPageContent(page, elementRef) {
          page.contentRef = elementRef;
        }
        return ($traceurRuntime.createClass)(MdPageContent, {}, {});
      }());
      Object.defineProperty(MdPageContent, "annotations", {get: function() {
          return [new Directive({selector: 'md-page-hwrp'})];
        }});
      Object.defineProperty(MdPageContent, "parameters", {get: function() {
          return [[Mdpage, new Parent()], [ElementRef]];
        }});
    }
  };
});
