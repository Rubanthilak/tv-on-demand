const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: {
        app: './style'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/', // this is added inorder to overwrite the url() in the css file.
                    },
                  },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    {
                        loader: 'css-loader', //translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader', //compiles Sass to CSS, using Node-Sass by default
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.scss', '.css', '.js'],
        modules: [
            path.resolve(__dirname, "node_modules"),
        ],
    },
    output: {
        filename: `js/script.js`,
        path: path.resolve(__dirname, 'assets'),
        publicPath: ASSET_PATH
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ],
}