"use client";
import {
  fetchFeaturedProduct,
  fetchProductByCategory,
  fetchProductByStatus,
  selectProducts,
  selectProductStatus,
} from "@/feature/redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/feature/redux/store";
import { spaceMono } from "@/fonts/Fonts";
import { useEffect } from "react";
import Breadcrumb from "./BreadCrumb";
import ProductGrid from "./ProductGrid";
import SortAndFilter from "./SortAndFilter";

interface Props {
  category: string;
}

const CategoryClient = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductStatus);

  const isFeatured = category.toLowerCase() === "featured";
  const isLatest = category.toLowerCase() === "latest";

  useEffect(() => {
    if (isFeatured) {
      dispatch(fetchFeaturedProduct());
    } else {
      dispatch(fetchProductByCategory(category));
    }
  }, [category, isFeatured, dispatch]);

  useEffect(() => {
    if (isLatest) {
      dispatch(fetchProductByStatus());
    }
  }, [dispatch, isLatest]);

  const slogan = isFeatured
    ? "Discover our handpicked featured items!"
    : "Find the best deals on our products!";

  const displayCategory = isFeatured
    ? "Featured Products"
    : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mt-32">
      <Breadcrumb displayCategory={displayCategory} />

      <hr className="text-gray-200 my-3" />

      <div className="border-b border-gray-200">
        <p
          className={`text-center pb-3 max-w-4xl mx-auto ${spaceMono.className}`}
        >
          {displayCategory} - {slogan}
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
};

export default CategoryClient;
