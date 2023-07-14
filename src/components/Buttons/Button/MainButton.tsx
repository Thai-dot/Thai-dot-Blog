"use client";

import React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";

interface MainButtonType {
  fontSize?: string | number | undefined;
  borderRadius?: string | number | undefined;
  variant?: "outlined" | "text" | "contained" | undefined;
  backgroundColor?: string;
  text: string;
  className?: string;
  color?: string;
  icon?: any;
  borderColor?: string;
}

export default function MainButton(props: MainButtonType) {
  const {
    fontSize,
    borderRadius,
    variant,
    backgroundColor,
    text,
    className,
    color,
    icon,
    borderColor,
  } = props;
  return (
    <Button
      startIcon={icon ?? null}
      style={{
        borderRadius: borderRadius ?? "5px",
        backgroundColor:
          variant === "contained" || variant ===undefined
            ? backgroundColor ?? "#00bdd6"
            : undefined,
        fontSize: fontSize ?? "13px",
        borderColor: borderColor ?? "#00bdd6",
        color: color
          ? color
          : variant === "outlined" || variant === "text"
          ? "#00bdd6"
          : "white",
        
      }}
      className={classNames(className, "shadow-l text-base md:text-lg lg:text-xl")}
      variant={variant ?? "contained"}
    >
      {text}
    </Button>
  );
}
