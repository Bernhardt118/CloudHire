//webpack.js.org
const path = require('path');
const { EvalDevToolModulePlugin } = require('webpack');

module.exports = {
    entry: './frontend/src/app.js',
    output:  {
        path: path.join(__dirname, 'frontend/public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            //This wil test the files that has a .js 
            //If it sees a .js file run it thru babel.
            test: /\.js$/,
            //Excludes a set of given files and here we exclude the node modules
            //This means that babel will not run these files.
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use :[
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]

    },
    //The source map lets chrome check where the original error was
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'frontend/public'),
        historyApiFallback: true
    }
};