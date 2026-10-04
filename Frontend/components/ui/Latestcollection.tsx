"use client";

import { ProductGridSkeleton } from "@/components/ui/ProductSkeleton";
import { useGetLatestProductsQuery } from "@/feature/redux/product/productApi";
import { spaceMono } from "@/fonts/Fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Latestcollection = () => {
  const ITEMS_PER_PAGE = 4;
  const {
    data: products = [],
    isLoading,
    isFetching,
    isSuccess,
  } = useGetLatestProductsQuery();
  const showSkeleton = !isSuccess;

  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (startIndex + ITEMS_PER_PAGE < products.length) {
      setStartIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (startIndex - ITEMS_PER_PAGE >= 0) {
      setStartIndex((prev) => prev - ITEMS_PER_PAGE);
    }
  };

  // Calculate current page number (0, 1, 2...)
  const pageIndex = startIndex / ITEMS_PER_PAGE;

  if (showSkeleton || isLoading || isFetching || !isSuccess) {
    return (
      <div className="mt-12 sm:mt-16 md:mt-20">
        <h2
          className={`${spaceMono.className} text-center text-xl uppercase text-[#1c1c1c] sm:text-2xl md:text-3xl`}
        >
          Latest
        </h2>
        <ProductGridSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="mt-12 sm:mt-16 md:mt-20">
      <h2
        className={`${spaceMono.className} text-center text-xl uppercase text-[#1c1c1c] sm:text-2xl md:text-3xl`}
      >
        Latest
      </h2>

      {/* Outer Viewport */}
      <div className="relative mx-4 my-6 overflow-hidden sm:my-8 md:mx-15 md:my-10">
        {/* Animated Sliding Track */}
        <div
          className="flex gap-4 md:gap-10 transition-transform duration-500 ease-in-out overflow-x-auto snap-x snap-mandatory md:overflow-visible md:snap-none max-md:[transform:none!important] [&::-webkit-scrollbar]:hidden"
          style={{
            // Shift by 100% of the container width PLUS 40px (gap-10) per page
            transform: `translateX(calc(-${pageIndex * 100}% - ${pageIndex * 40}px))`,
          }}
        >
          {products.map((item, actualIndex) => {
            const isLastInView = actualIndex === startIndex + 3;
            const isFirstInView = actualIndex === startIndex;

            return (
              <div
                key={actualIndex}
                className="w-[85vw] sm:w-[calc(50%-1rem)] md:w-[calc((100%-120px)/4)] shrink-0 snap-center md:snap-align-none"
              >
                <Link
                  href={`/products/${item._id}/${item.name
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  onMouseEnter={() => setHoveredIndex(actualIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      alt={item.name}
                      src={item.image}
                      height={600}
                      width={600}
                      className="object-cover transition-transform duration-300 hover:scale-110 aspect-square"
                    />

                    {/* Left Arrow */}
                    {hoveredIndex === actualIndex &&
                      isFirstInView &&
                      startIndex > 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrev();
                          }}
                          className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-xl z-10 transition-all duration-300 animate-fadeIn"
                        >
                          <MdKeyboardArrowLeft
                            size={22}
                            className="cursor-pointer text-black"
                          />
                        </button>
                      )}

                    {/* Right Arrow */}
                    {hoveredIndex === actualIndex &&
                      isLastInView &&
                      startIndex + ITEMS_PER_PAGE < products.length && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleNext();
                          }}
                          className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-xl z-10 transition-all duration-300 animate-fadeIn"
                        >
                          <MdKeyboardArrowRight
                            size={22}
                            className="cursor-pointer text-black"
                          />
                        </button>
                      )}
                  </div>

                  <h2 className={`text-center mt-3 ${spaceMono.className}`}>
                    {item.name}
                  </h2>
                </Link>

                <h3 className={`mt-3 text-center ${spaceMono.className}`}>
                  ${item.price}
                </h3>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center my-10">
          <Link
            href="/collections/latest"
            className={`bg-black text-white px-7 py-3 ${spaceMono.className} uppercase`}
          >
            See all latest
          </Link>
        </div>
      </div>
      <hr className="text-gray-200" />
    </div>
  );
};

export default Latestcollection;
