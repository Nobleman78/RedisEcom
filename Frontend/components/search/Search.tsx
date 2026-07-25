import { spaceMono } from "@/fonts/Fonts";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { searchProducts } from "../../feature/product/productApi";

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

  const runSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      setHasSearched(false);
      setError("");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await searchProducts({ search: query, page: 1 });
      setProducts(data.products ?? []);
      setHasSearched(true);
    } catch {
      setError("Could not load results. Try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(()=>{
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(()=> runSearch(term),300)
    return ()=> clearTimeout(debounceRef.current)
  },[term,runSearch])

  return (
    <div className="w-full">
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
        className={`w-full  px-4 py-3 text-white outline-none ${spaceMono.className}`}
      />

      {error && (
        <div
          className={`absolute bg-black top-[90px] py-10 w-full inset-0 text-center ${spaceMono.className}`}
        >
          {loading && <p>Searching…</p>}
          {error && <p>{error}</p>}
          {hasSearched && !loading && !error && products.length === 0 && (
            <p>No products match “{term}”.</p>
          )}
        </div>
      )}

      <ul className="search__results">
        {products.map((p) => (
          <li key={p._id}>
            {p.image && <Image src={p.image} alt="" />}
            <div>
              <span>{p.name}</span>
              <span>${p.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
