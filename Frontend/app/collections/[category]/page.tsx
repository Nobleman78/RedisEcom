"use client";

import { spaceMono } from "@/fonts/Fonts";
import { useParams } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";

const CategoryPage = () => {
  const { category } = useParams<{ category?: string | string[] }>();
  const categoryParam = Array.isArray(category) ? category[0] : category;
  const displayCategory = categoryParam
    ? categoryParam[0].toUpperCase() + categoryParam.slice(1)
    : "Category";

  return (
    <div className="mt-32 ">
      <div
        className={`${spaceMono.className} flex flex-row items-center justify-center gap-2`}
      >
        <span className="hover:underline cursor-pointer">Home</span>
        <MdKeyboardArrowRight />
        <span className="hover:underline cursor-pointer">
          {displayCategory}
        </span>
      </div>
      <hr className="text-gray-200 my-3" />
      <p className={`${spaceMono.className} text-center`}> Accessories available at NEVER NEVER.</p>
      <hr className="text-gray-200 my-3" />
    </div>
  );
};

export default CategoryPage;
