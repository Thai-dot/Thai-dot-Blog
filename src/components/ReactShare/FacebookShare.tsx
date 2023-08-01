"use client";

import { FacebookShareButton, FacebookIcon } from "react-share";

const FBShareButtons = ({
  shareUrl,
  title,
}: {
  shareUrl: string;
  title: string;
}) => {
  return (
    <FacebookShareButton url={shareUrl} title={title}>
      <FacebookIcon size={30} round />
    </FacebookShareButton>
  );
};

export default FBShareButtons;
