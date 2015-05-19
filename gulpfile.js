'use strict';

var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
//var format = require('gulp-clang-format');
var exec = require('child_process').exec;
//var fork = require('child_process').fork;
var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();
var sass = require('gulp-sass');

//var shell = require('gulp-shell');
var runSequence = require('run-sequence');
//var madge = require('madge');
//var merge = require('merge');
var merge2 = require('merge2');
var path = require('path');
var semver = require('semver');
var watch = require('gulp-watch');

var clean = require('./tools/build/clean');


var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');
//var transpile = require('./tools/build/transpile');
//var pubget = require('./tools/build/pubget');
//var linknodemodules = require('./tools/build/linknodemodules');
//var pubbuild = require('./tools/build/pubbuild');
//var dartanalyzer = require('./tools/build/dartanalyzer');
//var jsserve = require('./tools/build/jsserve');
//var pubserve = require('./tools/build/pubserve');
//var rundartpackage = require('./tools/build/rundartpackage');
//var file2moduleName = require('./tools/build/file2modulename');
//var karma = require('karma');
//var minimist = require('minimist');
//var runServerDartTests = require('./tools/build/run_server_dart_tests');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
//var util = require('./tools/build/util');
var bundler = require('./tools/build/bundle');
//var replace = require('gulp-replace');
//var insert = require('gulp-insert');


function throwToolsBuildMissingError() {
  throw new Error('ERROR: build.tools task should have been run before using angularBuilder');
}

var angularBuilder = {
  rebuildBrowserDevTree: throwToolsBuildMissingError,
  rebuildBrowserProdTree: throwToolsBuildMissingError,
  rebuildNodeTree: throwToolsBuildMissingError,
  rebuildDartTree: throwToolsBuildMissingError,
  cleanup: function() {}
};

//检查node版本
(function checkNodeAndNpmVersions() {
  var requiredNpmVersion = '>=2.9.0';
  var requiredNodeVersion = '>=0.10.x'; // TODO: bump this to 0.12 once travis runs on 0.12

  exec('npm --version', function(e, stdout) {
    var foundNpmVersion = semver.clean(stdout);
    var foundNodeVersion = process.version;
    var issues = [];


    if (!semver.satisfies(foundNodeVersion, requiredNodeVersion)) {
      issues.push('You are running unsupported node version. Found: ' + foundNodeVersion +
        ' Expected: ' + requiredNodeVersion);
    }

    if (!semver.satisfies(foundNpmVersion, requiredNpmVersion)) {
      issues.push('You are running unsuported npm version. Found: ' + foundNpmVersion +
        ' Expected: ' + requiredNpmVersion);
    }

    if (issues.length) {
      // TODO: in the future we should error, but let's just display the warning for a few days first
      console.warn(Array(80).join('!'));
      console.warn('Your environment is not in a good shape. Following issues were found:');
      issues.forEach(function(issue) {console.warn('  - ' + issue)});
      console.warn(Array(80).join('!'));
    }
  });
}())


var CONFIG = {
    src: {
      js: 'modules/isence/src/**/*.js',
      html: 'modules/isence/src/**/*.html',
      scss: 'modules/isence/src/**/*.scss'
    },
    lib: [
      'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
      'node_modules/systemjs/lib/extension-register.js',
      'node_modules/angular2/node_modules/zone.js/zone.js',
      'node_modules/angular2/node_modules/zone.js/long-stack-trace-zone.js'
    ],
    dest:{
      js:'dist/js',
      css:'dist/css',
      html:'dist'
    }
};

gulp.task('build/clean.tools', function() {
  del(path.join('dist', 'tools'));
});

gulp.task('build/clean.js', clean(gulp, gulpPlugins, {
  path: CONFIG.dest.js
}));

gulp.task('clean',['build/clean.js','build/clean.tools'])





//安装支持库
gulp.task('libs', ['angular2'], function () {
    var size = require('gulp-size');
    return gulp.src(CONFIG.lib)
      .pipe(size({showFiles: true, gzip: true}))
      .pipe(gulp.dest('dist/lib'));
});

//打包安装angular
gulp.task('angular2', function () {

  var buildConfig = {
    paths: {
      "angular2/*": "node_modules/angular2/es6/prod/*.es6",
      "rx": "node_modules/angular2/node_modules/rx/dist/rx.js"
    }
  };

  var Builder = require('systemjs-builder');
  var builder = new Builder(buildConfig);

  return builder.build('angular2/angular2', 'dist/lib/angular2.js', {});
});




//js编译为es5
gulp.task('build.js.prod', function () {
    return gulp.src(CONFIG.src.js)
        .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(plumber())
        .pipe(traceur({
            
            moduleName: false,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(gulp.dest(CONFIG.dest.js));
});

gulp.task('build.js.material', function(done) {
  runSequence('build.js.prod', 'build.css.material', done);
});

//编译css 



gulp.task('build.css.material', function() {
  return gulp.src(CONFIG.src.scss)
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(plumber.stop())
      .pipe(gulp.dest(CONFIG.dest.js))
});



gulp.task('html', function() {
    return gulp.src(CONFIG.src.html)

        .pipe(gulp.dest('dist'));
});

gulp.task('bundle.js.prod', function() {
  return bundler.bundle(
      "./tools/build/bundle.config.js",
      'isence/*',
      './dist/build/isence.js',
      {
        sourceMaps: true
      });
});

gulp.task('build.tools', ['build/clean.tools'], function(done) {
  runSequence('!build.tools', done);
});


// private task to build tools
gulp.task('!build.tools', function() {
  var tsResult = gulp.src(['tools/**/*.ts'])
      .pipe(sourcemaps.init())
      .pipe(tsc({target: 'ES5', module: 'commonjs', reporter: tsc.reporter.nullReporter(),
                 // Don't use the version of typescript that gulp-typescript depends on, we need 1.5
                 // see https://github.com/ivogabe/gulp-typescript#typescript-version
                 typescript: require('typescript')}))
      .on('error', function(error) {
        // gulp-typescript doesn't propagate errors from the src stream into the js stream so we are
        // forwarding the error into the merged stream
        mergedStream.emit('error', error);
      });

  var destDir = gulp.dest('dist/tools/');

  var mergedStream = merge2([
    tsResult.js.pipe(sourcemaps.write('.')).pipe(destDir),
    tsResult.js.pipe(destDir)
  ]).on('end', function() {
    var MyBuilder = require('./dist/tools/broccoli/my_builder').MyBuilder;
    angularBuilder = new MyBuilder('dist');
  });

  return mergedStream;
});



