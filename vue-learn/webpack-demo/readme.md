# webpack配置vue项目小demo

## use

`npm run dev`

## 注意点

`extract-text-webpack-plugin`插件暂不支持webpack4.X因此要安装一个别的版本
```
npm install --save-dev extract-text-webpack-plugin@next
```
在`webpack.config.js`中加入修改
```
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var config = {
    ...

    plugins: [
        new VueLoaderPlugin()
        ...
    ]
}
```

## update
对生产环境下的js和css文件做了压缩合并
```
npm run build
```