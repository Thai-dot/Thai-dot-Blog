'use client'

import { TwitterShareButton, TwitterIcon } from "react-share";

const TWShareButtons = ({
  shareUrl,
  title,
}: {
  shareUrl: string;
  title: string;
}) => {
  return (
    <TwitterShareButton url={shareUrl} title={title}>
      <TwitterIcon size={30} round />
    </TwitterShareButton>
  );
};

export default TWShareButtons;
