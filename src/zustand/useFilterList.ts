import { create } from "zustand";
import PostTypeEnum from "@/types/enum/PostType";

interface FilterCategory {
  name: PostTypeEnum;
  checked: boolean;
}

interface FilterList {
  title: string;
  categories: FilterCategory[];
  toggleCheckEachCategory: (name: PostTypeEnum) => void;
  changePostTitle: (title: string) => void;
}

const useFilterList = create<FilterList>((set) => ({
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
  changePostTitle: (title) => {
    set((state) => ({ ...state, title }));
  },
}));

export default useFilterList;
