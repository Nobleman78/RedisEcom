"use client";

import { spaceMono } from "@/fonts/Fonts";
import {
  demoProductApi,
  getSlogan,
} from "@/hook/demoProductApiHook/demoProductApi";
import sortOptions from "@/hook/sort/sortOption";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const CategoryPage = () => {
  const { category } = useParams<{ category?: string | string[] }>();

  const sortWrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [openSortOption, setOpenSortOption] = useState(false);
  const categoryParam = Array.isArray(category) ? category[0] : category;
  const displayCategory = categoryParam
    ? categoryParam[0].toUpperCase() + categoryParam.slice(1)
    : "Category";

  // Handler function to close sorting option for outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openSortOption &&
        sortWrapperRef.current &&
        !sortWrapperRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpenSortOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSortOption]);

  if (typeof category !== "string") {
    return <div>Invalid category</div>;
  }

  // event handler for open sorting option
  const handleSortingOptionOpen = () => {
    setOpenSortOption((prev) => !prev);
  };

  //Getting the category product data
  const products = demoProductApi({ category });
  const slogan = getSlogan();

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
      <div className="border-b border-gray-200 ">
        <p
          className={`${spaceMono.className} text-center pb-3 max-w-4xl mx-auto`}
        >
          {" "}
          {displayCategory} {slogan}
        </p>
      </div>
      <div className="relative flex items-center border-b border-gray-200 py-3">
        <section className="w-full">
          <h2 className={`${spaceMono.className} text-center text-gray-500`}>
            {products.length} PRODUCTS FOUND
          </h2>
        </section>

        <div className="absolute right-[20px] inset-y-0 flex">
          <div className="flex items-center justify-center w-40 border-l border-gray-200 text-gray-400 hover:text-black ">
            <button
              ref={buttonRef}
              onClick={handleSortingOptionOpen}
              className={`${spaceMono.className} flex items-center gap-2 cursor-pointer `}
            >
              SORT BY
            </button>
            <MdKeyboardArrowDown
              className={`${openSortOption ? "rotate-180" : ""} transition-all duration-500`}
              size={20}
            />
          </div>

          <div className="flex items-center justify-center w-32 border-l border-gray-200 ">
            <button
              className={`${spaceMono.className} text-gray-400 cursor-pointer hover:text-black`}
            >
              FILTER
            </button>
          </div>
        </div>
      </div>
      {/* Sorting option  */}
      {openSortOption && (
        <div
          ref={sortWrapperRef}
          className="absolute right-[147px] p-4 border-l border-r border-b border-gray-300  bg-white"
        >
          {sortOptions.map((item, index) => (
            <div key={index} className="">
              <button
                className={`${spaceMono.className} py-1 cursor-pointer text-gray-500 hover:text-black`}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* The products information */}
      <section className="grid grid-cols-3 mx-10 my-10 gap-10">
        {products.map((product, index) => (
          <Link
            href={`products/${product.name.trim().replace(/\s+/g, "-").toLowerCase()}`}
            key={index}
            className={`text-center ${spaceMono.className}`}
          >
            <Image
              src={product.image}
              width={600}
              height={400}
              alt={product.name}
            />
            <div className="mt-2">
              <h2>{product.name}</h2>
              <h3> ${product.price}</h3>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;
