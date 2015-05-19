var gulp = require('gulp');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var insert = require('gulp-insert');

module.exports.bundle = function(buildConfig, moduleName, outputFile, outputConfig,
    sfx) {
    var sfx = sfx || false;
    // loading it earlier interfers with custom traceur.
    var Builder = require('systemjs-builder');
    var builder = new Builder();
    
    builder.loadConfig(buildConfig).then(function() {


        //builder.config(buildConfig);

        if (sfx) {
            return builder.buildSFX(moduleName, outputFile, outputConfig);
        } else {
            console.log(builder.paths)
            return builder.build(moduleName, outputFile, outputConfig);
        }
    });

    //console.log(buildConfig)


}


module.exports.modify = function(srcs, concatName) {
    return gulp.src(srcs)
        .pipe(concat(concatName))
        .pipe(replace('sourceMappingURL', 'sourceMappingURLDisabled')) // TODO: add concat for sourceMaps
}
