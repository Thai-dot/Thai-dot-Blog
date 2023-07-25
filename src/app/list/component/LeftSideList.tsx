"use client";

import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PostTypeEnum from "@/types/enum/PostType";
import useFilterList from "@/zustand/useFilterList";

export default function LeftSideList() {
  const blogType = [
    { name: "Công nghệ", value: PostTypeEnum.TECHNOLOGY },
    { name: "Phim", value: PostTypeEnum.MOVIE },
    { name: "Sách", value: PostTypeEnum.BOOK },
    { name: "Game", value: PostTypeEnum.GAMING },
  ];

  const categories = useFilterList((state) => state.categories);
  const toggleType = useFilterList((state) => state.toggleCheckEachCategory);
  const searchTitleValue = useFilterList((state) => state.title);
  const setSearchTitleValue = useFilterList((state) => state.changePostTitle);

  return (
    <aside className=" rounded p-3   shadow-xs ">
      <TextField
        size="small"
        placeholder="Tìm kiếm bài viết..."
        value={searchTitleValue}
        onChange={(e: any) => {
          setSearchTitleValue(e.target.value);
        }}
        InputProps={{
          sx: { borderRadius: "5px", marginRight: "0px" },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <details open>
        <summary className="bg-neutral-200  rounded text-sm w-full mt-6 p-1 px-3 cursor-pointer ">
          Loại blog
        </summary>
        <div className="pl-3">
          {" "}
          <FormGroup>
            {blogType.map((type) => {
              return (
                <FormControlLabel
                  key={type.value}
                  control={
                    <Checkbox
                      name={type.value}
                      checked={
                        categories.find(
                          (category) => category.name === type.value
                        )?.checked
                      }
                      onChange={(e: any) => {
                        toggleType(type.value);
                      }}
                      style={{
                        color: "#0095a9",
                      }}
                    />
                  }
                  label={type.name}
                />
              );
            })}
          </FormGroup>
        </div>
      </details>
    </aside>
  );
}
