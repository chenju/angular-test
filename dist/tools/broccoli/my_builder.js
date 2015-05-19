var broccoli = require('broccoli');
var fse = require('fs-extra');
var makeBrowserTree = require('./trees/browser_tree');
var printSlowTrees = require('broccoli-slow-trees');
var MyBuilder = (function () {
    function MyBuilder(outputPath) {
        this.outputPath = outputPath;
    }
    MyBuilder.prototype.rebuildBrowserDevTree = function () {
        this.browserDevBuilder = this.browserDevBuilder || this.makeBrowserDevBuilder();
        return this.rebuild(this.browserDevBuilder);
    };
    MyBuilder.prototype.rebuildBrowserProdTree = function () {
        this.browserProdBuilder = this.browserProdBuilder || this.makeBrowserProdBuilder();
        return this.rebuild(this.browserProdBuilder);
    };
    MyBuilder.prototype.makeBrowserDevBuilder = function () {
        var tree = makeBrowserTree({
            name: 'dev',
            typeAssertions: true
        }, path.join(this.outputPath, 'js', 'dev'));
        return new broccoli.Builder(tree);
    };
    MyBuilder.prototype.makeBrowserProdBuilder = function () {
        var tree = makeBrowserTree({
            name: 'prod',
            typeAssertions: false
        }, path.join(this.outputPath, 'js', 'prod'));
        return new broccoli.Builder(tree);
    };
    MyBuilder.prototype.rebuild = function (builder) {
        return builder.build()
            .then(function (result) {
            printSlowTrees(result.graph);
        })
            .catch(function (err) {
            console.error(err.toString());
            // Should show file and line/col if present
            if (err.file) {
                console.error('File: ' + err.file);
            }
            if (err.stack) {
                console.error(err.stack);
            }
            throw err;
        });
    };
    return MyBuilder;
})();
exports.MyBuilder = MyBuilder;

//# sourceMappingURL=../broccoli/my_builder.js.map