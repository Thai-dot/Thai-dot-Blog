"use client";

import React from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function LeftSideList() {
  const blogType = ["Công nghệ", "Phim", "Sách", "Game"];

  return (
    <aside className=" rounded p-3   shadow-xs ">
      <TextField
        size="small"
        placeholder="Tìm kiếm tác giả..."
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
            {blogType.map((type: string) => {
              return (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      defaultChecked
                      style={{
                        color: "#0095a9",
                      }}
                    />
                  }
                  label={type}
                />
              );
            })}
          </FormGroup>
        </div>
      </details>
    </aside>
  );
}
