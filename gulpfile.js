
const { series, parallel, reload, watch } = require("gulp");
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

const  paths = {
    "root": "dist/",
    "sass": "src/styles/style.scss",
    "css": "dist/styles/",
}

// sass
gulp.task("sass", function(){
    return (
        gulp
            .src(paths.sass)
            .pipe(sass({outputStyle: "expanded"})).on("error", sass.logError)
            .pipe(gulp.dest(paths.css))
    );
});

// browserSync
gulp.task("browsersync", function(){
    return browserSync.init({
        server: {
            baseDir: paths.root
        },
        reloadOnRestart: true
    });
});

// browserSync reload
gulp.task("reload", function(done){
    browserSync.reload();
    done();
});

// watch
gulp.task("watch", function(done){
    watch([paths.sass], series("sass", "reload"));
    done();
});

gulp.task("default", parallel("watch", "browsersync"));
