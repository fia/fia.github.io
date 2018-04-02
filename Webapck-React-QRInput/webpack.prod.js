const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    devtool: "false",
    output: {
        filename: "[name].[chunkhash:8].js"
        // path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin({})]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new webpack.HashedModuleIdsPlugin(),
        new UglifyJSPlugin(),
        new MiniCssExtractPlugin({
            // filename: "[name].[chunkhash:8].css"
            chunkFilename: "[name].[contenthash:8].css"
        })
    ]
});
