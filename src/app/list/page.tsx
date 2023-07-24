import { centerLayoutClass } from "@/constant/classname/classname";
import setMetaData from "@/utils/metadata";
import React from "react";
import LeftSideList from "./component/LeftSideList";
import RightSideList from "./component/RightSideList";

export const metadata = setMetaData("Blog list", "Thai-dot blog list page");

export default function page() {
  return (
    <main
      className={` flex flex-col lg:grid lg:grid-cols-[1fr_3fr] gap-10 ${centerLayoutClass}`}
    >
      <LeftSideList />
      <RightSideList />
    </main>
  );
}
