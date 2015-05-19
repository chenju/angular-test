System.config({
    baseURL: '',
    transpiler: 'traceur',
    traceurOptions: {
        modules: 'instantiate',
        moduleName: true,
        annotations: true,
        types: true,
        memberVariables: true
    },

    paths: {
        'jquery-cdn': 'https://code.jquery.com/jquery-2.1.1.min.js',
        "angular2/*": "../node_modules/angular2/es6/prod/*.es6",
        "rx": "../node_modules/angular2/node_modules/rx/dist/rx.js",
        "isence":"./modules/isence/src/*.js"
    },
    meta: {
        'jquery-cdn': {
            build: false
        },
        'angular2/angular2': {
            build: false
        }
    }

})
