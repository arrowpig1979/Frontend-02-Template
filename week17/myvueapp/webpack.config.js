//const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack =  require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: "./src/main.js",
    module:{
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.js$/,
                use:{
                    'babel-loader',
                    options:{
                        presets:['@babel/presets-env']
                    }
                }
            }
        ]
    },
    plugins:[
        //new HtmlWebpackPlugin({template: './src/index.html'})
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns:[
                {from: 'src/*.html', to: '[name].[ext]'}
            ]
        })
    ]
    
};
