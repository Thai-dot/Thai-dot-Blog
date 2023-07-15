import Image from "next/image";
import MainButton from "@/components/Buttons/Button/MainButton";
import HomePost from "@/components/Posts/HomePost/HomePost";
import Home from "@/app/home";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Home",
  description: "My Thai-dot blog home",
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
