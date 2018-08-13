var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

var config = {
    mode: "development",
    entry: {
        main: './main'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
                // include: [
                //     path.resolve(__dirname, "./images"),
                // ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin("main.css")
    ]
};

module.exports = config;