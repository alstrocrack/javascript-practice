// gulpプラグインの読み込み
const gulp = require("gulp");

// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");

// styleMedia.scssのタスクを作成する
gulp.task("default", function(){
    // style.scssファイルを監視
    return gulp.watch("styles/style.scss", function(){
        // styleMedia.scssの更新があった場合の処理

        // style.scssファイルを取得
        return (
            gulp
                .src("styles/style.scss")
                // Sassのコンパイルを実行
                .pipe(
                    sass({
                    outputStyle: "expanded"
                    })
                    // Sassのコンパイルエラーを表示
                    .on("error", sass.logError)
                )
                // cssフォルダーを以下に保存
                .pipe(gulp.dest("dist/styles"))
                
        );
    });
});

