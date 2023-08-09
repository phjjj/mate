"use client";

import "./globals.css";
import StyledComponentsRegistry from "./registry";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionProvider>
        <StyledComponentsRegistry>
          <body suppressHydrationWarning={true}>
            <div id="overlays"></div>
            {children}
          </body>
        </StyledComponentsRegistry>
      </SessionProvider>
    </html>
  );
}
