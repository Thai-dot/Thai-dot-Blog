"use client";
import HomePost from "@/components/Posts/HomePost/HomePost";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import useFilterList from "@/zustand/useFilterList";
import { notFound } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import usePagination from "@/hooks/pagination/pagination";

export default function RightSideList() {
  const { categories, title } = useFilterList();

  const { page, handleChange } = usePagination();

  const categoryParam = categories
    .filter((item) => item.checked === true)
    .map((item) => {
      return item.name;
    })
    .join(",");

  const fetchPosts = () => {
    return axios
      .get("/api/post", {
        params: {
          limit: 5,
          page,
          categories: categoryParam,
          title,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        toast.error("Lỗi không fetch được các post!");
        console.error(error);
      });
  };

  const { data, isLoading, refetch, error } = useQuery(
    ["my list post query"],
    fetchPosts
  );

  React.useEffect(() => {
    refetch();
  }, [categories, refetch, title, page]);

  if (error) return notFound();

  return (
    <section>
      <p className="text-sm md:text-base text-neutral-900 mb-4  ">
        {`Có tất cả ${data?.totalRow ?? 0} bài viết`}
      </p>
      <div className="">
        {isLoading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div>
            {data?.data?.map((post: any, index: number) => {
              return (
                <HomePost
                  key={index}
                  description={post.description}
                  image={post?.image}
                  type={post.type}
                  readMinute={post.readMinute}
                  createAt={post.createAt.toString()}
                  title={post.title}
                />
              );
            })}

            <div className="flex-center">
              <Pagination
                color="primary"
                count={data?.totalPage}
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
