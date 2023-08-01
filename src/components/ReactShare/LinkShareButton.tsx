"use client";

import React from "react";
import LinkIconShare from "@/lib/muiIcon/LinkIcon";
import { useCopyToClipboard } from "@/hooks/copy-to-clipboard/copy-to-clipboard";
import { toast } from "react-toastify";

export default function LinkShareButton({
  copiedText,
}: {
  copiedText: string;
}) {
  const [value, copy] = useCopyToClipboard();

  const handleUpdate = () => {
    toast.success("Copy link thành công",{
        position: 'top-left'
    });
  };

  return (
    <div
      onClick={() => {
        copy(copiedText);
        handleUpdate();
      }}
      aria-hidden
    >
      <LinkIconShare />
    </div>
  );
}
