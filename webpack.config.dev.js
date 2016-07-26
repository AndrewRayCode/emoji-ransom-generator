var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join( __dirname, 'static' ),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'react-hot', 'babel?presets[]=es2015&presets[]=react&presets[]=stage-0&plugins[]=transform-decorators-legacy' ] },
            { test: /\.scss$/, loaders: [
                'style',
                'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
                'sass?outputStyle=expanded&sourceMap'
            ] },
            { test: /(\.jpg|\.png)$/, loader: 'url?limit=10000' }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            alwaysWriteToDisk: true,
        })
    ]
};
