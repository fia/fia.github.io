const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    output: {
        filename: "[name].js",
        // path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    // "css-loader",
                    // "sass-loader"
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                        options: {
                            // If you are having trouble with urls not resolving add this setting.
                            // See https://github.com/webpack-contrib/css-loader#url
                            url: false,
                            // minimize: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader", // 将 Sass 编译成 CSS
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
