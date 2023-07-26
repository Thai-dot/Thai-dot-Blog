import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Providers from "@/components/Providers/Providers";
import classNames from "classnames";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        id="body"
        className={classNames(
          inter.className,
          "bg-slate-100 relative",
          "pt-20"
        )}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="light"
            transition={Flip}
          />
        </Providers>
      </body>
    </html>
  );
}
