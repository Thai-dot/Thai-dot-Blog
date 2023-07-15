import React from "react";
import example from "@/assets/dogcoin.jpg";
import Image from "next/image";
import MainButton from "@/components/Buttons/Button/MainButton";

export default function HomePost() {
  return (
    <div className="flex flex-col md:flex-row  rounded-md border-2 shadow-lg mb-6">
      <div className="w-full md:w-1/2 bg-slate-200 ">
        <div className="relative h-[220px] md:h-[416px] lg:h-[392px] xl:h-[320px]">
          <Image
            src={example}
            alt="home blog img"
            className="absolute top-0 left-0 object-cover h-full w-full rounded-s-md"
          />
        </div>
      </div>

      <article className="w-full bg-white md:w-1/2 xs:flex-row p-2 sm:p-4 md:p-6">
        <div className="text-primary-550 font-medium ">Thể loại</div>
        <h5 className="my-6">
          Aliqua Irure Tempor Lorem Occaecat VolupVolupVolup Volup Volup Volup
          Volup Volup Volup Volup
        </h5>
        <p className="my-6 mb-8">
          Ex nisi in in minim dolore ad nostrud cillum. Fugiat veniam
          adipisicing nulla amet...
        </p>
        <div className="flex justify-between items-center flex-col xs:flex-row  ">
          <div>22/12/2001</div>
          <div>
            <MainButton
              borderRadius="25px"
              variant="contained"
              text="5 phút đọc"
              className="p-0 px-2"
            />
          </div>
        </div>
      </article>
    </div>
  );
}
