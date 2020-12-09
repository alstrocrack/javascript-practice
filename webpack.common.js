const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // mode: 'development',
    entry: {
        main: './src/scripts/main.js',
        vendor: '.src/scripts/three.min.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/scripts'),
        filename: '[name].js',
        chunkFilename: 'js/[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            name: 'vendor',
        },
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['*.js'], // ワイルドカード
        }),
        // new HtmlWebpackPlugin({
        //     template: '.src/html/index.html',
        //     chunks: ['main'],
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'another.html',
        //     template: '.src/html/another.html',
        //     chunks: ['another'],
        // }),
    ],
};