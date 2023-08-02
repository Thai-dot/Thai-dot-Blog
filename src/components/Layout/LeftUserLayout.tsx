"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";

interface LeftUserLayoutProps {}

const LeftUserLayout: FC<LeftUserLayoutProps> = ({}) => {
  const pathName = usePathname();
  const session = useSession();

  const navigationUser = [
    {
      name: "Thông tin cá nhân",
      link: "/information",
    },
    {
      name: "Thêm bài viết",
      link: "/create-blog",
    },
    {
      name: "Bài đã viết",
      link: "/blog-list",
    },
  ];

  const navigationAdmin = [
    ...navigationUser,
    { name: "Duyệt các bài blog", link: "/admin/verify-blog" },
  ];

  const renderList =
    session.data?.user?.role === "admin" ? navigationAdmin : navigationUser;

  return (
    <aside className=" lg:col-span-3 ">
      <ul className="flex flex-col gap-2 ">
        {renderList.map((item) => {
          return (
            <Link
              className={classNames("userLayoutNav", {
                active: pathName === item.link,
              })}
              key={item.name}
              href={item.link}
            >
              <li>{item.name}</li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default LeftUserLayout;
