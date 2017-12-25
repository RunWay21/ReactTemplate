var path = require('path');
var webpack = require('webpack');
var WatchTimePlugin = require('webpack-watch-time-plugin');

module.exports = {
    entry: {
        app: ['./Frontend/Main.jsx']
    },
    output: {
        path: path.resolve(__dirname, './Content'),
        publicPath: '/Content/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff2?)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devtool: '#eval-source-map',
    plugins: [
        WatchTimePlugin
    ],
    resolve: {
        alias: {
            "root": path.resolve(__dirname, "./frontend"),
            "components": "root/components"
        }
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}