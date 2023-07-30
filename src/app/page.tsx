import MainButton from "@/components/Buttons/Button/MainButton";
import HomePost from "@/components/Posts/HomePost/HomePost";

import { db } from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
  description: "My Thai-dot blog home",
};

export default async function HomePage() {
  const firstThreePost = await db.post.findMany({
    take: 3,
    orderBy: {
      createAt: "desc",
    },
    where: {
      isVerified: true,
    },
  });


  if (!firstThreePost) return notFound();

  return (
    <div>
      <main className="flex min-h-screen flex-col  p-24 lg:px-52 md:px-32 px-20  pt-8  ">
        <h1 className="mt-2 text-center">Chào mừng đến Thai-dot Blog</h1>
        <p className="my-10 text-center">Nơi chia sẻ các kiến thức</p>
       
        <h4 className="lg:text-2xl md:text-xl text-base text-left mb-4">
          Bài viết mới
        </h4>
        <div className="flex flex-col gap-4">
          {firstThreePost.map((post, index: number) => {
            return (
              <HomePost
                key={index}
                description={post.description}
                image={post?.image ?? undefined}
                type={post.type}
                readMinute={post.readMinute}
                createAt={post.createAt.toString()}
                title={post.title}
              />
            );
          })}
        </div>
        <div className="flex justify-center my-7">
          <Link href="/list">
            <MainButton text="Xem thêm bài viết" />
          </Link>
        </div>
      </main>
    </div>
  );
}
