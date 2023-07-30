"use client";

import React from "react";
import Logo from "../Logo/Logo";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MainButton from "../Buttons/Button/MainButton";
import moment from "moment";

interface LinkType {
  name: string;
  link: string;
  target?: boolean;
}

function FooterLink({ title, links }: { title: string; links: LinkType[] }) {
  return (
    <div>
      {" "}
      <h5 className="mb-2">{title}</h5>
      <ul>
        {links.map((item: LinkType) => {
          return (
            <li key={item.name} className="mb-2">
              {item.target ? (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </Link>
              ) : (
                <Link href={item.link}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const firstFooterLinks: LinkType[] = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Portfolio của tôi",
      link: "https://thai-dot-room.netlify.app/",
      target: true,
    },
    {
      name: "Về tôi",
      link: "/about",
    },
  ];

  const secondFooterLinks: LinkType[] = [
    {
      name: "Công nghệ",
      link: "/list",
    },
    {
      name: "Phim ảnh",
      link: "/list",
    },
    {
      name: "Sách",
      link: "/list",
    },
    {
      name: "Game",
      link: "/list",
    },
  ];

  const thirdFooterLinks: LinkType[] = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/nguyenthai7871",
      target: true,
    },
    {
      name: "Github",
      link: "https://github.com/Thai-dot",
      target: true,
    },
    {
      name: "Youtube",
      link: "https://www.youtube.com/channel/UCIxApakrUNszaYWc6_f6SQA",
      target: true,
    },
  ];
  return (
    <footer className="bg-slate-200 pt-10 pb-4 ">
      <div className="flex flex-col lg:flex-row px-28 gap-10 lg:gap-20 mb-5 lg:mb-10 ">
        <div className="flex-[1_2_0] ">
          <Logo />
        </div>
        <div className="flex flex-[2_2_0] flex-col sm:flex-row justify-between">
          <FooterLink title="Website" links={firstFooterLinks} />
          <FooterLink title="Loại vài viết" links={secondFooterLinks} />
          <FooterLink title="Social" links={thirdFooterLinks} />
        </div>
        <div className="flex flex-col lg:basis-80 basis-40">
          <h5 className="text-primary-500">Liên hệ tôi qua email</h5>
          <p className="  text-xs text-neutral-600 font-medium py-2">
            Gửi cho tôi các câu hỏi bất kỳ liên quan đến lĩnh vực công nghệ hoặc
            đời sống
          </p>
          <div className="flex ">
            <TextField
              size="small"
              type="email"
              placeholder="email của bạn"
              InputProps={{
                sx: { backgroundColor: "#EAECEFFF", borderRadius: "0px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <MainButton borderRadius="0px" text="Gửi" />
          </div>
        </div>
      </div>
      <div className="text-center">{`© ${moment().year()} Thai-dot`}</div>
    </footer>
  );
}
