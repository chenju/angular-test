'use strict';
var Funnel = require('broccoli-funnel');
var htmlReplace = require('../html-replace');
var replace = require('broccoli-replace');
var path = require('path');
var broccoli_dest_copy_1 = require('../broccoli-dest-copy');
var projectRootDir = path.normalize(path.join(__dirname, '..', '..', '..', '..'));
module.exports = function makeBrowserTree(options, destinationPath) {
    var modulesTree = new Funnel('modules', {
        include: ['**/**'],
        exclude: ['**/*.cjs', 'benchmarks/e2e_test/**'],
        destDir: '/'
    });
    var servingTrees = [];
    var htmlTree = new Funnel(modulesTree, {
        include: ['*/src/**/*.html'],
        destDir: '/'
    });
    //var scripts = mergeTrees(servingTrees, {overwrite: true});
    var css = new Funnel(modulesTree, { include: ["**/*.css"] });
    return broccoli_dest_copy_1.default(htmlTree, destinationPath);
};

//# sourceMappingURL=../../broccoli/trees/browser_tree.js.map