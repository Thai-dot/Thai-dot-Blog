"use client";

import React, { FC } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Table from "@/components/Table/Table";
import moment from "moment";
import useBlogList from "@/zustand/useBlogList";
import { notFound } from "next/navigation";
interface DrawBackBlogListProps {
  session: any;
}

const DrawBackBlogList: FC<DrawBackBlogListProps> = ({ session }) => {
  const { deleteArray, title, categories, limit, page, isDelete, onDelete } =
    useBlogList();

  const categoryParam = categories
    .filter((item) => item.checked === true)
    .map((item) => {
      return item.name;
    })
    .join(",");

  const fetchBlogList = () => {
    return axios
      .get("/api/post", {
        params: {
          limit: limit,
          page: page + 1,
          userId: session?.user?.id,
          categories: categoryParam,
          title,
          showNot: "yes",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        toast.error("Lỗi không fetch được post");
      });
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["myFecthBlogListUser"],
    fetchBlogList
  );

  const {
    mutate: deleteSelectedArray,
    isLoading: isLoadingDelete,
    reset,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/post`, {
        data: { deleteArray },
      });
      return data as string;
    },

    onError: () => {
      toast.error("Không thể xóa được blog!");
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  React.useEffect(() => {
    refetch();

    if (isDelete) {
      deleteSelectedArray();
      onDelete(false);
    }
  }, [
    categories,
    refetch,
    title,
    limit,
    page,
    isDelete,
    onDelete,
    deleteSelectedArray,
  ]);

  if (error) return notFound();

  if (isLoading)
    return (
      <div className="flex-center">
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <div className="tableComponent">
        {data?.data ? (
          <Table
            totalRow={data?.totalRow}
            data={data?.data?.map((item: any) => {
              return {
                id: item?.id,
                title: item?.title,
                createAt: moment(item?.createAt).format("DD/MM/YYYY"),
                updateAt: moment(item?.updateAt).format("DD/MM/YYYY"),
                type: item?.type,
                viewNumber: parseInt(item?.viewNumber),
                status: item?.isVerified,
              };
            })}
          />
        ) : (
          <div className="flex-center">Không có bài blog nào</div>
        )}
      </div>
    </div>
  );
};

export default DrawBackBlogList;
