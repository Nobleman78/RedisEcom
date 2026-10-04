"use client";

import { ProductGridSkeleton } from "@/components/ui/ProductSkeleton";
import { useGetProductsQuery } from "@/feature/redux/product/productApi";
import { spaceMono } from "@/fonts/Fonts";
import { filterProducts, sortProducts } from "@/lib/productCatalog";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProductGrid from "../collections/[category]/ProductGrid";

interface SearchProductProps {
  query: string;
}

const sortByOption = [
  { label: "Price, low to high", value: "price-low-to-high" },
  { label: "Price, high to low", value: "price-high-to-low" },
  { label: "Alphabetically A-Z", value: "alphabetically-a-z" },
  { label: "Alphabetically Z-A", value: "alphabetically-z-a" },
];

const SearchProduct = ({ query }: SearchProductProps) => {
  const { data, isError, isSuccess } = useGetProductsQuery(
    {
      search: query,
      page: 1,
      limit: 20,
    },
    { skip: !query },
  );

  const products = data?.products ?? [];
  const showSkeleton = !isSuccess;
  const error = isError ? "Could not load products" : "";

  const [openProductType, setOpenProductType] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    [],
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState("most-relevant");

  const handleToggleProductType = (type: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

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

  const filtered = filterProducts(
    products,
    selectedProductTypes,
    selectedSizes,
  );
  const filteredAndSortedProducts = sortProducts(filtered, sortValue);

  return (
    <div className="mx-4 mb-10 mt-40 sm:mx-6">
      <p
        className={`${spaceMono.className} text-center text-xl uppercase sm:text-2xl md:text-3xl`}
      >
        search
      </p>
      <p className={`${spaceMono.className} text-center mt-5`}>
        {showSkeleton
          ? "Searching..."
          : `${filteredAndSortedProducts.length} Results for "${query}"`}
      </p>
      {error ? (
        <p className={`${spaceMono.className} text-center mt-10`}>{error}</p>
      ) : showSkeleton ? (
        <ProductGridSkeleton count={6} />
      ) : filteredAndSortedProducts.length === 0 ? (
        <p className={`${spaceMono.className} text-center mt-10`}>
          No products match &quot;{query}&quot;
        </p>
      ) : (
        <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:gap-8">
          <aside className="w-full lg:w-1/6 flex flex-col gap-4 mt-8">
            {/* Product Type */}
            <div
              onClick={() => setOpenProductType(!openProductType)}
              className="flex flex-row items-center justify-between cursor-pointer transition-all duration-500"
            >
              <h3 className={`${spaceMono.className} uppercase text-lg`}>
                Product Type
              </h3>
              <MdOutlineKeyboardArrowDown
                className={`transition-transform duration-500 ${openProductType ? "rotate-180" : ""}`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${openProductType ? "max-h-96" : "max-h-0"}`}
            >
              <div className="flex flex-col gap-2">
                {uniqueProductTypes.map((producttype) => (
                  <button
                    key={producttype}
                    onClick={() => handleToggleProductType(producttype)}
                    className={`${spaceMono.className} text-left w-full capitalize cursor-pointer flex items-center gap-2 ${selectedProductTypes.includes(producttype) ? "text-black" : "text-gray-600 hover:text-black"}`}
                  >
                    <span
                      className={`rounded-full transition-all duration-200 ${
                        selectedProductTypes.includes(producttype)
                          ? "h-1.5 w-1.5 scale-100 bg-gray-700 opacity-100"
                          : "h-1.5 w-0 scale-0 opacity-0"
                      }`}
                    />
                    {producttype}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div
              onClick={() => setOpenSize(!openSize)}
              className="flex flex-row items-center justify-between cursor-pointer border-t border-gray-300 transition-all duration-500"
            >
              <h3 className={`${spaceMono.className} uppercase text-lg my-3`}>
                Size
              </h3>
              <MdOutlineKeyboardArrowDown
                className={`transition-transform duration-500 ${openSize ? "rotate-180" : ""}`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${openSize ? "max-h-96" : "max-h-0"}`}
            >
              <div className="flex flex-col">
                {uniqueProductSize.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleToggleSize(size)}
                    className={`${spaceMono.className} text-start cursor-pointer flex items-center gap-2 py-1 ${selectedSizes.includes(size) ? "text-black" : "text-gray-600 hover:text-black"}`}
                  >
                    <span
                      className={`rounded-full transition-all duration-200 ${
                        selectedSizes.includes(size)
                          ? "h-1.5 w-1.5 scale-100 bg-gray-700 opacity-100"
                          : "h-1.5 w-0 scale-0 opacity-0"
                      }`}
                    />
                    {size} ({productCountBySize.get(size) ?? 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="border-t border-gray-300 pt-4">
              <h3 className={`${spaceMono.className} uppercase text-lg mb-3`}>
                Sort by
              </h3>
            </div>
            <div className="flex flex-col items-start gap-2">
              {sortByOption.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortValue(option.value)}
                  className={`${spaceMono.className} text-start cursor-pointer ${sortValue === option.value ? "text-black font-bold" : "text-gray-600 hover:text-black"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </aside>
          <div className="w-full lg:w-5/6">
            <ProductGrid products={filteredAndSortedProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
