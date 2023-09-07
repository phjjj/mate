import Provider from "./_components/Provider/Provider";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Provider>
        <StyledComponentsRegistry>
          <body suppressHydrationWarning={true}>
            <div id="overlays"></div>
            {children}
          </body>
        </StyledComponentsRegistry>
      </Provider>
    </html>
  );
}
