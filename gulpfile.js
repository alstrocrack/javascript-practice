'use strict';

// gulp設定部分
const { src, dest, watch} = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");

// 以下コンパイル部分
// Sassをコンパイルする
const compileSass = () =>
   src("src/styles/*.scss")
   .pipe(
       sass({
           outputStyle: "expanded"
       })
       .on("error", sass.logError)
   )
   .pipe(dest("dist/styles"));

// Sassファイルを監視
const watchSassFiles = () => 
  watch("src/styles/*.scss", compileSass);

// pugをコンパイルする
const compilePug = () =>
   src("src/*.pug")
   .pipe(
       pug({
           pretty: true
       })
       .on("error", pug.logError)
   )
   .pipe(dest("dist"));

// pugファイルを監視
const watchPugFiles = () =>
   watch("src/*.pug", compilePug);

// npx gulpで実行される関数
exports.default = () =>
   watchSassFiles();
   watchPugFiles();
