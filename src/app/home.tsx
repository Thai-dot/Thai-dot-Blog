import Image from "next/image";
import MainButton from "@/components/Buttons/Button/MainButton";
import HomePost from "@/components/Posts/HomePost/HomePost";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-24 lg:px-52 md:px-32 px-20  pt-8  ">
      <h1 className="mt-2 text-center">Chào mừng đến Thai-dot Blog</h1>
      <p className="my-10 text-center">Nơi chia sẻ kiến thức của mình</p>
      <h4 className="lg:text-2xl md:text-xl text-base text-left mb-4">
        Bài viết mới
      </h4>
      <div className="flex flex-col gap-4">
        <HomePost />
        <HomePost />
        <HomePost />
      </div>
      <div className="flex justify-center my-7">
        <MainButton text="Xem thêm bài viết" />
      </div>
    </main>
  );
}
