System.register(["angular2/angular2", "angular2/di", "d3"], function($__export) {
  "use strict";
  var bootstrap,
      Component,
      Directive,
      View,
      Attribute,
      onChange,
      ElementRef,
      Inject,
      d3,
      BarGraph,
      App;
  return {
    setters: [function($__m) {
      bootstrap = $__m.bootstrap;
      Component = $__m.Component;
      Directive = $__m.Directive;
      View = $__m.View;
      Attribute = $__m.Attribute;
      onChange = $__m.onChange;
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      Inject = $__m.Inject;
    }, function($__m) {
      d3 = $__m;
    }],
    execute: function() {
      BarGraph = (function() {
        function BarGraph(elementRef, width, height) {
          var el = elementRef.domElement;
          var graph = d3.select(el);
          this.divs = graph.append('div').attr({'class': 'chart'}).style({
            'width': width + 'px',
            'height': height + 'px'
          }).selectAll('div');
        }
        return ($traceurRuntime.createClass)(BarGraph, {
          render: function(newValue) {
            if (!newValue)
              return ;
            this.divs.data(newValue).enter().append('div').transition().ease('elastic').style('width', (function(d) {
              return d + '%';
            })).text((function(d) {
              return d + '%';
            }));
          },
          onChange: function() {
            this.render(this.data);
          }
        }, {});
      }());
      Object.defineProperty(BarGraph, "annotations", {get: function() {
          return [new Directive({
            selector: 'bar-graph',
            lifecycle: [onChange],
            properties: {data: 'data'}
          })];
        }});
      Object.defineProperty(BarGraph, "parameters", {get: function() {
          return [[ElementRef, new Inject(ElementRef)], [$traceurRuntime.type.string, new Attribute('width')], [$traceurRuntime.type.string, new Attribute('height')]];
        }});
      App = (function() {
        function App() {
          this.graphData = [10, 20, 30, 40, 60];
        }
        return ($traceurRuntime.createClass)(App, {}, {});
      }());
      Object.defineProperty(App, "annotations", {get: function() {
          return [new Component({selector: 'app'}), new View({
            template: "\n  <h1 class=\"title\">Angular 2 + d3</h1>\n\n  <bar-graph\n    bind-data=\"graphData\"\n    width=\"500\"\n    height=\"130\"\n  >\n  </bar-graph>\n\n  ",
            directives: [BarGraph]
          })];
        }});
      bootstrap(App);
    }
  };
});
