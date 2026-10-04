import { useLazyGetProductsQuery } from "@/feature/redux/product/productApi";
import { spaceMono } from "@/fonts/Fonts";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

interface SearchProps {
  onProductSelect?: () => void;
}

const Search: React.FC<SearchProps> = ({ onProductSelect }) => {
  const [term, setTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );
  const [triggerSearch, { data, isFetching, isError }] =
    useLazyGetProductsQuery();

  const products = data?.products ?? [];

  // debounce: wait 300ms after the user stops typing before firing the request
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Determine product count and button visibility based on screen size
  const getProductCount = () => {
    if (screenSize === "mobile") return 1;
    if (screenSize === "tablet") return 2;
    return 8;
  };

  const shouldShowButton = () => {
    const count = getProductCount();
    return products.length > count;
  };

  const productCount = getProductCount();

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const runSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        return;
      }

      try {
        await triggerSearch({
          search: query,
          page: 1,
        }).unwrap();
        setHasSearched(true);
      } catch {
        setHasSearched(true);
      }
    },
    [triggerSearch],
  );

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!term.trim()) {
      debounceRef.current = setTimeout(() => setHasSearched(false), 0);
    } else {
      debounceRef.current = setTimeout(() => runSearch(term), 300);
    }
    return () => clearTimeout(debounceRef.current);
  }, [term, runSearch]);

  const loading = isFetching;
  const error = isError ? "Can not load result" : "";

  return (
    <div className="w-full flex items-center justify-between">
      <input
        type="text"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
        }}
        placeholder="SEARCH PRODUCTS..."
        className={`w-full px-4 py-3 text-white outline-none ${spaceMono.className}`}
      />
      {/* Cross button */}
      <FiX
        onClick={() => onProductSelect?.()}
        size={24}
        className="cursor-pointer "
      />

      {/* Search Results */}
      {term.trim() && (
        <>
          {/* Loading */}
          {loading && (
            <div
              className={`absolute left-0 right-0 top-24 z-20 flex min-h-56 max-h-[calc(100dvh-6rem)] items-center justify-center overflow-y-auto bg-black ${spaceMono.className}`}
            >
              <p className="text-white">Searching...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className={`absolute left-0 right-0 top-24 z-20 flex min-h-56 max-h-[calc(100dvh-6rem)] items-center justify-center overflow-y-auto bg-black ${spaceMono.className}`}
            >
              <p className="text-white">{error}</p>
            </div>
          )}

          {/* No products */}
          {!loading && hasSearched && !error && products.length === 0 && (
            <div
              className={`absolute left-0 right-0 top-24 z-20 flex min-h-56 max-h-[calc(100dvh-6rem)] items-center justify-center overflow-y-auto bg-black ${spaceMono.className}`}
            >
              <p className="text-white">No products match</p>
            </div>
          )}

          {/* Products */}
          {!loading && hasSearched && !error && products.length > 0 && (
            <div className="absolute left-0 right-0 top-24 z-10 max-h-[calc(100dvh-6rem)] min-h-100 overflow-y-auto overscroll-contain bg-black pb-[env(safe-area-inset-bottom)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-5 mx-4 sm:mx-8 lg:mx-15 pt-6">
                {products.slice(0, productCount).map((p) => (
                  <Link
                    href={`/products/${p._id}/${p.name
                      .trim()
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    key={p._id}
                    onClick={() => onProductSelect?.()}
                  >
                    <div className="relative aspect-[3/2] w-full">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`${spaceMono.className} flex flex-col mt-5`}
                    >
                      <span>{p.name}</span>
                      <span>${p.price}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {shouldShowButton() && (
                <div className="flex justify-center mt-10 pb-6 ">
                  <Link
                    href={`/search?q=${encodeURIComponent(term)}`}
                    onClick={() => onProductSelect?.()}
                    className={`${spaceMono.className} bg-white text-black px-5 py-2`}
                  >
                    Show all products
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
