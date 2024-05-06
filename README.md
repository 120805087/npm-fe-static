# 使用 nextJS 将项目打包为静态网站

> build 的路径为项目同级目录，可在 `next.config.mjs` 中修改

> 项目部署如果在根目录， 可修改`next.config.mjs` 中的 `basePath` 为空字符串， 同时要修改 `image/loader.js` 文件中，图片的前置路径为空字符串

## 安装依赖

```bash
npm install
```

## 运行项目

```bash
npm run dev
```

## 打包项目

```bash
npm run build
```
