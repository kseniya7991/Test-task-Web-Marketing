const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
          },
        open: true,
        compress: true,
        port: 8080
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource',
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
        }, 
        {
            test: /\.(sass|scss|svg|png|jpe?g)$/,
            use: [
             'style-loader', 
             {
                 loader: 'css-loader?url=false',
                 options: {
                    sourceMap: true,
                 }
             },
             'postcss-loader', 
             {
                loader: "resolve-url-loader", //resolve-url-loader needs to come *BEFORE* sass-loader
                options: {
                  sourceMap: true
                }
              },
             {
                loader: 'sass-loader',
                options: {
                   sourceMap: true,
                   sassOptions: {
                    includePaths: [
                        './src/styles',
                      ],
                   }
                },
            }],
          },
       ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/template.html',
            filename: 'index.html', 
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}