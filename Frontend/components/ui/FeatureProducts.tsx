"use client";

import {
  fetchFeaturedProduct,
  selectFeaturedProducts,
} from "@/feature/redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { spaceMono } from "@/fonts/Fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const FeatureProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFeaturedProducts);

  useEffect(() => {
    dispatch(fetchFeaturedProduct());
  }, [dispatch]);

  return (
    <div className="mt-12 sm:mt-16 md:mt-20">
      <h2
        className={`${spaceMono.className} text-center text-xl uppercase text-[#1c1c1c] sm:text-2xl md:text-3xl`}
      >
        feature products
      </h2>
      <div className="relative mx-4 my-6 overflow-hidden sm:my-8 md:mx-15 md:my-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-10">
          {products.slice(0, 4).map((item) => (
            <div key={item._id}>
              <Link
                href={`/products/${item._id}/${item.name
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
              >
                <Image
                  alt={item.name}
                  src={item.image}
                  height={600}
                  width={600}
                  className="aspect-square object-cover transition-transform duration-300 hover:scale-105"
                />
                <h3 className={`mt-3 text-center ${spaceMono.className}`}>
                  {item.name}
                </h3>
              </Link>
              <p className={`mt-3 text-center ${spaceMono.className}`}>
                ${item.price}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center my-10">
          <Link
            href="/collections/featured"
            className={`bg-black text-white px-7 py-3 ${spaceMono.className} uppercase`}
          >
            See all featured product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
