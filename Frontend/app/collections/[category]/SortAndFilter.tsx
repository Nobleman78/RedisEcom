"use client";

import { useEffect, useRef, useState } from "react";

import { MdKeyboardArrowDown, MdOutlineKeyboardArrowDown } from "react-icons/md";

import { spaceMono } from "@/fonts/Fonts";
import sortOptions from "@/hook/sort/sortOption";
import { FaX } from "react-icons/fa6";

interface Props {
  totalProducts: number;
  productTypes: string[];
  sizes: string[];
  selectedProductTypes: string[];
  selectedSizes: string[];
  onSortChange: (value: string) => void;
  onApplyFilters: () => void;
  onToggleProductType: (value: string) => void;
  onToggleSize: (value: string) => void;
}

export default function SortAndFilter({
  totalProducts,
  productTypes,
  sizes,
  selectedProductTypes,
  selectedSizes,
  onSortChange,
  onApplyFilters,
  onToggleProductType,
  onToggleSize,
}: Props) {
  const [openSortOption, setOpenSortOption] = useState(false);
  const [openFilterOption, setOpenFilterOption] = useState(false);
  const [openProductType, setOpenProductType] = useState(false);
  const [openSize, setOpenSize] = useState(false);

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
    return () => document.removeEventListener("mousedown", handleClickOutsideFilter);
  }, [openFilterOption]);

  const handleFilter = () => {
    setOpenFilterOption((prev) => !prev);
  };

  return (
    <>
      <div className="relative hidden items-center border-b border-gray-200 py-3 md:flex">
        <section className="w-full">
          <h2 className={`${spaceMono.className} text-center text-gray-500`}>
            {totalProducts} PRODUCTS FOUND
          </h2>
        </section>

        <div className="absolute inset-y-0 right-5 flex">
          <div className="flex w-40 items-center justify-center border-l border-gray-200 text-gray-400 hover:text-black">
            <button
              ref={buttonRef}
              onClick={() => setOpenSortOption((prev) => !prev)}
              className={`${spaceMono.className} flex cursor-pointer items-center gap-2`}
            >
              SORT BY
            </button>
            <MdKeyboardArrowDown
              className={openSortOption ? "rotate-180 transition-all" : "transition-all"}
            />
          </div>

          <div className="flex w-32 items-center justify-center border-l border-gray-200">
            <button
              onClick={handleFilter}
              className={`${spaceMono.className} cursor-pointer text-gray-400`}
            >
              FILTER
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full border-b border-gray-200 md:hidden">
        <div
          ref={mobileButtonRef}
          className="flex flex-1 cursor-pointer items-center justify-center border-r border-gray-200 py-3 text-gray-400 hover:text-black"
          onClick={() => setOpenSortOption((prev) => !prev)}
        >
          <button className={`${spaceMono.className} flex items-center gap-2 text-sm`}>
            SORT BY
          </button>
          <MdKeyboardArrowDown
            className={openSortOption ? "rotate-180 transition-all" : "transition-all"}
          />
        </div>
        <div
          className="flex flex-1 cursor-pointer items-center justify-center py-3 text-gray-400 hover:text-black"
          onClick={handleFilter}
        >
          <button className={`${spaceMono.className} text-sm`}>FILTER</button>
        </div>
      </div>

      {openSortOption && (
        <div
          ref={wrapperRef}
          className="absolute left-0 z-50 w-full border-l border-r border-b border-gray-300 bg-white p-4 md:left-auto md:right-36.75 md:w-auto"
        >
          {sortOptions.map((option) => (
            <div key={option.value}>
              <button
                className={`${spaceMono.className} w-full py-2 text-center text-sm text-gray-500 hover:text-black md:py-1 md:text-left md:text-base`}
                onClick={() => {
                  onSortChange(option.value);
                  setOpenSortOption(false);
                }}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>
      )}

      <aside
        ref={filterRef}
        className={`fixed right-0 top-0 z-100 flex h-full w-full max-w-md flex-col bg-white text-black shadow-2xl transition-all duration-300 ${
          openFilterOption
            ? "translate-x-0 opacity-100"
            : "translate-x-full pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-300 p-6">
          <h2 className={`${spaceMono.className} uppercase text-lg`}>Filters</h2>
          <FaX onClick={() => setOpenFilterOption(false)} className="cursor-pointer" />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div>
            <div
              onClick={() => setOpenProductType((prev) => !prev)}
              className="flex w-full cursor-pointer select-none items-center justify-between py-3 transition-all duration-300"
            >
              <button className={`${spaceMono.className} cursor-pointer uppercase`}>
                Product Type
              </button>
              <MdOutlineKeyboardArrowDown
                size={20}
                className={`text-gray-500 transition-transform duration-300 ${
                  openProductType ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openProductType ? "mb-5 grid-rows-[1fr] opacity-100" : "mb-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {productTypes.length > 0 ? (
                  productTypes.map((type) => (
                    <div key={type}>
                      <button
                        onClick={() => onToggleProductType(type)}
                        className={`${spaceMono.className} flex cursor-pointer items-center py-1 text-gray-600 transition-all duration-200 hover:text-black ${
                          selectedProductTypes.includes(type) ? "gap-2" : "gap-0"
                        }`}
                      >
                        <span
                          className={`rounded-full transition-all duration-200 ${
                            selectedProductTypes.includes(type)
                              ? "h-1.5 w-1.5 scale-100 bg-gray-700 opacity-100"
                              : "h-1.5 w-0 scale-0 opacity-0"
                          }`}
                        />
                        <span>{type}</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="py-1 text-sm text-gray-500">No product types available</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div
              onClick={() => setOpenSize((prev) => !prev)}
              className="flex cursor-pointer select-none items-center justify-between border-t border-gray-300 py-5"
            >
              <button className={`${spaceMono.className} cursor-pointer uppercase`}>
                SIZE
              </button>
              <MdOutlineKeyboardArrowDown
                size={20}
                className={`text-gray-500 transition-transform duration-300 ${
                  openSize ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openSize ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] pb-0 opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {sizes.length > 0 ? (
                  sizes.map((size) => (
                    <div key={size}>
                      <button
                        onClick={() => onToggleSize(size)}
                        className={`${spaceMono.className} flex cursor-pointer items-center py-1 text-gray-600 transition-all duration-200 hover:text-black ${
                          selectedSizes.includes(size) ? "gap-2" : "gap-0"
                        }`}
                      >
                        <span
                          className={`rounded-full transition-all duration-200 ${
                            selectedSizes.includes(size)
                              ? "h-1.5 w-1.5 scale-100 bg-gray-700 opacity-100"
                              : "h-1.5 w-0 scale-0 opacity-0"
                          }`}
                        />
                        <span>{size}</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="py-1 text-sm text-gray-500">No sizes available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white p-6">
          <button
            type="button"
            onClick={() => {
              onApplyFilters();
              setOpenFilterOption(false);
            }}
            className={`${spaceMono.className} w-full cursor-pointer bg-black py-3 uppercase text-white transition-colors hover:bg-gray-800`}
          >
            Filter Result
          </button>
        </div>
      </aside>
    </>
  );
}
