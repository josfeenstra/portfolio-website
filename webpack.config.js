const path = require('path');

// setup webpack using the ts-loader
module.exports = {
    devtool: "eval-source-map", // just source-map is slower, but nicer
    entry: "./src/index.ts", 
    module: {
        // rules for the linker
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
    resolve : {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        filename: 'app.js',
        // lazy: true,
        contentBase: path.join(__dirname, 'build'),
        
        // publicPath: "src",
        
        // path: path.resolve(__dirname, 'build'),
        
        // compress: true,
        // hot: true
    }
}