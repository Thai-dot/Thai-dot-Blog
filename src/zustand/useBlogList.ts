import { create } from "zustand";
import PostTypeEnum from "@/types/enum/PostType";

interface FilterCategory {
  name: PostTypeEnum;
  checked: boolean;
}

interface BlogListType {
  isDelete: boolean;

  limit: number;
  page: number;
  title: string;
  deleteArray: string[];
  categories: FilterCategory[];
  toggleCheckEachCategory: (name: PostTypeEnum) => void;
  changeDeleteArray: (deleteItems: string[]) => void;
  changePostTitle: (title: string) => void;
  setLimit: (num: 5 | 10 | 25) => void;
  setPage: (num: number) => void;
  onDelete: (del: boolean) => void;
}

const useBlogList = create<BlogListType>((set) => ({
  isDelete: false,
  limit: 5,
  page: 0,
  deleteArray: [],
  title: "",
  categories: [
    { name: PostTypeEnum.TECHNOLOGY, checked: true },
    { name: PostTypeEnum.MOVIE, checked: true },
    { name: PostTypeEnum.BOOK, checked: true },
    { name: PostTypeEnum.GAMING, checked: true },
  ],
  toggleCheckEachCategory: (name) => {
    set((state) => {
      const categories = state.categories.map((category) =>
        category.name === name
          ? { ...category, checked: !category.checked }
          : category
      );
      return { ...state, categories };
    });
  },
  changeDeleteArray: (deleteItems) => {
    set((state) => {
      return { ...state, deleteArray: [...deleteItems] };
    });
  },
  changePostTitle: (title) => {
    set((state) => ({ ...state, title }));
  },
  setLimit: (num) => {
    set((state) => ({ ...state, limit: num }));
  },
  setPage: (num) => {
    set((state) => ({ ...state, page: num }));
  },
  onDelete: (del) => {
    set((state) => ({ ...state, isDelete: del }));
  },
}));

export default useBlogList;
