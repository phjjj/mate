import Nav from "../_components/Nav/Nav";

export const metadata = {
  title: "mate",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
