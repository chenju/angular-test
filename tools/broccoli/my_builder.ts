var broccoli = require('broccoli');
var fse = require('fs-extra');
var makeBrowserTree = require('./trees/browser_tree');
var printSlowTrees = require('broccoli-slow-trees');
var path = require('path');

export class MyBuilder {

    constructor(private outputPath: string) {}
    private browserDevBuilder: BroccoliBuilder;
    private browserProdBuilder: BroccoliBuilder;


    public rebuildBrowserDevTree(): Promise < BuildResult > {
        this.browserDevBuilder = this.browserDevBuilder || this.makeBrowserDevBuilder();
        return this.rebuild(this.browserDevBuilder);
    }


    public rebuildBrowserProdTree(): Promise < BuildResult > {
        this.browserProdBuilder = this.browserProdBuilder || this.makeBrowserProdBuilder();
        return this.rebuild(this.browserProdBuilder);
    }

    private makeBrowserDevBuilder(): BroccoliBuilder {
        let tree = makeBrowserTree({
                name: 'dev',
                typeAssertions: true
            },
            path.join(this.outputPath, 'js', 'dev'));
        return new broccoli.Builder(tree);
    }


    private makeBrowserProdBuilder(): BroccoliBuilder {
        let tree = makeBrowserTree({
                name: 'prod',
                typeAssertions: false
            },
            path.join(this.outputPath, 'js', 'prod'));
        return new broccoli.Builder(tree);
    }

    private rebuild(builder) {
        return builder.build()
            .then((result) => {
                printSlowTrees(result.graph);
            })
            .catch((err) => {
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
    }
}
