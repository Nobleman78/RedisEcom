"use client";

import { spaceMono } from "@/fonts/Fonts";
import Latestone from "@/public/latestcollection/Latest-1.webp";
import Latesttwo from "@/public/latestcollection/Latest-2.webp";
import Latestthree from "@/public/latestcollection/Latest-3.webp";
import Latestfour from "@/public/latestcollection/Latest-4.webp";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Latestcollection = () => {
  const latestCollections = [
    {
      img: Latestone,
      title: "By Parra Wrapped Around T-shirt -Dirty White",
      price: 30,
    },
    {
      img: Latesttwo,
      title: "By Parra Wrapped Around T-shirt -Dirty White",
      price: 30,
    },
    { img: Latestthree, title: "By Parra Bear Dog T-Shirt - White", price: 30 },
    {
      img: Latestfour,
      title: "By Parra Vertical Thought T-Shirt - White",
      price: 30,
    },
    {
      img: Latestone,
      title: "By Parra Wrapped Around T-shirt -Dirty White",
      price: 30,
    },
    {
      img: Latesttwo,
      title: "By Parra Wrapped Around T-shirt -Dirty White",
      price: 30,
    },
    { img: Latestthree, title: "By Parra Bear Dog T-Shirt - White", price: 30 },
    {
      img: Latestfour,
      title: "By Parra Vertical Thought T-Shirt - White",
      price: 30,
    },
  ];

  const ITEMS_PER_PAGE = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (startIndex + ITEMS_PER_PAGE < latestCollections.length) {
      setStartIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (startIndex - ITEMS_PER_PAGE >= 0) {
      setStartIndex((prev) => prev - ITEMS_PER_PAGE);
    }
  };

  return (
    <div className="mt-20">
      <h2
        className={`${spaceMono.className} text-center uppercase text-3xl text-[#1c1c1c]`}
      >
        Latest
      </h2>

      {/* Outer Viewport (Clips items sliding out) */}
      <div className="relative mx-15 my-10 overflow-hidden">
        {/* Animated Sliding Track */}
        <div
          className="flex gap-10 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(startIndex / ITEMS_PER_PAGE) * 100}%)`,
          }}
        >
          {latestCollections.map((item, actualIndex) => {
            const isLastInView = actualIndex === startIndex + 3;
            const isFirstInView = actualIndex === startIndex;

            return (
              <div
                key={actualIndex}
                className="w-[calc(25%-30px)] flex-shrink-0"
              >
                <Link
                  href={`/latestcollections/${item.title
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")}`}
                  onMouseEnter={() => setHoveredIndex(actualIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      alt={item.title}
                      src={item.img}
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />

                    {/* Left Arrow with Fade & Slide animation on hover */}
                    {hoveredIndex === actualIndex &&
                      isFirstInView &&
                      startIndex > 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrev();
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-xl z-10 transition-all duration-300 animate-fadeIn"
                        >
                          <MdKeyboardArrowLeft
                            size={22}
                            className="cursor-pointer text-black"
                          />
                        </button>
                      )}

                    {/* Right Arrow with Fade & Slide animation on hover */}
                    {hoveredIndex === actualIndex &&
                      isLastInView &&
                      startIndex + ITEMS_PER_PAGE <
                        latestCollections.length && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleNext();
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-xl z-10 transition-all duration-300 animate-fadeIn"
                        >
                          <MdKeyboardArrowRight
                            size={22}
                            className="cursor-pointer text-black"
                          />
                        </button>
                      )}
                  </div>

                  <h2 className={`text-center mt-3 ${spaceMono.className}`}>
                    {item.title}
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
            className={` bg-black text-white px-7 py-3 ${spaceMono.className} uppercase`}
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
