// import "@/app/globals.css";
import Nav from "../_components/Nav/Nav";

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
