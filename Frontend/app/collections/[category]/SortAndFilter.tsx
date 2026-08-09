"use client";

import { useEffect, useRef, useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";

import { spaceMono } from "@/fonts/Fonts";
import sortOptions from "@/hook/sort/sortOption";

interface Props {
  totalProducts: number;
}

export default function SortAndFilter({ totalProducts }: Props) {
  const [openSortOption, setOpenSortOption] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        openSortOption &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpenSortOption(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSortOption]);

  return (
    <>
      <div className="relative flex items-center border-b border-gray-200 py-3">
        <section className="w-full">
          <h2 className={`${spaceMono.className} text-center text-gray-500`}>
            {totalProducts} PRODUCTS FOUND
          </h2>
        </section>

        <div className="absolute right-5 inset-y-0 flex">
          <div className="flex items-center justify-center w-40 border-l border-gray-200 text-gray-400 hover:text-black">
            <button
              ref={buttonRef}
              onClick={() => setOpenSortOption((prev) => !prev)}
              className={`${spaceMono.className} flex items-center gap-2`}
            >
              SORT BY
            </button>

            <MdKeyboardArrowDown
              className={
                openSortOption ? "rotate-180 transition-all" : "transition-all"
              }
            />
          </div>

          <div className="flex items-center justify-center w-32 border-l border-gray-200">
            <button className={`${spaceMono.className} text-gray-400`}>
              FILTER
            </button>
          </div>
        </div>
      </div>

      {openSortOption && (
        <div
          ref={wrapperRef}
          className="absolute right-36.75 p-4 border-l border-r border-b bg-white border-gray-300"
        >
          {sortOptions.map((option) => (
            <div key={option}>
              <button className={`${spaceMono.className} py-1 text-gray-500 hover:text-black  cursor-pointer`}>
                {option}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
