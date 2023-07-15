import type { Metadata } from "next";
import setMetaData from "@/utils/metadata";


export const metadata = setMetaData("Login", "Thai-dot login blog");

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
