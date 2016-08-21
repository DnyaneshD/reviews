var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var typescript = require('typescript');
eventStream = require('event-stream')

gulp.task("compile", function () {
    // return tsProject.src()
    //     .pipe(ts(tsProject))
    //     .js.pipe(gulp.dest("./"));
    
    var tsResult = gulp.src(['./**/*.ts', '!./node_modules/**', '!./**/typings/**', '!./**/*.d.ts'])
        .pipe(ts({
            typescript: typescript,
            declarationFiles: true,
            target: 'ES5',
            module: 'commonjs',
            experimentalDecorators: true,
            emitDecoratorMetadata: true
            }).on('error', function (err) {
                gutil.log('**************** TypeScript Compilation Error *******************************')		
                gutil.log('****************        Stopping build        *******************************')
                process.exit('1');
        }));
    return eventStream.merge(
        tsResult.js
            .pipe(gulp.dest('./'))
    );
});





