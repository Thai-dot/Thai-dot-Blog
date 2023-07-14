"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import { usePathname } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const inter = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "My Thai-dot blog home",
};

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
        <body className={inter.className}>
          {!notHaveNavbar.includes(pathname) && <Navbar />}

          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
