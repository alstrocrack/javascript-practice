# javascript-practice

開発環境について

## versions

- node 10.13.0
- npm 6.9.0
- gulp
  - CLI version: 2.2.0
  - Local version: 4.0.2
  
## languages
- HTML -> Pug
- CSS -> Sass
- JavaScript -> Javascript

## commands
- `npx gulp`
→デフォルトのコマンド。sass、pugのコンパイル（ウォッチ）、jsファイルの圧縮とbrowser-syncの開始。
***スタイルに関しては`_config.scss`を変更しただけではコンパイルが発生しないので、`style.scss`で保存する必要がある。***
- `npx gulp publish`
→画像の圧縮を始める。***デフォルトには含まれていないので、このコマンドを実行しないと、`src`ディレクトリに画像をおくだけでは表示されない。***

## npm plugins
```
@babel/core@7.12.3
@babel/preset-env@7.12.1
browser-sync@2.26.12
gulp@4.0.2
gulp-autoprefixer@7.0.1
gulp-babel@8.0.0
gulp-changed@4.0.2
gulp-imagemin@7.1.0
gulp-notify@3.2.0
gulp-plumber@1.2.1
gulp-pug@4.0.1
gulp-rename@2.0.0
gulp-sass@4.1.0
gulp-svgmin@3.0.0
gulp-uglify@3.0.2
imagemin-gifsicle@7.0.0
imagemin-jpeg-recompress@7.0.0
imagemin-pngquant@9.0.1
pug@3.0.0
```
