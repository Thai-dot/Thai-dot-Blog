"use client";

import LinkIcon from "@mui/icons-material/Link";
import { Tooltip, IconButton } from "../mui";

import React from "react";

export default function LinkIconShare() {
  return (
    <Tooltip title="Chia sẻ link">
    
        <LinkIcon fontSize="medium" sx={{ cursor: "pointer" }} />
 
    </Tooltip>
  );
}
