"use client";

// 图片的前置路径，设置为 basePath 的值
{{#if isRoot}}
const prefix = "";
{{else}}
const prefix = "/{{name}}";
{{/if}}

export default function myImageLoader({ src, width, quality }) {
  return `${prefix}${src}?w=${width}&q=${quality || 75}&v=${
    process.env.hashImage
  }`;
}
