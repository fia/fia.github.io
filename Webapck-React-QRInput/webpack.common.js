const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        // vendor: ["react"],
        app: "./src/index.js"
    },
    output: {
        // filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"]
                    }
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
                // styles: {
                //     name: "styles",
                //     test: /\.(css|scss)$/,
                //     chunks: "all",
                //     enforce: true
                // }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "条码扫码记录器v0.2",
            template: path.join(__dirname, 'src/index.html')
        })
        // new MiniCssExtractPlugin({
        //     // filename: "[name].[chunkhash:8].css"
        //     chunkFilename: "[name].[contenthash:8].css"
        // })
        // new ExtractTextPlugin("[name].[contenthash].css", {
        //     allChunks: true
        // })
    ]
};
