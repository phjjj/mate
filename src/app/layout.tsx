"use client";

import { RecoilRoot } from "recoil";
import "./globals.css";
import { styled } from "styled-components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </head>
      <body suppressHydrationWarning={true}>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
