/** @type {import('next').NextConfig} */

console.log(process.env.NODE_ENV, "-----------------------------------");
// development || production
// 使用 image loader 是因为默认的 next 路径会做处理，这样需要 nginx 支持

let config = {
  reactStrictMode: false, // 禁用严格模式
  env: {
    hashImage: `${new Date().getTime()}`,
  },
  {{#if isRoot}}
  {{else}}
  basePath: "/{{name}}",
  {{/if}}
  images: {
    loader: "custom",
    loaderFile: "./image/loader.js",
  },
};
if (process.env.NODE_ENV === "production") {
  config = Object.assign(config, {
    output: "export",
    trailingSlash: true,
    distDir: "../{{name}}-static",
    {{#if isRoot}}
    {{else}}
    basePath: "/{{name}}-static",
    {{/if}}
  });
}
const nextConfig = config;

export default nextConfig;
