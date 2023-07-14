import React from "react";
import Link from "next/link";
import { Typography } from "@mui/material";

interface LogoType {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo(props: LogoType) {
  const { width, height, className } = props;
  return (
    <Typography
      variant="h4"
      noWrap
      component="a"
      href="/"
      sx={{
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
        ml: 2,
        mt: 4,
        pt:6
      }}
      fontSize="1.5rem"
    >
      ThaiBlog
    </Typography>
  );
}
