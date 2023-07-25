import React from "react";
import example from "@/assets/dogcoin.jpg";
import Image from "next/image";
import MainButton from "@/components/Buttons/Button/MainButton";
import HideShowText from "@/components/HideShowText/HideShowText";
import moment from "moment";

interface HomePostType {
  title: string;
  createAt: string;
  type: string;
  image?: string;
  readMinute: number;
  description: string;
}

export default function HomePost({
  title,
  createAt,
  type,
  image,
  readMinute,
  description,
}: HomePostType) {

  let realImg:any = "";
  if(image) {
    realImg = image 
  }
  else{
    realImg = example
  }
  return (
    <div className="flex flex-col md:flex-row  rounded-md border-2 shadow-lg mb-6">
      <div className="w-full md:w-1/2 bg-slate-200 ">
        <div className="relative h-[220px] md:h-[416px] lg:h-[392px] xl:h-[350px]">
          <img
            src={realImg}
            alt={title}
            className="absolute top-0 left-0 object-cover h-full w-full rounded-s-md"
          />
        </div>
      </div>

      <article className="w-full bg-white md:w-1/2 flex flex-col gap-2  py-10 px-8 lg:py-14 lg:px-10">
        <div>
          <div className="text-primary-550 font-medium mb-2">{type}</div>
          <h5>
            <HideShowText disableOpen text={title} length={80} />{" "}
          </h5>
        </div>

        <div>
          <p className=" my-2 lg:my-4 mb-4 lg:mb-6">
            <HideShowText disableOpen text={description} length={120} />
          </p>

          <div className="flex justify-between items-center flex-col xs:flex-row mt-6 md:mt-3 ">
            <div>{moment(createAt).format("DD/MM/YYYY")}</div>
            <div>
              <MainButton
                borderRadius="25px"
                variant="contained"
                text={readMinute?.toString()?.concat(" phút đọc")}
                className="p-0 px-2"
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
