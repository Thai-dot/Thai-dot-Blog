import { FC } from "react";
import DrawBackBlogList from "./DrawBackBlogList";
import { getAuthSession } from "@/lib/auth";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const session = await getAuthSession();
  return <DrawBackBlogList session={session} />;
};

export default Page;
