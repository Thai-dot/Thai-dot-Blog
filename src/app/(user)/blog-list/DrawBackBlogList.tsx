"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
interface DrawBackBlogListProps {
  session: any;
}

const DrawBackBlogList: FC<DrawBackBlogListProps> = ({ session }) => {
  const fetchBlogList = () => {
    return axios
      .get("/api/post", {
        params: {
          limit: 10,
          page: 1,
          userId: session?.user?.id,
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

  if (isLoading)
    return (
      <div className="flex-center">
        <CircularProgress />
      </div>
    );
    
  return <div>DrawBackBlogList</div>;
};

export default DrawBackBlogList;
