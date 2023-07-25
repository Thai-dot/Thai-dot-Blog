"use client";
import HomePost from "@/components/Posts/HomePost/HomePost";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export default function RightSideList() {
  const fetchPosts = () => {
    return axios
      .get("/api/post", {
        params: {
          limit: 5,
          page: 1,
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

 
  return (
    <section>
      <p className="text-sm md:text-base text-neutral-900 mb-4  ">
        {`Có tất cả ${data?.totalPost} bài viết`}
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
          </div>
        )}
      </div>
    </section>
  );
}
