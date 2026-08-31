"use client";

import { useGetProductsQuery } from "@/feature/redux/product/productApi";
import { spaceMono } from "@/fonts/Fonts";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProductGrid from "../collections/[category]/ProductGrid";

interface SearchProductProps {
  query: string;
}

const SearchProduct = ({ query }: SearchProductProps) => {
  const {
    data,
    isLoading: loading,
    isError,
  } = useGetProductsQuery(
    {
      search: query,
      page: 1,
      limit: 20,
    },
    { skip: !query },
  );

  const products = data?.products ?? [];
  const error = isError ? "Could not load products" : "";

  // 1. Get unique categories using Array.from and Set
  const uniqueProductTypes = Array.from(
    new Set(products.map((product) => product.productType).filter(Boolean)),
  );
  const uniqueProductSize = Array.from(
    new Set(products.flatMap((product) => product.size ?? [])),
  ).filter((size) => Boolean(size));

  const productCountBySize = new Map(
    uniqueProductSize.map((size) => [
      size,
      products.filter((product) => product.size?.includes(size)).length,
    ]),
  );

  return (
    <div className="mx-4 mb-10 mt-20 sm:mx-6 sm:mt-24 md:mx-12 md:mt-28">
      <p
        className={`${spaceMono.className} text-center text-xl uppercase sm:text-2xl md:text-3xl`}
      >
        search
      </p>
      <p className={`${spaceMono.className} text-center mt-5`}>
        {loading ? "Searching..." : `${products.length} Results for "${query}"`}
      </p>
      {error ? (
        <p className={`${spaceMono.className} text-center mt-10`}>{error}</p>
      ) : !loading && products.length === 0 ? (
        <p className={`${spaceMono.className} text-center mt-10`}>
          No products match &quot;{query}&quot;
        </p>
      ) : (
        !loading && (
          <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:gap-8">
            <aside className="w-full lg:w-1/6 flex flex-col gap-4 mt-8">
              <div className="flex flex-row items-center justify-between cursor-pointer">
                <h3 className={`${spaceMono.className} uppercase text-lg`}>
                  Product Type
                </h3>
                <MdOutlineKeyboardArrowDown />
              </div>
              {/* Category div */}
              <div className="flex flex-col gap-2">
                {uniqueProductTypes.map((producttype) => (
                  <button
                    key={producttype}
                    className={`${spaceMono.className} text-left w-full capitalize cursor-pointer text-gray-600 hover:text-black`}
                  >
                    {producttype}
                  </button>
                ))}
              </div>

              {/* Size div */}

              <div className="flex flex-row items-center justify-between cursor-pointer border-t border-gray-300 mt-5">
                <h3 className={`${spaceMono.className} uppercase text-lg my-3`}>
                  Size
                </h3>
                <MdOutlineKeyboardArrowDown />
              </div>
              <div className="flex flex-col   ">
                {uniqueProductSize.map((size, index) => (
                  <button
                    className={`${spaceMono.className} text-start text-gray-600 hover:text-black cursor-pointer`}
                    key={index}
                  >
                    {size} ({productCountBySize.get(size) ?? 0})
                  </button>
                ))}
              </div>
            </aside>
            <div className="w-full lg:w-5/6">
              <ProductGrid products={products} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SearchProduct;
