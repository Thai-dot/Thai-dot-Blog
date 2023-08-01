import { FC } from "react";
import PageSlugProps from "@/types/type/PageSlugProps";
import { db } from "@/lib/db";
import EditorOutput from "@/components/EditorOutput/EditorOutput";
import { notFound } from "next/navigation";
import moment from "moment";
import RemoveRedEyeIconLib from "@/lib/muiIcon/RemoveRedEyeIcon";
import Image from "next/image";
import { FacebookShareButton, FacebookIcon } from "react-share";
import FBShareButtons from "@/components/ReactShare/FacebookShare";
import TWShareButtons from "@/components/ReactShare/TwitterShare";
import LinkShareButton from "@/components/ReactShare/LinkShareButton";

export const revalidate = 0;
export const fetchCache = "force-no-store";

const Page: FC<PageSlugProps> = async ({ params }) => {
  const thisBlog = await db.post.findFirst({
    where: {
      id: params.slug,
    },
    include: {
      author: true,
    },
  });

  const updateView = await db.post.update({
    where: {
      id: params.slug,
    },
    data: {
      viewNumber: Number(thisBlog?.viewNumber ?? 0) + 1,
    },
  });

  const currentAddress = `${process.env.CURRENT_ADDRESS}/list/${thisBlog?.id}`;

  if (!thisBlog) return notFound();

  return (
    <div className=" lg:px-72 md:px-10 px-2">
      <div className="bg-white p-4 rounded-lg mb-4 shadow-l relative">
        <div className=" lg:gap-0 gap-3 flex items-center lg:fixed   lg:block  w-2  left-[240px]">
          <div>
            <FBShareButtons
              shareUrl={currentAddress}
              title={thisBlog?.title ?? "twitter title"}
            />
          </div>
          <div>
            <TWShareButtons
              shareUrl={currentAddress}
              title={thisBlog?.title ?? "twitter title"}
            />
          </div>
          <div className=" ml-[2px]">
            <LinkShareButton copiedText={currentAddress} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <div className="bg-primary-500 px-1 rounded-3xl md:text-sm text-xs font-light shadow-l ">
            {thisBlog.type}
          </div>
          <div className="flex gap-1 items-center">
            <RemoveRedEyeIconLib />
            <div className="md:text-sm text-xs">{thisBlog.viewNumber}</div>
          </div>
          <em className="md:text-sm text-xs">
            Ngày viết:&nbsp;
            {moment(thisBlog.createAt).format("DD/MM/YYYY")}
          </em>
          <em className="md:text-sm text-xs">
            Ngày cập nhật:&nbsp;
            {moment(thisBlog.updateAt).format("DD/MM/YYYY")}
          </em>
        </div>
        <h1 className="my-4 break-words">{thisBlog.title}</h1>
        <div className="flex gap-3  items-center mb-5">
          <Image
            src={thisBlog?.author.image ?? ""}
            className=" rounded-full object-contain"
            alt={thisBlog.title}
            width={45}
            height={45}
          />
          <div className="flex flex-col">
            <div className="md:text-base text-sm">{thisBlog.author.name}</div>
            <div className="md:text-base text-sm">
              {thisBlog.readMinute} phút đọc
            </div>
          </div>
        </div>

        <div className=" border-t-2 border-spacing-5 pt-5">
          <EditorOutput content={thisBlog?.content} />
        </div>
      </div>
    </div>
  );
};

export default Page;
