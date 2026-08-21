"use client";

import {
  fetchProductByCategory,
  selectProducts,
  selectProductStatus,
} from "@/feature/redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { spaceMono } from "@/fonts/Fonts";
import { use, useEffect } from "react";
import Breadcrumb from "./BreadCrumb";
import ProductGrid from "./ProductGrid";
import SortAndFilter from "./SortAndFilter";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: Props) {
  const { category } = use(params);

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductStatus);

  useEffect(() => {
    dispatch(fetchProductByCategory(category));
  }, [category, dispatch]);

  const slogan = "Find the best deals on our products!";

  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mt-32">
      <Breadcrumb displayCategory={displayCategory} />

      <hr className="text-gray-200 my-3" />

      <div className="border-b border-gray-200">
        <p
          className={`text-center pb-3 max-w-4xl mx-auto ${spaceMono.className}`}
        >
          {displayCategory} {slogan}
        </p>
      </div>

      <SortAndFilter totalProducts={products.length} />

      {status === "loading" ? (
        <div
          className={`flex h-60 items-center justify-center text-center text-gray-500 ${spaceMono.className}`}
        >
          Loading products...
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
