const path = require('path');
const webpack = require('webpack');
const WatchTimePlugin = require('webpack-watch-time-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
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
        WatchTimePlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: (module) => {
                // if (module.resource == 'D:\\Programming\\VirtualShare\\Projects\\vue-ts\\src\\styles.scss') {
                //   var json = JSON.stringify(module, filterJson(), '\t');
                //   console.log(json);
                // }
                return typeof module.resource === 'string' &&
                    (module.resource.indexOf('node_modules') !== -1 ||
                        module.resource.indexOf('vendor.scss') !== -1);
            }
        }),
        new ExtractTextPlugin('[name].css'),
        //new BundleAnalyzerPlugin()
    ],
    resolve: {
        alias: {
            "root": path.resolve(__dirname, "./frontend"),
            "components": "root/components",
            "../../theme.config": "semantic-ui-less/theme.config.example",
            "./themes/themes/default": "semantic-ui-less/themes/default",
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