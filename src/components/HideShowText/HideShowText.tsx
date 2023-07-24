"use client";

import useIsMounted from "@/hooks/is-mounted/is-mounted";
import React, { useState, useEffect } from "react";

interface HideShowTextType extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  length?: number;
  className?: string;
  disableOpen: boolean;
}

export default function HideShowText(props: HideShowTextType) {
  const mounted = useIsMounted();

  const { text, className, length, disableOpen } = props;
  const actualLength = length ?? 100;
  const [isHidden, setIsHidden] = useState(true);

  function toggle() {
    setIsHidden(!isHidden);
  }


  if (mounted) {
    if (disableOpen)
      return (
        <div>
          {text.length <= actualLength ? (
            <p className={className}>{text}</p>
          ) : (
            <p className={className}>
              {isHidden ? `${text.slice(0, length ?? 150)}...` : text}
            </p>
          )}
        </div>
      );
    return (
      <div>
        {text.length <= actualLength ? (
          <p className={className}>{text}</p>
        ) : (
          <div className={className}>
            <p>
              {isHidden ? `${text.slice(0, length ?? 150)}...` : text}
              <span
                aria-hidden
                style={{ cursor: "pointer", color: "#2b66a2" }}
                onClick={toggle}
              >
                {isHidden ? "thêm" : " ẩn"}
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
}
