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

const demoProductsTypes = [
  "Gift Card",
  "Headwear",
  "Sweats & Hoodies",
  "T-shirts",
  "Trousers",
];
const demoSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

export default function SortAndFilter({ totalProducts }: Props) {
  const [openSortOption, setOpenSortOption] = useState(false);
  const [openFilterOption, setOpenFilterOption] = useState(false);
  const [openProductType, setOpenProductType] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [selectFilterKey, setSelectFilterKey] = useState<string[]>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        openSortOption &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node) &&
        !mobileButtonRef.current?.contains(e.target as Node)
      ) {
        setOpenSortOption(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSortOption]);

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

  const handleFilter = () => {
    setOpenFilterOption(!openFilterOption);
  };

  const handleOpenDemoProductType = () => {
    setOpenProductType(!openProductType);
  };

  const handleOpenSize = () => {
    setOpenSize(!openSize);
  };

  const handleSelectFilterKey = (key: string) => {
    setSelectFilterKey((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  return (
    <>
      {/* DESKTOP VIEW: Identical to original code */}
      <div className="hidden md:flex relative items-center border-b border-gray-200 py-3">
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

      {/* MOBILE VIEW */}
      <div className="flex md:hidden w-full border-b border-gray-200">
        <div ref={mobileButtonRef} className="flex-1 flex items-center justify-center py-3 border-r border-gray-200 text-gray-400 hover:text-black cursor-pointer" onClick={() => setOpenSortOption((prev) => !prev)}>
          <button className={`${spaceMono.className} flex items-center gap-2 text-sm`}>
            SORT BY
          </button>
          <MdKeyboardArrowDown className={openSortOption ? "rotate-180 transition-all" : "transition-all"} />
        </div>
        <div className="flex-1 flex items-center justify-center py-3 text-gray-400 hover:text-black cursor-pointer" onClick={handleFilter}>
          <button className={`${spaceMono.className} text-sm`}>
            FILTER
          </button>
        </div>
      </div>

      {/* Sort Dropdown */}
      {openSortOption && (
        <div
          ref={wrapperRef}
          className="absolute left-0 md:left-auto md:right-36.75 p-4 border-l border-r border-b bg-white border-gray-300 z-50 w-full md:w-auto"
        >
          {sortOptions.map((option) => (
            <div key={option}>
              <button
                className={`${spaceMono.className} py-2 md:py-1 text-gray-500 hover:text-black cursor-pointer w-full text-center md:text-left text-sm md:text-base`}
                onClick={() => setOpenSortOption(false)}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Filter Drawer */}
      <aside
        ref={filterRef}
        className={`fixed right-0 top-0 z-100 flex h-full w-full max-w-md flex-col bg-white text-black shadow-2xl transition-all duration-300 ${openFilterOption
          ? "translate-x-0 opacity-100"
          : "translate-x-full pointer-events-none opacity-0"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-300 p-6">
          <h2 className={`${spaceMono.className} uppercase text-lg`}>
            Filters
          </h2>
          <FaX
            onClick={() => setOpenFilterOption(false)}
            className="cursor-pointer"
          />
        </div>

        {/* Scrollable Filter Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div>
            <div
              onClick={handleOpenDemoProductType}
              className="flex items-center justify-between w-full cursor-pointer py-3 transition-all duration-300 select-none"
            >
              <button
                className={`${spaceMono.className} uppercase cursor-pointer`}
              >
                Product Type
              </button>
              <MdOutlineKeyboardArrowDown
                size={20}
                className={`text-gray-500 transition-transform duration-300 ${openProductType ? "rotate-180" : "rotate-0"
                  }`}
              />
            </div>

            <div
              className={`grid transition-all duration-300 ease-in-out ${openProductType
                ? "grid-rows-[1fr] opacity-100 mb-5"
                : "grid-rows-[0fr] opacity-0 mb-0"
                }`}
            >
              <div className="overflow-hidden">
                {demoProductsTypes.map((type, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleSelectFilterKey(type)}
                      className={`${spaceMono.className
                        } py-1 text-gray-600 hover:text-black cursor-pointer flex items-center transition-all duration-200 ${selectFilterKey.includes(type) ? "gap-2" : "gap-0"
                        }`}
                    >
                      <span
                        className={`rounded-full transition-all duration-200 ${selectFilterKey.includes(type)
                          ? "w-1.5 h-1.5 bg-gray-700 opacity-100 scale-100"
                          : "w-0 h-1.5 opacity-0 scale-0"
                          }`}
                      />
                      <span>{type} (0)</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div
              onClick={handleOpenSize}
              className="flex items-center justify-between border-t border-gray-300 py-5 cursor-pointer select-none"
            >
              <button
                className={`${spaceMono.className} uppercase cursor-pointer`}
              >
                SIZE
              </button>
              <MdOutlineKeyboardArrowDown
                size={20}
                className={`text-gray-500 transition-transform duration-300 ${openSize ? "rotate-180" : "rotate-0"
                  }`}
              />
            </div>

            <div
              className={`grid transition-all duration-300 ease-in-out ${openSize
                ? "grid-rows-[1fr] opacity-100 pb-5"
                : "grid-rows-[0fr] opacity-0 pb-0"
                }`}
            >
              <div className="overflow-hidden">
                {demoSizes.map((size, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleSelectFilterKey(size)}
                      className={`${spaceMono.className
                        } py-1 text-gray-600 hover:text-black cursor-pointer flex items-center transition-all duration-200 ${selectFilterKey.includes(size) ? "gap-2" : "gap-0"
                        }`}
                    >
                      <span
                        className={`rounded-full transition-all duration-200 ${selectFilterKey.includes(size)
                          ? "w-1.5 h-1.5 bg-gray-700 opacity-100 scale-100"
                          : "w-0 h-1.5 opacity-0 scale-0"
                          }`}
                      />
                      <span
                        className={`transition-colors duration-200 ${selectFilterKey.includes(size)
                          ? "text-black font-medium"
                          : ""
                          }`}
                      >
                        {size} (0)
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer with View Results Button */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <button
            className={`${spaceMono.className} w-full uppercase bg-black text-white py-3 cursor-pointer hover:bg-gray-800 transition-colors`}
          >
            View Results
          </button>
        </div>
      </aside>
    </>
  );
}
