import { useDropzone } from "react-dropzone";

import React, { FC, useMemo } from "react";
import bytesToMegaBytes from "@/utils/convertBytesToMB";

interface DropzoneProps {
  setFile: (file: File) => void;
}

const Dropzone: FC<DropzoneProps> = ({ setFile }) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    maxSize: 4000000,
  });

  React.useEffect(() => {
    setFile(acceptedFiles[0]);
  }, [acceptedFiles, setFile]);

  const style = useMemo(() => {
    const baseStyle = {
      flex: 1,
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      padding: "20px",
      borderWidth: 2,
      borderRadius: 2,
      borderColor: "#eeeeee",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
      cursor: "pointer",
    };

    const focusedStyle = {
      borderColor: "#00bdd6",
    };

    const acceptStyle = {
      borderColor: "#00e676",
    };

    const rejectStyle = {
      borderColor: "#ff1744",
    };
    return {
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    };
  }, [isFocused, isDragAccept, isDragReject]);

  const acceptedFileItems = acceptedFiles.map((file) => (
    // @ts-ignore
    <li key={file.path}>
      {/* @ts-ignore */}
      {file.path} - {bytesToMegaBytes(file.size)} mb
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    // @ts-ignore
    <li key={file.path}>
      {/* @ts-ignore */}
      {file.path} - {bytesToMegaBytes(file.size)} mb
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="lg:text-base text-sm">
          Kéo thả ảnh đại diện cho bài blog
        </p>
        <em className="lg:text-sm text-xs">
          (Chỉ file hình ảnh hợp lệ (.jpg, .png,...) và nhỏ hơn 4mb)
        </em>
      </div>
      {acceptedFiles.length > 0 && (
        <>
          <ul>{acceptedFileItems}</ul>
        </>
      )}

      {fileRejections.length > 0 && (
        <>
          <h6 className="lg:text-sm text-xs text-red-400">File không hợp lệ</h6>
          <ul>{fileRejectionItems}</ul>
        </>
      )}
    </section>
  );
};

export default Dropzone;
