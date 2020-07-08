const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const CopyPlugin = require("copy-webpack-plugin")

const APP_NAME = process.env.npm_package_name

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new WebpackBar(),
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: APP_NAME,
            template: 'src/document.ejs'
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            'process.env.APP_NAME': JSON.stringify(APP_NAME)
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./public",
                    to: "static"
                }
            ]
        })
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        noInfo: true
    },
    externals: {
        Pannellum: 'window.pannellum'
    }
}