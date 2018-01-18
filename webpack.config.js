const { resolve } = require('path');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: resolve('src'),
    entry: './app.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                },
            },
            {
                test: /\.less$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'less-loader']
                // }),
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.ejs',
            hash: true
        }),
        // new ExtractTextPlugin('bundle.css')
    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        compress: true,
        port: 8899,
        open: true
    }
}
