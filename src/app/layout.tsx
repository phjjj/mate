"use client";

import { RecoilRoot } from "recoil";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionProvider>
        <StyledComponentsRegistry>
          <body suppressHydrationWarning={true}>
            <RecoilRoot>{children}</RecoilRoot>
          </body>
        </StyledComponentsRegistry>
      </SessionProvider>
    </html>
  );
}
