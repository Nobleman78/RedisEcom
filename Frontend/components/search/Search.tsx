import { spaceMono } from "@/fonts/Fonts";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { searchProducts } from "../../feature/product/productApi";
import { demoProducts } from "../../public/DemoProducts/demoproducts";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
}

const Search: React.FC = () => {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // debounce: wait 300ms after the user stops typing before firing the request
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const getDemoResults = useCallback((query: string): Product[] => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return demoProducts.filter((product) => {
      const haystack = [
        product.name,
        product.description,
        product.category ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    }) as Product[];
  }, []);

  const runSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        return;
      }

      try {
        const data = await searchProducts({
          search: query,
          page: 1,
        });

        setProducts(data.products ?? []);
        setHasSearched(true);
        setError("");
      } catch {
        const fallbackResults = getDemoResults(query);

        setProducts(fallbackResults);
        setHasSearched(true);

        if (fallbackResults.length === 0) {
          setError("Could not load results. Showing demo products instead.");
        } else {
          setError("");
        }
      } finally {
        setLoading(false);
      }
    },
    [getDemoResults],
  );

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(term), 300);
    return () => clearTimeout(debounceRef.current);
  }, [term, runSearch]);

  return (
    <div className="w-full">
      <input
        type="text"
        value={term}
        onChange={(e) => {
          const value = e.target.value;
          setTerm(value);

          if (!value.trim()) {
            setProducts([]);
            setHasSearched(false);
            setLoading(false);
            setError("");
          } else {
            setLoading(true);
            setHasSearched(false);
            setError("");
          }
        }}
        placeholder="Search products..."
        aria-label="Search products"
        className={`w-full px-4 py-3 text-white outline-none ${spaceMono.className}`}
      />

      {/* Search Results */}
      {term.trim() && (
        <>
          {/* Loading */}
          {loading && (
            <div
              className={`absolute top-24 left-0 right-0 bg-black h-[400px] flex items-center justify-center z-20 ${spaceMono.className}`}
            >
              <p className="text-white">Searching...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className={`absolute top-24 left-0 right-0 bg-black h-[400px] flex items-center justify-center z-20 ${spaceMono.className}`}
            >
              <p className="text-white">{error}</p>
            </div>
          )}

          {/* No products */}
          {!loading && hasSearched && !error && products.length === 0 && (
            <div
              className={`absolute top-24 left-0 right-0 bg-black h-[400px] flex items-center justify-center z-20 ${spaceMono.className}`}
            >
              <p className="text-white">No products match</p>
            </div>
          )}

          {/* Products */}
          {!loading && hasSearched && !error && products.length > 0 && (
            <div className="absolute top-24 left-0 right-0 bg-black h-[500px] z-10 overflow-y-auto overscroll-contain">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-5 mx-4 sm:mx-8 lg:mx-15 pt-6">
                {products.slice(0, 8).map((p) => (
                  <Link href="" key={p._id}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />

                    <div
                      className={`${spaceMono.className} flex flex-col mt-5`}
                    >
                      <span>{p.name}</span>
                      <span>${p.price}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {products.length > 8 && (
                <div className="flex justify-center mt-10 pb-6">
                  <Link
                    href="/collections/products"
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
