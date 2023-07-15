"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { usePathname } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const theme = createTheme({
    typography: {
      fontFamily: "Inter,sans-serif",
    },
  });

  const notHaveNavbar = ["/login"];
  console.log(pathname);
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={classNames(inter.className, 'bg-slate-100 relative pt-20')}>
          {!notHaveNavbar.includes(pathname) && <Navbar />}

          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
