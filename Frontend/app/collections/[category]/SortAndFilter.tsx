"use client";

import { useEffect, useRef, useState } from "react";

import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import { spaceMono } from "@/fonts/Fonts";
import sortOptions from "@/hook/sort/sortOption";
import { FaX } from "react-icons/fa6";

interface Props {
  totalProducts: number;
}

export default function SortAndFilter({ totalProducts }: Props) {
  const [openSortOption, setOpenSortOption] = useState(false);
  const [openFilterOption, setOpenFilterOption] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

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

  // handle click outiside to close the filter

  useEffect(() => {
    function handleClickOutsideFilter(e: MouseEvent) {
      if (
        openFilterOption &&
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      ) {
        setOpenFilterOption(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideFilter);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideFilter);
  }, [openFilterOption]);

  // event handler for filter option
  const handleFilter = () => {
    setOpenFilterOption(!openFilterOption);
  };

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
              className={`${spaceMono.className} flex items-center gap-2 cursor-pointer`}
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
            <button
              onClick={handleFilter}
              className={`${spaceMono.className} text-gray-400 cursor-pointer`}
            >
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
              <button
                className={`${spaceMono.className} py-1 text-gray-500 hover:text-black  cursor-pointer`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      )}

      {/*  This is for filter option */}

      <aside
        ref={filterRef}
        className={`fixed right-0 top-0 z-100 flex h-full w-full max-w-md flex-col  bg-white text-black shadow-2xl transition-all duration-300  ${openFilterOption ? "translate-x-0 opacity-100" : "translate-x-full pointer-events-none opacity-0"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-300 p-6">
          <h2 className={`${spaceMono.className} uppercase text-lg`}>
            Filters
          </h2>
          <FaX
            onClick={() => setOpenFilterOption(false)}
            className="cursor-pointer"
          />
        </div>

        {/* Product type, brand , size */}
        <div className="p-6 space-y-10 mt-5">
          <div className="flex items-start justify-between border-b border-gray-300 space-y-5">
            <button
              className={`${spaceMono.className} uppercase cursor-pointer`}
            >
              Product Type
            </button>
            <MdOutlineKeyboardArrowDown size={20} className="text-gray-500" />
          </div>
          <div className="flex items-start justify-between border-b border-gray-300 space-y-5">
            <button
              className={`${spaceMono.className} uppercase cursor-pointer`}
            >
              Brand
            </button>
            <MdOutlineKeyboardArrowDown size={20} className="text-gray-500" />
          </div>
          <div className="flex items-start justify-between border-b border-gray-300 space-y-5">
            <button
              className={`${spaceMono.className} uppercase cursor-pointer`}
            >
              SIZE
            </button>
            <MdOutlineKeyboardArrowDown size={20} className="text-gray-500" />
          </div>
        </div>
      </aside>
    </>
  );
}
