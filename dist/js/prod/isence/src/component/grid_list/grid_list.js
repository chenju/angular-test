System.register(["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view", "angular2/src/core/annotations_impl/visibility", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/facade/math"], function($__export) {
  "use strict";
  var Component,
      onDestroy,
      onChange,
      onAllChangesDone,
      View,
      Parent,
      ListWrapper,
      StringWrapper,
      isPresent,
      isString,
      NumberWrapper,
      RegExpWrapper,
      Math,
      MdGridList,
      MdGridTile,
      TileCoordinator,
      Position,
      TileStyle;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      onDestroy = $__m.onDestroy;
      onChange = $__m.onChange;
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Parent = $__m.Parent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      isString = $__m.isString;
      NumberWrapper = $__m.NumberWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
    }, function($__m) {
      Math = $__m.Math;
    }],
    execute: function() {
      MdGridList = (function() {
        function MdGridList() {
          this.tiles = [];
          this.rows = 0;
        }
        return ($traceurRuntime.createClass)(MdGridList, {
          set cols(value) {
            this._cols = isString(value) ? NumberWrapper.parseInt(value, 10) : value;
          },
          get cols() {
            return this._cols;
          },
          set rowHeight(value) {
            if (value === 'fit') {
              this.rowHeightMode = 'fit';
            } else if (StringWrapper.contains(value, ':')) {
              var ratioParts = StringWrapper.split(value, RegExpWrapper.create(':'));
              if (ratioParts.length !== 2) {
                throw ("md-grid-list: invalid ratio given for row-height: \"" + value + "\"");
              }
              this.rowHeightMode = 'ratio';
              this.rowHeightRatio = NumberWrapper.parseFloat(ratioParts[0]) / NumberWrapper.parseFloat(ratioParts[1]);
            } else {
              this.rowHeightMode = 'fixed';
              this.fixedRowHeight = value;
            }
          },
          onAllChangesDone: function() {
            this.layoutTiles();
          },
          layoutTiles: function() {
            var tracker = new TileCoordinator(this.cols, this.tiles);
            this.rows = tracker.rowCount;
            for (var i = 0; i < this.tiles.length; i++) {
              var pos = tracker.positions[i];
              var tile = this.tiles[i];
              var style = this.getTileStyle(tile, pos.row, pos.col);
              tile.styleWidth = style.width;
              tile.styleHeight = style.height;
              tile.styleTop = style.top;
              tile.styleLeft = style.left;
              tile.styleMarginTop = style.marginTop;
              tile.stylePaddingTop = style.paddingTop;
            }
          },
          addTile: function(tile) {
            ListWrapper.push(this.tiles, tile);
          },
          removeTile: function(tile) {
            ListWrapper.remove(this.tiles, tile);
          },
          getBaseTileSize: function(sizePercent, gutterFraction) {
            return ("(" + sizePercent + "% - ( " + this.gutterSize + " * " + gutterFraction + " ))");
          },
          getTilePosition: function(baseSize, offset) {
            return ("calc( (" + baseSize + " + " + this.gutterSize + ") * " + offset + " )");
          },
          getTileSize: function(baseSize, span) {
            return ("calc( (" + baseSize + " * " + span + ") + (" + (span - 1) + " * " + this.gutterSize + ") )");
          },
          getTileStyle: function(tile, rowIndex, colIndex) {
            var percentWidthPerTile = 100 / this.cols;
            var gutterWidthFractionPerTile = (this.cols - 1) / this.cols;
            var baseTileWidth = this.getBaseTileSize(percentWidthPerTile, gutterWidthFractionPerTile);
            var tileStyle = new TileStyle();
            tileStyle.left = this.getTilePosition(baseTileWidth, colIndex);
            tileStyle.width = this.getTileSize(baseTileWidth, tile.colspan);
            switch (this.rowHeightMode) {
              case 'fixed':
                tileStyle.top = this.getTilePosition(this.fixedRowHeight, rowIndex);
                tileStyle.height = this.getTileSize(this.fixedRowHeight, tile.rowspan);
                break;
              case 'ratio':
                var percentHeightPerTile = percentWidthPerTile / this.rowHeightRatio;
                var baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterWidthFractionPerTile);
                tileStyle.marginTop = this.getTilePosition(baseTileHeight, rowIndex);
                tileStyle.paddingTop = this.getTileSize(baseTileHeight, tile.rowspan);
                break;
              case 'fit':
                var percentHeightPerTile = 100 / this.cols;
                var gutterHeightFractionPerTile = (this.rows - 1) / this.rows;
                var baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterHeightFractionPerTile);
                tileStyle.top = this.getTilePosition(baseTileHeight, rowIndex);
                tileStyle.height = this.getTileSize(baseTileHeight, tile.rowspan);
                break;
            }
            return tileStyle;
          }
        }, {});
      }());
      $__export("MdGridList", MdGridList);
      Object.defineProperty(MdGridList, "annotations", {get: function() {
          return [new Component({
            selector: 'md-grid-list',
            properties: {
              'cols': 'cols',
              'rowHeight': 'row-height',
              'gutterSize': 'gutter-size'
            },
            lifecycle: [onAllChangesDone]
          }), new View({templateUrl: 'grid_list.html'})];
        }});
      Object.defineProperty(MdGridList.prototype.addTile, "parameters", {get: function() {
          return [[MdGridTile]];
        }});
      Object.defineProperty(MdGridList.prototype.removeTile, "parameters", {get: function() {
          return [[MdGridTile]];
        }});
      Object.defineProperty(MdGridList.prototype.getBaseTileSize, "parameters", {get: function() {
          return [[$traceurRuntime.type.number], [$traceurRuntime.type.number]];
        }});
      Object.defineProperty(MdGridList.prototype.getTilePosition, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [$traceurRuntime.type.number]];
        }});
      Object.defineProperty(MdGridList.prototype.getTileSize, "parameters", {get: function() {
          return [[$traceurRuntime.type.string], [$traceurRuntime.type.number]];
        }});
      Object.defineProperty(MdGridList.prototype.getTileStyle, "parameters", {get: function() {
          return [[MdGridTile], [$traceurRuntime.type.number], [$traceurRuntime.type.number]];
        }});
      MdGridTile = (function() {
        function MdGridTile(gridList) {
          this.gridList = gridList;
          this.role = 'listitem';
          this.rowspan = 1;
          this.colspan = 1;
        }
        return ($traceurRuntime.createClass)(MdGridTile, {
          set rowspan(value) {
            this._rowspan = isString(value) ? NumberWrapper.parseInt(value, 10) : value;
          },
          get rowspan() {
            return this._rowspan;
          },
          set colspan(value) {
            this._colspan = isString(value) ? NumberWrapper.parseInt(value, 10) : value;
          },
          get colspan() {
            return this._colspan;
          },
          onChange: function(_) {
            if (!this.isRegisteredWithGridList) {
              this.gridList.addTile(this);
              this.isRegisteredWithGridList = true;
            }
          },
          onDestroy: function() {
            this.gridList.removeTile(this);
          }
        }, {});
      }());
      $__export("MdGridTile", MdGridTile);
      Object.defineProperty(MdGridTile, "annotations", {get: function() {
          return [new Component({
            selector: 'md-grid-tile',
            properties: {
              'rowspan': 'rowspan',
              'colspan': 'colspan'
            },
            hostProperties: {
              'styleHeight': 'style.height',
              'styleWidth': 'style.width',
              'styleTop': 'style.top',
              'styleLeft': 'style.left',
              'styleMarginTop': 'style.marginTop',
              'stylePaddingTop': 'style.paddingTop',
              'role': 'role'
            },
            lifecycle: [onDestroy, onChange]
          }), new View({templateUrl: 'grid_tile.html'})];
        }});
      Object.defineProperty(MdGridTile, "parameters", {get: function() {
          return [[MdGridList, new Parent()]];
        }});
      TileCoordinator = (function() {
        function TileCoordinator(numColumns, tiles) {
          var $__0 = this;
          this.columnIndex = 0;
          this.rowIndex = 0;
          console.log(tiles);
          this.tracker = ListWrapper.createFixedSize(numColumns);
          ListWrapper.fill(this.tracker, 0);
          this.positions = ListWrapper.map(tiles, (function(tile) {
            return $__0._trackTile(tile);
          }));
        }
        return ($traceurRuntime.createClass)(TileCoordinator, {
          get rowCount() {
            return this.rowIndex + 1;
          },
          _trackTile: function(tile) {
            if (tile.colspan > this.tracker.length) {
              throw ("Tile with colspan " + tile.colspan + " is wider\n          than grid with cols=\"" + this.tracker.length + "\".");
            }
            var gapStartIndex = -1;
            var gapEndIndex = -1;
            do {
              if (this.columnIndex + tile.colspan > this.tracker.length) {
                this._nextRow();
                continue;
              }
              gapStartIndex = ListWrapper.indexOf(this.tracker, 0, this.columnIndex);
              if (gapStartIndex == -1) {
                this._nextRow();
                continue;
              }
              gapEndIndex = this._findGapEndIndex(gapStartIndex);
              this.columnIndex = gapStartIndex + 1;
            } while (gapEndIndex - gapStartIndex < tile.colspan);
            this._markTilePosition(gapStartIndex, tile);
            this.columnIndex = gapStartIndex + tile.colspan;
            return new Position(this.rowIndex, gapStartIndex);
          },
          _nextRow: function() {
            this.columnIndex = 0;
            this.rowIndex++;
            for (var i = 0; i < this.tracker.length; i++) {
              this.tracker[i] = Math.max(0, this.tracker[i] - 1);
            }
          },
          _findGapEndIndex: function(gapStartIndex) {
            for (var i = gapStartIndex + 1; i < this.tracker.length; i++) {
              if (this.tracker[i] != 0) {
                return i;
              }
            }
            return this.tracker.length;
          },
          _markTilePosition: function(start, tile) {
            for (var i = 0; i < tile.colspan; i++) {
              this.tracker[start + i] = tile.rowspan;
            }
          }
        }, {});
      }());
      Object.defineProperty(TileCoordinator, "parameters", {get: function() {
          return [[$traceurRuntime.type.number], [$traceurRuntime.genericType(List, MdGridTile)]];
        }});
      Object.defineProperty(TileCoordinator.prototype._trackTile, "parameters", {get: function() {
          return [[MdGridTile]];
        }});
      Object.defineProperty(TileCoordinator.prototype._findGapEndIndex, "parameters", {get: function() {
          return [[$traceurRuntime.type.number]];
        }});
      Position = (function() {
        function Position(row, col) {
          this.row = row;
          this.col = col;
        }
        return ($traceurRuntime.createClass)(Position, {}, {});
      }());
      Object.defineProperty(Position, "parameters", {get: function() {
          return [[$traceurRuntime.type.number], [$traceurRuntime.type.number]];
        }});
      TileStyle = (function() {
        function TileStyle() {}
        return ($traceurRuntime.createClass)(TileStyle, {}, {});
      }());
    }
  };
});
