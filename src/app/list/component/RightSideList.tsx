import HomePost from "@/components/Posts/HomePost/HomePost";
import React from "react";

export default function RightSideList() {
  return (
    <section>
      <p className="text-sm md:text-base text-neutral-900 mb-4  ">
        Có tất cả 150 bài viết
      </p>
      <div className="">
        <HomePost />
        <HomePost />
        <HomePost />
      </div>
    </section>
  );
}
