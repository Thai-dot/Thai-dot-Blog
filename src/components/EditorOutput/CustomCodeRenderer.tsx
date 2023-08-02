"use client";

import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-blue.css";
import React, { useEffect, useRef } from "react";

function CustomCodeRenderer({ data }: any) {
  data;

  const codeRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    hljs.highlightBlock(codeRef.current);
  }, [data.code]);

  return (
    <pre className="bg-[#002451] rounded-md p-4 my-3">
      <code ref={codeRef} className="text-gray-100 text-sm language-javascript">
        {data.code}
      </code>
    </pre>
  );
}

export default CustomCodeRenderer;
