"use client";

import CustomCodeRenderer from "./CustomCodeRenderer";
import CustomImageRenderer from "./CustomImageRenderer";
import { FC } from "react";
import dynamic from "next/dynamic";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "1.5rem",
    lineHeight: "1.25rem",
    wordBreak: "break-word",
  },
  header: {
    h1: {
      wordBreak: "break-word",
    },
    h2: { wordBreak: "break-word" },
    h3: { wordBreak: "break-word" },
    h4: { wordBreak: "break-word" },
    h5: { wordBreak: "break-word" },
    h6: { wordBreak: "break-word" },
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      className="text-sm w-full"
      renderers={renderers}
      data={content}
    />
  );
};

export default EditorOutput;
