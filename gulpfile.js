
const { series, parallel, reload, watch } = require("gulp");
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

const  paths = {
    "root": "dist/",
    "sass": "src/styles/style.scss",
    "css": "dist/styles/",
    "pug": "src/index.pug",
    "html": "dist/",
    "js": "src/scripts/main.js",
    "jsMin": "dist/scripts/"
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

const pugOptions = {
    pretty: true,
    baseDir: paths.root
};

// pug
gulp.task("pug", function(done){
    return gulp.src(paths.pug)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(pug(pugOptions))
        .pipe(gulp.dest(paths.html));
    done();
})

//js uglify
gulp.task("js", function() {
    return gulp.src(paths.js)
        .pipe(babel({
            "presets": ["@babel/preset-env"]
        }))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsMin));
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
    watch([paths.pug], series("pug", "reload"));
    watch([paths.js], series("js", "reload"));
    done();
});

gulp.task("default", parallel("watch", "browsersync"));
