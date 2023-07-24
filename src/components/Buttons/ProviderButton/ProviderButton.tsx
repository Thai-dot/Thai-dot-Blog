import classNames from "classnames";
import React from "react";
import { CircularProgress } from "@mui/material";

interface ProviderButtonType {
  icon: any;
  title: string;
  className?: string;
  isLoading?: boolean;
  onClick?: () => any;
}

export default function ProviderButton(props: ProviderButtonType) {
  const { icon, title, className, isLoading, onClick } = props;

  return (
    <div
      className={classNames(
        "flex flex-col md:flex-row sm:flex-col gap-2 justify-center items-center bg-blue-500 rounded p-2 cursor-pointer shadow-lg",
        className
      )}
      onClick={onClick}
    >
      <div>{isLoading ? <CircularProgress size={20} color="secondary" /> : icon}</div>
      <div className="text-slate-50 mt-1">{title}</div>
    </div>
  );
}
