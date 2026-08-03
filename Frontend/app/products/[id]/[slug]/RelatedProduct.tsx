"use client";
import { spaceMono } from "@/fonts/Fonts";
import { demoProductApi } from "@/hook/demoProductApiHook/demoProductApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
interface Props {
  category: string;
}

const RelatedProduct = ({ category }: Props) => {
  const products = demoProductApi({ category });
  const itemsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex((prev) => prev - itemsPerPage);
    }
  };

  return (
    <div className="mt-16 ">
      <h2 className={`${spaceMono.className} text-center text-3xl`}>
        RELATED PRODUCTS
      </h2>
      <div className="mt-10 mx-10 relative overflow-hidden">
        <div
          className="flex gap-10 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(startIndex / itemsPerPage) * 100}%)`,
          }}
        >
          {products.map((product, actualIndex) => {
            const isLastInView = actualIndex === startIndex + 3;
            const isFirstInView = actualIndex === startIndex;

            return (
              <div
                key={`${product._id}-${actualIndex}`}
                className={`${spaceMono.className} text-center w-[calc(25%-30px)] shrink-0`}
              >
                <Link
                  href={`/products/${product._id}/${product.name
                    .trim()
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  onMouseEnter={() => setHoveredIndex(actualIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="related overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={600}
                      width={600}
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
                    {/* right arrow */}

                    {hoveredIndex === actualIndex &&
                      isLastInView &&
                      startIndex + itemsPerPage < products.length && (
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
                </Link>

                <h2 className="my-3">{product.name}</h2>
                <p>${product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
