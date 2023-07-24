import React from "react";
import example from "@/assets/dogcoin.jpg";
import Image from "next/image";
import MainButton from "@/components/Buttons/Button/MainButton";
import HideShowText from "@/components/HideShowText/HideShowText";

export default function HomePost() {
  return (
    <div className="flex flex-col md:flex-row  rounded-md border-2 shadow-lg mb-6">
      <div className="w-full md:w-1/2 bg-slate-200 ">
        <div className="relative h-[220px] md:h-[416px] lg:h-[392px] xl:h-[350px]">
          <Image
            src={example}
            alt="home blog img"
            className="absolute top-0 left-0 object-cover h-full w-full rounded-s-md"
          />
        </div>
      </div>

      <article className="w-full bg-white md:w-1/2 flex flex-col gap-2  py-10 px-8 lg:py-14 lg:px-10">
        <div>
          <div className="text-primary-550 font-medium mb-2">Thể loại</div>
          <h5 className="">
            <HideShowText
            
              disableOpen
              text="lorem100 , dolor sit amet consectetur adipisicing elit. Distinctio quisquam molestiae perspiciatis est neque magni sit labore corporis "
              length={40}
            />{" "}
          </h5>
        </div>

        <div>
          <p className=" my-2 lg:my-4 mb-4 lg:mb-6">
            <HideShowText
              disableOpen
              text="lorem100 , dolor sit amet consectetur adipisicing elit. Distinctio quisquam molestiae perspiciatis est neque magni sit labore corporis repudiandae ipsa minus deleniti, sunt quas omnis adipisci nostrum explicabo quo porro asperiores reprehenderit delectus alias quam dolorum ut. Mollitia, molestias. Distinctio dolor nulla maxime qui quae laborum, reiciendis, commodi in accusamus dolores repellat expedita? Quod, molestias, expedita mollitia, suscipit corrupti vitae est non reiciendis totam magnam laborum maiores. Et corporis ducimus assumenda corrupti pariatur perspiciatis porro quibusdam ipsum sint unde repudiandae earum, quam quae quas obcaecati ullam, necessitatibus, itaque saepe impedit. Nisi optio ipsum quam ex deserunt, mollitia ab quis enim?"
              length={100}
            />
          </p>

          <div className="flex justify-between items-center flex-col xs:flex-row mt-6 md:mt-3 ">
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
        </div>
      </article>
    </div>
  );
}
