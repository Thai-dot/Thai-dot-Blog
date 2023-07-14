import React from "react";
import example from "@/assets/dalat.jpg";
import Image from "next/image";
import MainButton from "@/components/Buttons/Button/MainButton";

export default function HomePost() {
  return (
    <div className="flex flex-col md:flex-row rounded-md border-2 shadow-lg ">
      <Image
        src={example}
        alt="home blog img"
        className="object-cover w-full md:w-1/2  rounded-s-md"
      />

      <article className="w-full md:w-1/2 xs:flex-row p-2 sm:p-4 md:p-8">
        <div className="text-primary-550 font-medium ">Thể loại</div>
        <h5 className="my-4">
          Aliqua Irure Tempor Lorem Occaecat VolupVolupVolup Volup Volup Volup
          Volup Volup Volup Volup
        </h5>
        <p className="my-4">
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
