const path = require('path');

module.exports = {
    // mode: 'development',
    entry: './src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/scripts'),
        filename: 'main.js',
    },
};