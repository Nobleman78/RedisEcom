"use client";

import { demoProductApi } from "@/feature/demoProductApiHook/demoProductApi";
import { spaceMono } from "@/fonts/Fonts";
import { useParams } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";

const CategoryPage = () => {
  const { category } = useParams<{ category?: string | string[] }>();
  const categoryParam = Array.isArray(category) ? category[0] : category;
  const displayCategory = categoryParam
    ? categoryParam[0].toUpperCase() + categoryParam.slice(1)
    : "Category";

  if (typeof category !== "string") {
    return <div>Invalid category</div>;
  }
  //Getting the category product data
  const productsLength = demoProductApi({ category });

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
      <p className={`${spaceMono.className} text-center`}>
        {" "}
        Accessories available at NEVER NEVER.
      </p>
      <hr className="text-gray-200 my-3" />
      <div>
        <h2 className={`${spaceMono.className} text-center text-gray-500`}>
          {productsLength.length} PRODUCTS FOUND
        </h2>
        {/* sorting and filtering section */}
        <section>
          
        </section>
      </div>
      <hr className="text-gray-200 my-3" />
    </div>
  );
};

export default CategoryPage;
