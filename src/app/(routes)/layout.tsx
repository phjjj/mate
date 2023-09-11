import Nav from "../_components/Nav/Nav";
import styles from "./layout.module.css";
export const metadata = {
  title: "mate",
  viewport: {
    width: "device-width",
    maximumScale: 1,
    initialScale: 1,
    userScalable: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          overflow: "hidden",
          position: "fixed",
          top: "0px",
          width: "100%",
          height: "100%",
        }}
        suppressHydrationWarning={true}>
        <main className={styles.app}>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
