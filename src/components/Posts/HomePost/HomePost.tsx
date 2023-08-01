import React from "react";
import example from "@/assets/dogcoin.jpg";
import HideShowText from "@/components/HideShowText/HideShowText";
import moment from "moment";
import Link from "next/link";

interface HomePostType {
  title: string;
  createAt: string;
  type: string;
  image?: string;
  readMinute: number;
  description: string;
  id: string;
}

export default function HomePost({
  title,
  createAt,
  type,
  image,
  readMinute,
  description,
  id,
}: HomePostType) {
  let realImg: any = "";
  if (image) {
    realImg = image;
  } else {
    realImg = example;
  }
  return (
    <Link href={`/list/${id}`} target="_blank" rel="noreferrer noopener">
      <div className="flex flex-col md:flex-row  rounded-md border-2 shadow-lg mb-6">
        <div className="w-full md:w-1/2 bg-slate-200 ">
          <div className="relative h-[220px] md:h-[310px]">
            <img
              src={realImg}
              alt={title}
              className="absolute top-0 left-0 object-cover h-full w-full rounded-s-md"
            />
          </div>
        </div>

        <article className="w-full bg-white md:w-1/2 flex flex-col gap-2  py-6 px-4 lg:py-8 lg:px-6">
          <div>
            <div className="flex flex-row justify-between flex-wrap md:items-center mb-2 lg:mb-4">
              <div className="text-primary-550 font-medium text-xs md:text-sm">
                {type}
              </div>
              <div className=" bg-primary-500 px-2 rounded-3xl text-white mt-2 xs:mt-0 text-xs md:text-sm mb-1">
                {readMinute} phút đọc
              </div>
            </div>
            <h5>
              <HideShowText
                disableOpen
                text={title}
                length={80}
                className="md:text-base  text-sm"
              />{" "}
            </h5>
          </div>

          <div className="flex justify-between items-center flex-col xs:flex-row mt-3 md:mt-2 ">
            <em className="text-xs">{moment(createAt).format("DD/MM/YYYY")}</em>
          </div>

          <div>
            <p className=" my-2 lg:my-4 mb-4 lg:mb-6">
              <HideShowText
                disableOpen
                text={description}
                length={128}
                className="text-sm md:text-base"
              />
            </p>
          </div>
        </article>
      </div>
    </Link>
  );
}
