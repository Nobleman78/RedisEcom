"use client";

import { searchProducts } from "@/feature/redux/product/productApi";
import { spaceMono } from "@/fonts/Fonts";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProductGrid from "../collections/[category]/ProductGrid";

interface SearchProductProps {
  query: string;
}

const SearchProduct = ({ query }: SearchProductProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await searchProducts({
          search: query,
          page: 1,
          limit: 20,
        });

        if (!cancelled) {
          setProducts(data.products ?? []);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
          setError("Could not load products");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [query]);

  // 1. Get unique categories using Array.from and Set

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean)),
  );
  const uniqueProductSize = Array.from(
    new Set(products.flatMap((product) => product.size).filter(Boolean)),
  );

  return (
    <div className="mt-40 mx-12">
      <p className={`${spaceMono.className} text-center uppercase text-3xl`}>
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
          <div className="flex flex-row gap-8">
            <aside className="w-1/6 flex flex-col gap-4 mt-8">
              <div className="flex flex-row items-center justify-between cursor-pointer">
                <h3 className={`${spaceMono.className} uppercase text-lg`}>
                  Product Type
                </h3>
                <MdOutlineKeyboardArrowDown />
              </div>
              {/* Category div */}
              <div className="flex flex-col gap-2">
                {uniqueCategories.map((category) => (
                  <button
                    key={category}
                    className={`${spaceMono.className} text-left w-full capitalize`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {/* Size div */}

              <div className="flex flex-row items-center justify-between cursor-pointer border-t border-gray-300">
                <h3 className={`${spaceMono.className} uppercase text-lg`}>
                  Size
                </h3>
                <MdOutlineKeyboardArrowDown />
              </div>
              <div className="flex flex-col gap-2">
                {uniqueProductSize.map((size, index) => (
                  <button key={index}>{size}</button>
                ))}
              </div>
            </aside>
            <div className="w-3/3">
              <ProductGrid products={products} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SearchProduct;
