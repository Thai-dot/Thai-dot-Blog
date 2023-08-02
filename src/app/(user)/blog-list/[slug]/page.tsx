"use client";

import React, { FC, useCallback } from "react";
import TextareaAutoSize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostValidator, PostValidatorType } from "@/lib/validator/post";
import { zodResolver } from "@hookform/resolvers/zod";
import "@/styles/editor.css";
import EditorJS from "@editorjs/editorjs";
import { uploadFiles } from "@/lib/uploadthing";
import useIsMounted from "@/hooks/is-mounted/is-mounted";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import Dropzone from "@/components/Dropzone/Dropzone";
import imageUpload from "@/lib/uploadImg";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { notFound, useRouter } from "next/navigation";
import PageSlugProps from "@/types/type/PageSlugProps";
import type { Post } from "@prisma/client";
import Image from "next/image";

const Page: FC<PageSlugProps> = ({ params }) => {
  const fetchDetail = () => {
    return axios
      .get(`/api/post/${params.slug}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        toast.error("Lỗi không fetch được post");
      });
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["getDetailBlogAuth"],
    fetchDetail
  );

  const getData: Post = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostValidatorType>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: getData?.title,
      description: getData?.description,
      readMinute: getData?.readMinute,
      content: null,
    },
  });

  const router = useRouter();
  const isMounted = useIsMounted();

  const [imgFile, setImgFile] = React.useState<File | null>(null);

  const ref = React.useRef<EditorJS>();
  const _titleRef = React.useRef<HTMLTextAreaElement>(null);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Viết blog tại đây ...",
        inlineToolbar: true,
        // @ts-ignore
        data: getData?.content,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles([file], "imageUploader");

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [getData?.content]);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      description,
      readMinute,
      image,
    }: PostValidatorType) => {
      const payload: PostValidatorType = {
        title,
        content,
        description,
        readMinute,
        image,
      };
      const { data } = await axios.put(`/api/post/${params.slug}`, payload);
      return data;
    },
    onError: () => {
      return toast.error("Something went wrong!!");
    },
    onSuccess: () => {
      router.push("/blog-list");
      router.refresh();
      return toast.success("Cập nhật bài blog mới thành công!");
    },
  });

  React.useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: PostValidatorType) {
    const blocks = await ref.current?.save();

    try {
      let uploadImageString = getData?.image;
      if (imgFile) {
        uploadImageString = await imageUpload(imgFile).then((res: any) => res);
      }
      const payload: PostValidatorType = {
        title: data.title,
        content: blocks,
        readMinute: data.readMinute,
        description: data.description,
        image: uploadImageString,
      };
      createPost(payload);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi không tạo mới bài viết được");
    }
  }

  if (!isMounted) {
    return null;
  }

  if (error) return notFound();

  const { ref: titleRef, ...titleRest } = register("title");

  return (
    <div className="w-full">
      {isLoading && !data ? (
        <div className="flex-center">
          <CircularProgress size={50} />
        </div>
      ) : (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="prose prose-stone dark:prose-invert bg-slate-50 p-4 rounded-3xl shadow-l shadow-secondary-150 w-full m-0 max-w-full">
            <TextareaAutoSize
              ref={(e) => {
                titleRef(e);
                // @ts-ignore
                _titleRef.current = e;
              }}
              {...titleRest}
              defaultValue={getData?.title}
              placeholder="Thêm tiêu đề"
              className=" w-full resize-none appearance-none overflow-hidden bg-transparent text-xl  lg:text-5xl font-bold focus:outline-none"
            />
            {errors.title?.message && (
              <div className="ml-2 text-red-400">{errors.title?.message}</div>
            )}
            <TextareaAutoSize
              {...register("description")}
              placeholder="thêm mô tả..."
              defaultValue={getData?.description}
              className=" w-full resize-none appearance-none overflow-hidden bg-transparent text-base  lg:text-lg  font-medium focus:outline-none pl-2"
            />
            {errors.description?.message && (
              <div className="ml-2 text-red-400">
                {errors.description?.message}
              </div>
            )}

            <div id="editor" className="min-h-[500px] w-full" />
          </div>

          <div className="mt-5 rounded-3xl shadow-l bg-slate-50 w-full p-4">
            <Stack>
              <TextField
                {...register("readMinute", {
                  valueAsNumber: true,
                })}
                id="readMinute"
                name="readMinute"
                label="Số phút đọc bài viết"
                type="number"
                required
                defaultValue={getData?.readMinute}
                helperText={
                  errors.readMinute ? errors.readMinute?.message : null
                }
                error={errors.readMinute ? true : false}
              />
              <div className="mt-4">
                <Dropzone setFile={setImgFile} />
              </div>

              {!imgFile && (
                <div className="flex items-center ">
                  <div>Hình đại diện blog:</div>
                  <img
                    src={getData?.image ?? ''}
                    alt="blog image"
                    width={150}
                    height={150}
                    className="object-contain rounded-md shadow-md"
                  />
                </div>
              )}
            </Stack>
          </div>

          <div className="w-full flex justify-end  mt-4">
            <Button
              style={{ color: "white" }}
              type="submit"
              variant="contained"
            >
              Lưu bài viết
            </Button>
          </div>
          <div className="w-full flex justify-end mt-4">
            <em className="w-3/4 text-end break-words text-sm lg:text-sm ">
              Lưu ý: bài viết chỉ xuất hiện public khi được duyệt. Liên hệ:
              nguyenhoangthai7871@gmail.com để mong muốn duyệt bài
            </em>
          </div>
        </form>
      )}
    </div>
  );
};

export default Page;
