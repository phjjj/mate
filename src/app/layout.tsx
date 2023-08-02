"use client";

import { RecoilRoot } from "recoil";
import "./globals.css";
import StyledComponentsRegistry from "./registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <head>
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        </head>
        <body suppressHydrationWarning={true}>
          <RecoilRoot>{children}</RecoilRoot>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
