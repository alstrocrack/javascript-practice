'use strict';

// gulp設定部分
const gulp = require("gulp");
const sass = require("gulp-sass");
// const rename = require("gulp-rename");
// const uglify = require("gulp-uglify");

gulp.task("default", function(){
    return gulp.watch("src/styles/style.scss", function(){
        return (
            gulp
                .src("src/styles/style.scss")
                .pipe(
                    sass({
                    outputStyle: "expanded"
                    })
                    .on("error", sass.logError)
                )
                .pipe(gulp.dest("dist/styles"))
        )
    })
})


// gulp.task("js-minify", function() {
//     gulp.src('src/scripts/*.js')
//         .pipe(uglify())
//         .pipe(rename({
//             extname: '.min.js'
//         }))
//         .pipe(gulp.dest("dist/scripts/"));
// });

