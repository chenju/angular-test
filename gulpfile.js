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
//var runSequence = require('run-sequence');
//var madge = require('madge');
//var merge = require('merge');
//var merge2 = require('merge2');
var path = require('path');
//var semver = require('semver');
var watch = require('gulp-watch');

//var clean = require('./tools/build/clean');
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
//var sourcemaps = require('gulp-sourcemaps');
//var tsc = require('gulp-typescript');
//var util = require('./tools/build/util');
//var bundler = require('./tools/build/bundle');
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
  dest: {
    js: {
      all: 'dist/js',
      dev: {
        es6: 'dist/js/dev/es6',
        es5: 'dist/js/dev/es5'
      },
      prod: {
        es6: 'dist/js/prod/es6',
        es5: 'dist/js/prod/es5'
      },
      cjs: 'dist/js/cjs',
      dart2js: 'dist/js/dart2js'
    },
    dart: 'dist/dart',
    docs: 'dist/docs'
  },
  formatDart: {
    packageName: 'dart_style',
    args: ['dart_style:format', '-w', 'dist/dart']
  }
};

gulp.task('build/clean.tools', function() {
  del(path.join('dist', 'tools'));
});

gulp.task('default', ['build/clean.tools']);