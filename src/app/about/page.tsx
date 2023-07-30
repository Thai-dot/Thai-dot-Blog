import Image from "next/image";
import MainButton from "@/components/Buttons/Button/MainButton";
import HomePost from "@/components/Posts/HomePost/HomePost";
import type { Metadata } from "next";
import Avatar from "@/assets/avatar.jpg";

import setMetaData from "@/utils/metadata";
import { centerLayoutClass } from "@/constant/classname/classname";
import Link from "next/link";

export const metadata: Metadata = setMetaData(
  "About me",
  "My about me Thai-dot blog"
);

export default function HomePage() {
  const centerLayout = centerLayoutClass;
  return (
    <section
      className={`flex flex-col md:flex-row justify-center   ${centerLayout}  px-32`}
    >
      <article className="w-full md:w-3/5">
        <h1 className="mt-10">Về tôi</h1>
        <p className="text-neutral-600 text-sm md:text-base lg:text-lg w-2/3 mt-12 md:mt-18 lg:mt-20">
          Chào mọi người 🤞 Mình là Nguyễn Hoàng Thái. Mình tốt nghiệp cử nhân
          ngành công nghệ thông tin từ trường HCMUS. Hiện tại công việc chính
          của mình là front-end developer 😊
        </p>

        <div className="flex gap-6 mt-4 md:mt-6 w-full">
          <Link href="/">
            <MainButton text="Home" />
          </Link>
          <Link href="/list">
            <MainButton text="Blog list" variant="text" />
          </Link>
        </div>
      </article>
      <div className="w-full md:w-2/5 mt-8 md:mt-0  ">
        <Image
          src={Avatar}
          className="rounded-full border-2 shadow-2xl"
          alt="Thai-dot avatar"
        />
      </div>
    </section>
  );
}
