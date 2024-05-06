"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { initWechat } from "./_lib/wechat";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>榜样故事-江苏银行上海分行</title>
        <Script
          src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"
          onLoad={initWechat}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
