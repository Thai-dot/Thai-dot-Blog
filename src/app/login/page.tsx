"use client";

import React from "react";
import Logo from "@/components/Logo/Logo";
import GoogleIcon from "@mui/icons-material/Google";
import ProviderButton from "@/components/Buttons/ProviderButton/ProviderButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import LoginImage from "@/assets/loginImg.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function Page() {
  const [isLoadingGoogle, setIsLoadingGoogle] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoadingGoogle(true);

    try {
      await signIn("google").then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại");
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="flex flex-wrap w-full min-h-screen">
      <div className=" bg-slate-200 md:w-1/2 w-full   relative">
        <Logo className=" ml-2" />
        <div className="flex justify-center items-center m-10 mt-20">
          <div className="shadow-xl	 w-full h-full px-4 py-20 break-words">
            <h1 className="text-center text-2xl">Đăng Nhập</h1>
            <div className="flex flex-col">
              <ProviderButton
                icon={<GoogleIcon sx={{ color: "white" }} />}
                title="Đăng nhập bằng google"
                className="mt-10"
                onClick={() => loginWithGoogle()}
                isLoading={isLoadingGoogle}
              />
              <ProviderButton
                icon={<GitHubIcon sx={{ color: "white" }} />}
                title="Đăng nhập bằng github"
                className="mt-10 bg-gray-900"
              />
            </div>
          </div>
        </div>
        <div className="text-neutral-500 absolute bottom-0 w-full mb-1 text-center ">
          Khi bạn đăng nhập, bạn đã chấp thuận{" "}
          <span className="text underline">
            <Link
              href={
                "https://www.astartingpoint.com/static/privacy.html?gclid=CjwKCAjw2K6lBhBXEiwA5RjtCVYwN8CzAQ_UCdUTiurHHa6L9s3CxW2HA42X7t-cvq_lOZ2Ps-AWmxoCIs4QAvD_BwE"
              }
              target="_blank"
              rel="noreferrer"
            >
              Chính sách bảo mật
            </Link>
          </span>
        </div>
      </div>
      <div className="bg-[#a07ce9] md:w-1/2 w-full">
        <div className="flex flex-col justify-center items-center">
          <Image width={512} height={512} src={LoginImage} alt="login image " />

          <div className="font-bold text-xl px-5 text-white">
            Chào mừng bạn đến Thai-dot blog
          </div>
        </div>
      </div>
    </div>
  );
}
