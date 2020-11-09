
const { series, parallel, reload, watch } = require("gulp");
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const imageminJpg = require("imagemin-jpeg-recompress");
const imageminPng = require("imagemin-pngquant");
const imageminGif = require("imagemin-gifsicle");
const svgmin = require("gulp-svgmin");

const  paths = {
    "root": "dist/",
    "sass": "src/styles/style.scss",
    "css": "dist/styles/",
    "pug": "src/index.pug",
    "html": "dist/",
    "js": "src/scripts/main.js",
    "jsMin": "dist/scripts/",
    "image": "src/images/*.+(jpg|jpeg|png|gif|svg)",
    "imageMin": "dist/assets/images/"
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
gulp.task("js", function(done) {
    return gulp.src(paths.js)
        .pipe(babel({
            "presets": ["@babel/preset-env"]
        }))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsMin));
    done();
});

// image minify
gulp.task('imagemin', function(done){
    gulp.src(paths.image)
        .pipe(changed(paths.imageMin))
        .pipe(imagemin([
            imageminPng(),
            imageminJpg(),
            imageminGif({
                interlaced: false,
                optimizationLevel: 3,
                colors: 180
            })
        ]))
        .pipe(gulp.dest(paths.imageMin));
        done();
});

// svg minify
gulp.task("svgmin", function(done){
    gulp.src(paths.image, {allowEmpty: true})
        .pipe(changed(paths.imageMin))
        .pipe(svgmin())
        .pipe(gulp.dest(paths.imageMin));
    done();
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
gulp.task("publish", parallel("imagemin", "svgmin"));
