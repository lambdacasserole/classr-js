const path = require('path');

module.exports = {
    mode: 'production',
    entry: './dist/index.js',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'classr.js',
        libraryTarget: 'var',
        library: `Classr`,
    },
};
