let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

//folders
let src = 'src';
let app = 'public';

module.exports = {

    context: path.resolve(__dirname, src),
    entry: {
        client: './client'
    },
    output: {
        path: path.resolve(__dirname, app),
        filename: './[name].js'
    },
    resolve: {
        extensions: [
            '', '.js', '.ts'
        ],
        alias: {
            root: path.join(__dirname, src)
        }
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime', 'transform-async-to-generator'],
                    cacheDirectory: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // our index template with client chunk
            template: './index.html',
            chunks: ['client']
        }),
        new webpack.ProvidePlugin({ // get jquery module when we need in the whole code
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, app),
        hot: true,
        historyApiFallback: true
    }

};