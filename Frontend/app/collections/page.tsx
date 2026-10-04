"use client";

import { CategoriesSkeleton } from "@/components/ui/ProductSkeleton";
import { useGetCategoriesQuery } from "@/feature/redux/product/productApi";
import { spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

const Page = () => {
  const { data, isLoading, isFetching, isSuccess } = useGetCategoriesQuery();
  const categoris = data?.categories ?? [];
  const showSkeleton = !isSuccess;

  const colors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
  ];
  return (
    <div className="mx-4 mt-24 py-8 sm:mx-6 sm:mt-28 sm:py-10 md:mx-10 md:mt-40">
      <p
        className={`${spaceMono.className} text-center text-xl uppercase sm:text-2xl`}
      >
        All Collections
      </p>
      {showSkeleton || isLoading || isFetching ? (
        <CategoriesSkeleton count={3} />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 md:grid-cols-3">
          {categoris.map((category, index) => (
            <Link
              key={index}
              href={`/collections/${category.toLowerCase()}`}
              className={`flex min-h-56 items-start px-5 py-8 text-base uppercase text-white sm:min-h-72 sm:px-8 sm:py-10 sm:text-lg md:min-h-80 ${colors[index % colors.length]} ${spaceMono.className}`}
            >
              {category}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
