- vite.config.ts中引入vite-plugin-eslint插件报错解决办法
  https://2048.csdn.net/682c20ad606a8318e857e1b6.html
  解决办法
  1、打开node_modules/vite-plugin-eslint/package.json文件

```js
"exports": {
  ".": {
    "import": "./dist/index.mjs",
    "require": "./dist/index.js",
    "types": "./dist/index.d.ts"
  }
},
```

