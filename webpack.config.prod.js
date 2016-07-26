var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    progress: true,
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
            { test: /\.scss$/, loaders: [
                'style',
                'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
                'autoprefixer?browsers=last 2 version',
                'sass?outputStyle=expanded&sourceMap'
            ] },
            { test: /(\.jpg|\.png)$/, loader: 'url?limit=10000' }
        ]
    },
    plugins: [
        // css files from the extract-text-plugin loader
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),

        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),

        new webpack.DefinePlugin({
            'process.env': {
                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })

    ]
};
