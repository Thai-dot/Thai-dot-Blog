import type { Metadata } from "next";
import { Epilogue } from "next/font/google";

const inter = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "My Thai-dot blog home",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
