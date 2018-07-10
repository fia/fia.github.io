# 条码扫码记录器

## 线上地址

[发布于github.io上的线上项目](https://fia.github.io/Webapck-React-QRInput/dist/)

## 主要功能

- 连接扫码枪录入条码单号，记录数据判断是否有重复单号。
- 通过浏览器本地存储记录，可导出/导入记录数据。

## 环境

- 现代浏览器

## 代码架构

通过此案例达成前端开发架构的环境

- React v16.2
- Webpack v4.1
- Yarn
- GitHub

### 前端涉及知识点及功能模块

- React开发
- HTML localStorage读写
- HTML页面内容导出文件(Blob)
- HTML页面导入文件内容(FileReader)
- 时间格式处理
- 发布文件缓存设置(splitChunks,hash)

### Webpack配置

- config文件配置
  - 新版本配置写法
    - rules
      - loader
    - optimization
      - runtimeChunk
      - splitChunks
  - common、dev、prod分开配置
- 插件应用
  - mini-css-extra-plugin
  - html-webpack-plugin
  - clean-webpack-plugin
  - webpack-merge
  - optimize-css-assets-webpack-plugin
  - webpack-md5-hash
